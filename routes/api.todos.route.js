const {Router} = require('express');
const router = Router();
const Notes = require('../helper/notes');
const { validate, ValidationError, Joi } = require('express-validation')
const asyncWrapper = require('../middleware/asyncWrapper');

const {getNotes, addNote, editNote, deleteNote} = require('../controllers/api.todos.controller');

router.route('/')
    .get(getNotes)
    .post(addNote);

router.route('/:id')
    .put(editNote)
    .delete(deleteNote);

module.exports = router