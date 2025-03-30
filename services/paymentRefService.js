const PaymentRef = require('../models/payments_ref/payment_ref_schema'); 

class PaymentRefService {
    // Create a new library entry
    static async createPaymentRef(data) {
        const PaymentRefItem = new PaymentRef(data);
        return await PaymentRefItem.save();
    }

    // Get all library entries
    static async getAllPaymentRef() {
        return await PaymentRef.find(); // Adjust populated fields as needed
        }

    // Get a single library entry by ID
    static async getPaymentRefById(id) {
        return await PaymentRef.findById(id);
    }

    // Update a library entry
    static async updatePaymentRef(id, data) {
        return await PaymentRef.findByIdAndUpdate(id, data, { new: true });
    }

    // Delete a library entry
    static async deletePaymentRef(id) {
        return await PaymentRef.findByIdAndDelete(id);
    }
}

module.exports = PaymentRefService;
