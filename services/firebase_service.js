const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

// Cloud Function to send a notification to a specific device
exports.sendNotification = functions.https.onRequest(async (req, res) => {
  try {
    // Check if request method is POST
    if (req.method !== 'POST') {
      return res.status(405).send('Method Not Allowed');
    }
    
    // Verify authentication
    const authHeader = req.headers.authorization || '';
    const token = authHeader.split('Bearer ')[1];
    
    if (!token) {
      return res.status(403).send('Unauthorized');
    }
    
    try {
      // Verify the token
      await admin.auth().verifyIdToken(token);
    } catch (error) {
      console.error('Error verifying token:', error);
      return res.status(403).send('Unauthorized');
    }
    
    // Get parameters from request body
    const { token: fcmToken, title, body, data } = req.body;
    
    if (!fcmToken || !title || !body) {
      return res.status(400).send('Missing required parameters');
    }
    
    // Send message using FCM
    const message = {
      token: fcmToken,
      notification: {
        title: title,
        body: body,
      },
      data: data || {},
      android: {
        priority: 'high',
        notification: {
          sound: 'default',
          channelId: 'high_importance_channel',
        },
      },
      apns: {
        payload: {
          aps: {
            sound: 'default',
          },
        },
      },
    };
    
    const response = await admin.messaging().send(message);
    console.log('Successfully sent message:', response);
    
    return res.status(200).json({ success: true, messageId: response });
  } catch (error) {
    console.error('Error sending notification:', error);
    return res.status(500).send('Error sending notification: ' + error.message);
  }
});

// Alternatively, use a Firestore trigger to automatically send notifications
// when a new notification document is created
exports.sendNotificationOnCreate = functions.firestore
  .document('notifications/{notificationId}')
  .onCreate(async (snapshot, context) => {
    try {
      const notificationData = snapshot.data();
      const { studentId, title, message } = notificationData;
      
      // Get the student's FCM token
      const studentDoc = await admin.firestore()
        .collection('students')
        .doc(studentId)
        .get();
        
      if (!studentDoc.exists) {
        console.error('Student not found:', studentId);
        return null;
      }
      
      const studentData = studentDoc.data();
      const fcmToken = studentData.fcmToken;
      
      if (!fcmToken) {
        console.error('No FCM token found for student:', studentId);
        return null;
      }
      
      // Prepare notification message
      const fcmMessage = {
        token: fcmToken,
        notification: {
          title: title,
          body: message,
        },
        data: {
          notificationId: context.params.notificationId,
          studentId: studentId,
          ...notificationData.additionalData,
        },
        android: {
          priority: 'high',
          notification: {
            sound: 'default',
            channelId: 'high_importance_channel',
          },
        },
        apns: {
          payload: {
            aps: {
              sound: 'default',
            },
          },
        },
      };
      
      // Send the message
      const response = await admin.messaging().send(fcmMessage);
      console.log('Successfully sent message:', response);
      
      // Update the notification document to mark it as sent
      await snapshot.ref.update({
        sentAt: admin.firestore.FieldValue.serverTimestamp(),
        messageId: response,
      });
      
      return response;
    } catch (error) {
      console.error('Error sending notification:', error);
      return null;
    }
  });