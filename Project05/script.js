const main = document.querySelector("#main");
const addUser = document.querySelector("#add-user");
const double = document.querySelector("#double");
const millionaries = document.querySelector("#millionaires");
const sort = document.querySelector("#sort");
const total = document.querySelector("#total");

let data = [];

generateRandomUser();
generateRandomUser();
generateRandomUser();

// Function to fetch random user form api
async function generateRandomUser(){
    const response = await fetch('https://randomuser.me/api');
    const {results} = await response.json();
    let {first,last} = results[0].name;
    
    const newUser = {
        name:`${first} ${last}`,
        worth: Math.floor(Math.random() * 1000000)
    };

    addData(newUser);
    
}


function addData(newUser){
   data.push(newUser);
   updateDom();
}




// Function to format a number as a currency
function formatCurrency(num) {
    return 'PKR  ' + (num).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}


// Function to update UI with updateDOM
function updateDom(inputData=data){
    main.innerHTML = `<h2><strong>Name</strong> Net Worth</h2>`;
    
    inputData.forEach(item => {
        const element = document.createElement('div');
        element.classList.add('name');
        element.innerHTML = `<strong>${item.name}</strong> ${formatCurrency(item.worth)}`;
        console.log(element);
        main.appendChild(element);        
    });

}

