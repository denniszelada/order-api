"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeUser = exports.updateUser = exports.addUser = exports.getUser = void 0;
const halson = require("halson");
const user_1 = require("../schemas/user");
const orderApiUtility_1 = require("../utility/orderApiUtility");
exports.getUser = (req, res, next) => {
    const username = req.params.username;
    user_1.UserModel.findOne({ username: username }, (err, user) => {
        if (!user) {
            return res.status(404).send();
        }
        user = user.toJSON();
        user._id = user._id.toString();
        user = halson(user).addLink('self', `/users/${user.id}`);
        return orderApiUtility_1.formatOutput(res, user, 200, 'user');
    });
};
exports.addUser = (req, res, next) => {
    const newUser = new user_1.UserModel(req.body);
    newUser.save((error, user) => {
        user = halson(user.toJSON()).addLink('self', `/users/${user.id}`);
        return orderApiUtility_1.formatOutput(res, user, 201, 'user');
    });
};
exports.updateUser = (req, res, next) => {
    const username = req.params.username;
    user_1.UserModel.findOne({ username: username }, (err, user) => {
        if (!user) {
            return res.status(404).send();
        }
        user.username = req.body.username || user.username;
        user.firstName = req.body.firstName || user.firstName;
        user.lastName = req.body.lastName || user.lastName;
        user.email = req.body.email || user.email;
        user.password = req.body.password || user.password;
        user.phone = req.body.phone || user.phone;
        user.userStatus = req.body.userStatus || user.userStatus;
        user.save(error => {
            res.status(204).send();
        });
    });
};
exports.removeUser = (req, res, next) => {
    const username = req.params.username;
    user_1.UserModel.findOne({ username: username }, (err, user) => {
        if (!user) {
            return res.status(404).send();
        }
        user.remove(error => {
            return res.status(204).send();
        });
    });
};
