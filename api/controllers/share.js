const { decryptionToken } = require('../utils/jwt');
const User = require('../models/User');
const Notes = require('../models/Notes');
const Distribution = require('../models/Distribution');

module.exports.getUsers = async (req, res) => {
    try {
        const { authorization } = req.headers;
        const token = authorization.split(' ')[1];
        const json = await decryptionToken(token);
        const userId = json.userId;
        const arrUsers = await User.find({ _id: { $ne: userId } }, { email: true });
        res.status(200).json({ users: arrUsers });
    } catch (e) {
        res.status(500).json({ message: 'Something went wrong.' });
    }
};

module.exports.shareWithUser = async (req, res) => {
    try {
        const { authorization } = req.headers;
        const token = authorization.split(' ')[1];
        const json = await decryptionToken(token);
        const generousId = json.userId;

        const sameDate = req.headers.samedate;
        const shareWithEmail = sameDate.split(' ')[0];
        const notesId = sameDate.split(' ')[1];
        const userId = await User.findOne({ email: shareWithEmail }, { _id: true });
        await Notes.findByIdAndUpdate({ _id: notesId }, { $addToSet: { owner: userId } });

        const distributionDocument = new Distribution({
            notes: notesId,
            generous: generousId,
            needy: userId,
        });
        await distributionDocument.save();

        res.status(200).json({ message: 'share notes with user - success' });
    } catch (e) {
        res.status(500).json({ message: 'Something went wrong.' });
    }
};
