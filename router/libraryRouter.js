const express = require('express');
const router = express.Router();
const LibraryService = require('../services/libraryService'); // Adjust the path as needed

// Create a new library entry
router.post('/create', async (req, res) => {
    try {
        const libraryData = req.body;
        const newLibrary = await LibraryService.createLibrary(libraryData);
        res.status(201).json(newLibrary);
    } catch (error) {
        res.status(400).json({ message: 'Error creating library entry', error: error.message });
    }
});

// Get all library entries
router.get('/getall', async (req, res) => {
    try {
        const libraries = await LibraryService.getAllLibraries();
        res.status(200).json(libraries);
    } catch (error) {
        res.status(400).json({ message: 'Error fetching libraries', error: error.message });
    }
});

// Get a single library entry by ID
router.get('/:id', async (req, res) => {
    try {
        const libraryId = req.params.id;
        const library = await LibraryService.getLibraryById(libraryId);
        if (!library) {
            return res.status(404).json({ message: 'Library item not found' });
        }
        res.status(200).json(library);
    } catch (error) {
        res.status(400).json({ message: 'Error fetching library item', error: error.message });
    }
});

// Update a library entry
router.put('/:id', async (req, res) => {
    try {
        const libraryId = req.params.id;
        const updatedData = req.body;
        const updatedLibrary = await LibraryService.updateLibrary(libraryId, updatedData);
        if (!updatedLibrary) {
            return res.status(404).json({ message: 'Library item not found' });
        }
        res.status(200).json(updatedLibrary);
    } catch (error) {
        res.status(400).json({ message: 'Error updating library item', error: error.message });
    }
});

// Delete a library entry
router.delete('/:id', async (req, res) => {
    try {
        const libraryId = req.params.id;
        const deletedLibrary = await LibraryService.deleteLibrary(libraryId);
        if (!deletedLibrary) {
            return res.status(404).json({ message: 'Library item not found' });
        }
        res.status(200).json({ message: 'Library item deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: 'Error deleting library item', error: error.message });
    }
});

module.exports = router;
