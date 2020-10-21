const asyncWrapper = require("../middleware/asyncWrapper");
const Notes = require("../helper/notes");

const notes = new Notes(process.env.MONGO_DB_URL);

module.exports.getNotes = asyncWrapper(async (req, res) => {
    const data = await notes.getAll();
    res.status(200).json({
        success: true,
        data: data
    });
});

module.exports.addNote = asyncWrapper(async (req, res) => {
    const note = await notes.add(req.body.noteText);
    res.status(200).json({
        success: true,
        data: note
    })
});

module.exports.editNote = asyncWrapper(async (req, res) => {
    await notes.edit(req.params.id, req.body.noteText);

    res.status(200).json({
        success: true
    })
});

module.exports.deleteNote = asyncWrapper(async (req, res) => {
    await notes.delete(req.params.id);

    res.status(200).json({
        success: true
    })
});
