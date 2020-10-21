const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema({
    noteText: { type: String, required: true, minLength: 1}
});

const Note = mongoose.model('Note', NoteSchema);

class Notes {
    constructor(mongo_url) {
        this.mongo_url = mongo_url;
        this.connect(this.mongo_url);
    }

    async connect(url) {
        const conn = await mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        });
    
        console.log(`MongoDB connected to host: ${conn.connection.host}`);
    }

    async add(noteText) {
        const note = await Note.create({noteText: noteText});
        return note;
    }

    async delete(noteId) {
        const note = await Note.findByIdAndDelete(noteId);
        if (!note) {
            throw new Error("Not valid id");
        }
    }

    async edit(noteId, noteText) {
        const note = await Note.findByIdAndUpdate(noteId, {noteText: noteText}, {
            new: true, 
            runValidators: true
        });
    }

    async get(noteId) {
        const note = await Note.findById(noteId);
        if (!note) {
            throw new Error("Not valid id");
        }
        
        return note;
    }

    async getAll() {
        const notes = await Note.find({});
        return notes;
    }
}

module.exports = Notes;