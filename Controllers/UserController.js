const User = require('../Models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const session = require('express-session')
const secret = 'miznr'
class UserController{
  
    async registerUser(req,res){
        var {
            username,
            email,
            pass,   

        }
         = req.body
         var hash = await bcrypt.hash(pass,8)
         try{
            let dataAtual = new Date();
            // Formata a data e hora para o formato do MySQL (YYYY-MM-DD HH:mm:ss)
            let dataFormatada = dataAtual.toISOString().slice(0, 19).replace("T", " ");

          await User.createUser({
            username,
            email,
            pass:hash,
            registration:dataFormatada,
          })
          res.redirect("/login")
         }catch(erro){
            console.log(erro)
            res.status(500)
         }
    }
    async login(req,res){
        res.render('user/login.ejs')
    }
    async dash(req,res){
        res.render('dashboard/main.ejs',{name:req.session.user.username})
    }
    async register(req,res){
        res.render('user/register.ejs')
    }
    async loginUserSession(req,res){
        var {email,pass} = req.body
        var user = await User.findByEmail(email)
        console.log(user)
        if(user.length > 0){
            var comparePass = await bcrypt.compare(pass,user[0].pass)
            if(comparePass){
                req.session.user = ({
                    id:user[0].id,
                    username:user[0].username,
                    email:user[0].email
                })
                    res.redirect('/dash')
                   
            }else{
                res.send('senha errada')
            }
           
        }else{
            res.send('email not found')
        }
        
    }

    //api
    async loginUser(req,res){
        var {email,pass} = req.body
        var user = await User.findByEmail(email)
        if(user.length > 0){
            var comparePass = await bcrypt.compare(pass,user[0].pass)
            if(comparePass){
                var token = jwt.sign({
                    id:user[0].id,
                    fullname:user[0].fullname,
                    username:user[0].username,
                    email:user[0].email,
                    seller:user[0].seller},secret,{expiresIn:'7d'})
                res.status(200).json({token})
            }else{
                res.status(401).send('password incorrect')
            }
           
        }else{
            res.status(404).send("Email Not Found")
        }
        
    }
    async viewUser(req,res){
        try{
            var result = await User.viewAllUser()
            res.json(result).status(200)
        }catch(error){
            throw error
        }
    }
    async updatePhotoProfiler(req,res){
        var id = req.userToken.id
        try{
            var result = await User.editPhotoProfile(id,name_photo)
            res.json(result).status(200)
        }catch(error){
            throw error
        }
    }
    async logoff(req,res){
        req.session.destroy()
        res.redirect('/')
    }
}
module.exports = new UserController