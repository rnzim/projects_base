class HomeController{
    async index(req,res){
        res.render('index.ejs')
        
    }
    
}

module.exports = new HomeController