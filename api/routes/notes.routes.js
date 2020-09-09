const router = require('express').Router();
const { validateToken } = require('../utils/jwt');
const { getNotes, createNotes, deleteNotes, editNotes } = require('../controllers/notes');

router.post('/', validateToken, getNotes);
router.post('/create', validateToken, createNotes);
router.delete('/delete', validateToken, deleteNotes);
router.patch('/edit', validateToken, editNotes);

module.exports = router;
