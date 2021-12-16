const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const userSchema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    type: { type: String, required: true },
    creationDate: { type: String },
    active: { type: Boolean }
});

let User = mongoose.model('User', userSchema);

const createUser = (data, res) => {
    const user = new User(data);
    user.save().then(() => res.status(200).json({ message: 'El usuario ha sido creado exitosamente!' }))
               .catch(() => res.json({ message: 'Un error ha ocurrido al intentar crear el usuario!' }));
};

const findUserByUsername = (username) => User.find({ name: username });

const findUser = (username, password) => {
    return User.findOne({ name: username, password: password });
}

module.exports = (db) => {
    mongoose.connect(db.uri, { useNewUrlParser: true, useUnifiedTopology: true });

    return {
        createUser,
        findUserByUsername,
        findUser
    }
}