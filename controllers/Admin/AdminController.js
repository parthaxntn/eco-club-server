const mongoose = require('mongoose');
const AdminModel = require('../../models/Admin/AdminModels');
const jwt = require("jsonwebtoken");
const {getJWTToken} = require('jsonwebtoken');

exports.Login = async (req, res) => {
    try {

        
        if (!req.body.username || !req.body.password) {
            return res.status(404).send("Please enter a username and password")
        }
        
        const user = await AdminModel.findOne(req.body).select("+password");
        
        if (!user) {
            return res.status(400).json({
                status: 400,
                message: 'User not found'
            });
        }
        
        if (user.password!== req.body.password || user.password !== req.body.password) {
            return res.status(400).json({
                status: 400,
                message: 'Invalid Username or Password'
            });
        }
        
        // console.log(user);
        let object_user = user.toJSON();
        object_user.expiresIn = 1000
        console.log('hello');
        sendToken(object_user, 201, res)

        // const user = await AdminModel.findOne(req.body);
        // res.json({ 'success': true, data: user });
    } catch (err) {
        res.status(500).json({
            status: 500,
            message: err
        })
    }
}

exports.isauthenticated = async (req,res,next) => {
    try {
        const { CSS_Website } = req.cookies;
        
        if (!CSS_Website) {
            return res.status(401).json({
                success: false,
                message: "Please login to access this Resource",
            })
        }
        
        const decodedData = jwt.verify(CSS_Website, process.env.JWT_SECRET);
        req.user = await Admin.findById(decodedData.id);
        next();

    } catch (err) {
        res.send(err.message);
    }
}

exports.Logout = (req, res, next) => {
    try {
        res.cookie("CSS_Website", null, {
            expires: new Date(Date.now()),
            httpOnly: true,
        });
        res.status(200).json({
            success: true,
            message: "Logged Out",
        });

    } catch (err) {
        res.send(err.message);
    }
}

exports.registerUser = async (req, res) => {
    const user = await AdminModel.create(req.body)
    res.json({ 'success': true, 'data': user });
}


const sendToken = async (user, ststusCode, res) => {
    console.log(user);
    const token = await jwt.sign(user, process.env.JWT_SECRET,{ expiresIn: 1000 });
    console.log('helo')

    //options for cookie
    const options = {
        expires: new Date(
            Date.now() + process.env.COOKIE_EXPIRE_DAYS * 24 * 60 * 60 * 1000,
        ),
        httpOnly: false,
    }

    console.log(options);
    res.status(ststusCode).cookie("CSS_Website",token,options).json({
        success: true,
        user,
        token,
    })
}