const express = require('express')
const app = express()
const Router = require('./routers/Routers')
const port = 80

app.set('view engine','ejs')
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(express.static('public'))
app.use('/',Router)

app.listen(port,()=>{
    console.log('run...')
})