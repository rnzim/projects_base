const express = require('express')
const app = express()
const Router = require('./routers/Routers')
const session = require('express-session')
const port = 800

app.use(session({
    secret:'mzinvs',
    cookie: {maxAge: 60*60*1000},
    resave: true,
    saveUninitialized: true
}))
app.set('view engine','ejs')
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(express.static('public'))
app.use('/',Router)

app.listen(port,()=>{
    console.log('run...')
})