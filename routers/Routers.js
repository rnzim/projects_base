const express = require('express')
const Router = express.Router()
const HomeController = require('../Controllers/HomeController')
const UserController = require('../Controllers/UserController')

Router.get('/',HomeController.index)
Router.get('/login',UserController.login)
Router.get('/dash',UserController.dash)
module.exports = Router