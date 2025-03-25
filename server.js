const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');


const adminRouter = require('./router/adminRouter.js'); // Adjust the path as per your project structure

const teacherRouter = require('./router/teacherRouter.js'); 
const studentRouter = require('./router/studentRouter.js'); 
const classRouter = require('./router/classRoute.js'); 
const quizeRouter = require('./router/quizeRouter.js'); 
const subjectRouter = require('./router/subjectRouter.js'); 
const schoolRouter = require('./router/schoolRouter.js'); 
const levelRouter = require('./router/levelRouter.js'); 
const bannerRouter = require('./router/bannerRouter.js'); 
const libRouter = require('./router/libraryRouter.js'); 
const payCourse = require("./router/paymentRouter");









const url = "mongodb+srv://sebatech2024:xcGRZSYqgiLbwbO0@escholar.f51th.mongodb.net/";

const app = express();

// MongoDB Connection
mongoose.connect(url)
    .then(() => {
        console.log('The MongoDB has connected successfully');
    })
    .catch(err => {
        console.error('Error connecting to MongoDB:', err);
    });

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

// Register routes

app.use('/api/v1/admin_route', adminRouter);


app.use('/api/v1/teacher_route', teacherRouter);
app.use('/api/v1/student_route', studentRouter);
app.use('/api/v1/class_route', classRouter);
app.use('/api/v1/quize_route', quizeRouter);
app.use('/api/v1/subject_route', subjectRouter);
app.use('/api/v1/school_route', schoolRouter);
app.use('/api/v1/banner_route', bannerRouter);
app.use('/api/v1/level_route', levelRouter);
app.use('/api/v1/library_route', libRouter);

app.use('/api/v1/pay_route', payCourse);










const Port = 4071;
app.listen(Port, () => {
    console.log("The server is running well at port:", Port);
});
