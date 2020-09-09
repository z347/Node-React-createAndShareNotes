const { decryptionToken } = require('../utils/jwt');
const Notes = require('../models/Notes');
const Distribution = require('../models/Distribution');
const User = require('../models/User');

module.exports.getNotes = async (req, res) => {
    try {
        const { authorization } = req.headers;
        const token = authorization.split(' ')[1];
        const json = await decryptionToken(token);
        const userId = json.userId;
        let arrNotes = await Notes.find({ owner: userId }, { notes: true, owner: true });
        const distributionDocuments = await Distribution.find({ needy: userId });

        let withEmailArray = [];

        if (distributionDocuments.length > 0) {
            for (let i = 0; i < arrNotes.length; i++) {
                let notes = JSON.stringify(arrNotes[i]._id);

                for (let y = 0; y < distributionDocuments.length; y++) {
                    let document = JSON.stringify(distributionDocuments[y].notes);

                    if (notes === document) {
                        let relevant = await User.findById(
                            { _id: distributionDocuments[y].generous },
                            {
                                _id: false,
                                email: true,
                            },
                        );

                        let email = relevant.email;
                        let merged = { ...arrNotes[i].toObject(), email };
                        withEmailArray.push(merged);
                    }
                }
            }

            if (withEmailArray.length > 0) {
                for (let i = 0; i < arrNotes.length; i++) {
                    let notes = JSON.stringify(arrNotes[i]._id);

                    for (let y = 0; y < withEmailArray.length; y++) {
                        let perfectNotes = JSON.stringify(withEmailArray[y]._id);

                        if (notes === perfectNotes) {
                            arrNotes.splice(i, 1, withEmailArray[y]);
                        }
                    }
                }
            }
        }

        res.status(200).json({ notes: arrNotes });
    } catch (e) {
        res.status(500).json({ message: 'Something went wrong.' });
    }
};

module.exports.createNotes = async (req, res) => {
    try {
        const { notes } = req.body;
        const { authorization } = req.headers;
        const token = authorization.split(' ')[1];
        const json = await decryptionToken(token);
        const userId = json.userId;
        const createNote = new Notes({ owner: userId, notes });
        await createNote.save();
        res.status(201).json({ message: 'Notes was created.' });
    } catch (e) {
        res.status(500).json({ message: 'Something went wrong.' });
    }
};

module.exports.deleteNotes = async (req, res) => {
    try {
        const notesId = req.headers.id;
        await Notes.findByIdAndDelete({ _id: notesId });
        await Distribution.findOneAndDelete({ notes: notesId });
        res.json({ message: 'Notes was deleted.' });
    } catch (e) {
        res.status(500).json({ message: 'Something went wrong.' });
    }
};

module.exports.editNotes = async (req, res) => {
    try {
        const notesId = req.headers.id;
        const { notes } = req.headers;
        await Notes.findByIdAndUpdate({ _id: notesId }, { $set: { notes } });
        res.json({ message: 'Notes was editNotes.' });
    } catch (e) {
        res.status(500).json({ message: 'Something went wrong.' });
    }
};
