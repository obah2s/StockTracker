/* utilisation du package bcrypt pour hasher les mots de passes avant de les enregistrer */
const bcrypt = require('bcrypt');
const User = require('../models/User')

exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email,
                password: hash
            });
            user.save()
                .then(() => res.status(201).json({ message: 'Successful registration!' }))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {
    User.findOne({ email: 'email@gmail.com' })
        .then(user => {
            if (!user) {
                return res.status(404).json({ error: 'Not Found' });
            }
            bcrypt.compare('motdepasse', user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ error: 'Mot de passe incorrect' })
                    }
                    res.status(200).json({
                        userId: user._id,
                        token: 'TOKEN'
                    });
                })
                .catch(err => res.status(500).json({ error: error }))
        })
        .catch(error => res.status(500).json({ error }))

};