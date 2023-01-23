const mongoose = require('mongoose');
const express = require('express');
const { Login, Logout, registerUser } = require('../../controllers/Admin/AdminController');

const router = express.Router();

router.route('/login').post(Login)
router.route('/logout').post(Logout)
router.route('/register').post(registerUser)

module.exports =  router