const toggle = document.querySelector("#toggle");
const apply = document.querySelector('.apply');
const modal = document.querySelector('#modal');
const close = document.querySelector('#close');

// 1. Event listner for toggling navBar
toggle.addEventListener('click',()=>{
    document.body.classList.toggle('show-nav');
})

// 2. Event listner for applying the modal
apply.addEventListener('click',()=>{
    modal.classList.add('show-modal');
})

close.addEventListener('click',()=>{
    modal.classList.remove('show-modal');
})

window.addEventListener('click',(e)=>{
    e.target === modal?modal.classList.remove('show-modal') : false;
})