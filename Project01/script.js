const form = document.getElementById('form');
const username = document.getElementById('username')
const email = document.getElementById('email');
const password = document.getElementById('password');
const confirm = document.getElementById('confirm');


//  A generic function to show error
function showError(input,message) {
    const formControl = input.parentNode;
    formControl.classList.add('error');
    input.nextElementSibling.innerText = `${getField(input.id)}`+`${message}`;    
}


function checkRequired(input) {
    input.forEach(input => {
        const formControl = input.parentNode;
        if (input.value === '') {
            showError(input,' is required')
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

function checkLength(input,min,max) {
  console.log(min)
    if(input.value !== '')
    if(input.value.length < min)
        showError(input,` should be greater than ${min}`)
    else if (input.value.length > max)
    showError(input,` should be less than ${max}`)
}
function checkConfirmation(p1,p2) {
    if(p1.value !== '' && p2.value !== '')
    if(p1.value !== p2.value)
    showError(p2,` Password not matched`)
}


form.addEventListener('submit', (e) => {
    e.preventDefault();
    checkRequired([username, email, password, confirm]);
    checkLength(username,3,10);
    checkLength(password,3,10);
     checkLength(confirm,3,10);
    checkConfirmation(password,confirm);
    if(!isValidEmail(email.value))
          if(email.value !== '')
            showError(email,' is invalid');

            
})


