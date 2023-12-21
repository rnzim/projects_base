var mn = document.getElementById('mn')
var men = 'fclose'
var menu = document.querySelector('.menu')
mn.addEventListener('click',()=>{
  // 
   if(men == 'fclose'){
    menu.style.display = 'block'
     men = 'fop'
   }
   else{
    menu.style.display = 'none'
    men = 'fclose'
   }
})