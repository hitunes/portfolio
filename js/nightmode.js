let body = document.querySelector('body');
let adjustIcon = document.getElementsByClassName('adjust-icon')[0]

adjustIcon.addEventListener('click', ()=>{
  body.classList.toggle("nightmode")
})
