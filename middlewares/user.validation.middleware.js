const {user} = require('../models/user');

const reGmail = /.+@(gmail)\.com$/;
const rePhoneNumber = /^(\+380)?([ 0-9]){9}$/
const rePassword = /\d*(?:[0-9a-zA-Z$&%?#/@!*+-]){3,}\d*/

const createUserValid = (req, res, next) => {
    const reqUser = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        password: req.body.password
    }

    if (!req.body.firstName || !req.body.lastName || !req.body.email || !req.body.phoneNumber || !req.body.password) {
        res.status(400).send("all fields must be filled")
    } else {
        if (JSON.stringify(reqUser) == JSON.stringify(req.body)) {

            if (reGmail.test(req.body.email)) {
                if (rePhoneNumber.test(req.body.phoneNumber)) {
                    if (rePassword.test(req.body.password)) {
                        next()
                    } else {

                        res.status(400).send("Password must be 3 and more")
                    }
                } else {
                    res.status(400).send("phone number must be +380xxxxxxxxx")
                }


            } else {
                res.status(400).send("email must be only gmail")
            }


        } else {
            res.status(400).send("added extra fields")

        }

    }
}

const updateUserValid = (req, res, next) => {
    if (req.body.firstName || req.body.lastName || req.body.email || req.body.phoneNumber || req.body.password) {
        next();

    }
    else {
        res.status(400).send("When updating the user - there must be at least one field")
    }
}

exports.createUserValid = createUserValid;
exports.updateUserValid = updateUserValid;