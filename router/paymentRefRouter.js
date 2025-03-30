const express = require('express');
const router = express.Router();
const PaymentRefService = require('../services/paymentRefService'); // Adjust the path as needed

// Create a new library entry
router.post('/create', async (req, res) => {
    try {
        const paymentData = req.body;
        const newLibrary = await PaymentRefService.createPaymentRef(paymentData);
        res.status(201).json(newLibrary);
    } catch (error) {
        res.status(400).json({ message: 'Error creating payment ref entry', error: error.message });
    }
});

// Get all library entries
router.get('/getall', async (req, res) => {
    try {
        const paymentRef = await PaymentRefService.getAllPaymentRef();
        res.status(200).json(paymentRef);
    } catch (error) {
        res.status(400).json({ message: 'Error fetching payment ref', error: error.message });
    }
});

// Get a single library entry by ID
router.get('/:id', async (req, res) => {
    try {
        const libraryId = req.params.id;
        const paymentRef = await PaymentRefService.getPaymentRefById(libraryId);
        if (!paymentRef) {
            return res.status(404).json({ message: 'paymentRef item not found' });
        }
        res.status(200).json(library);
    } catch (error) {
        res.status(400).json({ message: 'Error fetching paymentRef item', error: error.message });
    }
});

// Update a library entry
router.put('/:id', async (req, res) => {
    try {
        const libraryId = req.params.id;
        const updatedData = req.body;
        const updatedLibrary = await PaymentRefService.updatePaymentRef(libraryId, updatedData);
        if (!updatedLibrary) {
            return res.status(404).json({ message: 'paymentRef item not found' });
        }
        res.status(200).json(updatedLibrary);
    } catch (error) {
        res.status(400).json({ message: 'Error updating paymentRef item', error: error.message });
    }
});

// Delete a library entry
router.delete('/:id', async (req, res) => {
    try {
        const libraryId = req.params.id;
        const deletedLibrary = await PaymentRefService.deletePaymentRef(libraryId);
        if (!deletedLibrary) {
            return res.status(404).json({ message: 'paymentRef item not found' });
        }
        res.status(200).json({ message: 'paymentRef item deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: 'Error deleting paymentRef item', error: error.message });
    }
});

module.exports = router;
