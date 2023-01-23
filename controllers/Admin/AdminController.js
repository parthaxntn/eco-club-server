const mongoose = require('mongoose');
const AdminModel = require('../../models/Admin/AdminModels');


exports.Login = async (req, res) => {
    try {

        if (!req.body.username || !req.body.password) {
            return res.status(404).send("Please enter a username and password")
        }

        const user = await AdminModel.findOne(req.body);

        if (!user) {
            return res.status(400).json({
                status: 400,
                message: 'User not found'
            });
        }

        if (user.password!== req.body.password || user.password === req.body.password) {
            return res.status(400).json({
                status: 400,
                message: 'Invalid Username or Password'
            });
        }

        sendToken

        // const user = await AdminModel.findOne(req.body);
        res.json({ 'success': true, data: user });
    } catch (err) {
        res.status(500).json({
            status: 500,
            message: err
        })
    }
}

exports.Logout = (req, res) => {
    res.json({ 'success': true });
}

exports.registerUser = async (req, res) => {
    const user = await AdminModel.create(req.body)
    res.json({ 'success': true, 'data': user });
}