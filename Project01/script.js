const form = document.getElementById('form');
const username = document.getElementById('username')
const email = document.getElementById('email');
const password = document.getElementById('password');
const confirm = document.getElementById('confirm');




function checkRequired(input) {
    input.forEach(input => {
        const formControl = input.parentNode;
        if (input.value === '') {
            formControl.classList.add('error');
            input.nextElementSibling.innerText = `${getField(input.id)} is required`
        } else {
            formControl.classList.add('success');
        }
    });
}

function getField(id) {
    return id.charAt(0).toUpperCase() + id.slice(1);
}

function isValidEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());    
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    checkRequired([username, email, password, confirm]);

    if(!isValidEmail(email.value)){
        const formControl = email.parentNode;
        formControl.classList.add('error');
        email.nextElementSibling.innerText='Email is invalid';
        console.log('invalid')
    }
    
    
   
})


