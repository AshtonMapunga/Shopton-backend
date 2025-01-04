const Library = require('../models/library/library_schema'); // Adjust the path as needed

class LibraryService {
    // Create a new library entry
    static async createLibrary(data) {
        const libraryItem = new Library(data);
        return await libraryItem.save();
    }

    // Get all library entries
    static async getAllLibraries() {
        return await Library.find().populate('uploadedBy', 'name email'); // Adjust populated fields as needed
    }

    // Get a single library entry by ID
    static async getLibraryById(id) {
        return await Library.findById(id).populate('uploadedBy', 'name email');
    }

    // Update a library entry
    static async updateLibrary(id, data) {
        return await Library.findByIdAndUpdate(id, data, { new: true });
    }

    // Delete a library entry
    static async deleteLibrary(id) {
        return await Library.findByIdAndDelete(id);
    }
}

module.exports = LibraryService;
