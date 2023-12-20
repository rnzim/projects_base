const express = require('express')
const Router = express.Router()
const HomeController = require('../Controllers/HomeController')
const UserController = require('../Controllers/UserController')
const Auth = require('../middlewares/Auth')

Router.get('/',HomeController.index)
Router.get('/login',UserController.login)
Router.get('/dash',Auth,UserController.dash)
Router.get('/register',UserController.register)
Router.get('/logoff',UserController.logoff)
Router.post('/login',UserController.loginUserSession)
Router.post('/register',UserController.registerUser)
module.exports = Router