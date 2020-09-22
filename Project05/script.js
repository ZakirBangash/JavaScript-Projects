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
async function generateRandomUser() {
    const response = await fetch('https://randomuser.me/api');
    const { results } = await response.json();
    let { first, last } = results[0].name;

    const newUser = {
        name: `${first} ${last}`,
        worth: Math.floor(Math.random() * 1000000)
    };

    addData(newUser);

}


function addData(newUser) {
    data.push(newUser);
    updateDom();
}




// Function to format a number as a currency
function formatCurrency(num) {
    return 'PKR  ' + (num).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}


// Function to update UI with updateDOM
function updateDom(inputData = data) {
    main.innerHTML = `<h2><strong>Name</strong> Net Worth</h2>`;

    inputData.forEach(item => {
        const element = document.createElement('div');
        element.classList.add('name');
        element.innerHTML = `<strong>${item.name}</strong> ${formatCurrency(item.worth)}`;
        console.log(element);
        main.appendChild(element);
    });

}


// Function of Double the Worth
function doubleWorth() {
    data = data.map(item => {

        return { ...item, worth: item.worth * 2 }
    })
    updateDom();
}

// Function to show millionaires
function showMillionaires() {
    data = data.filter(item => item.worth > 1000000);
    updateDom();
}

// Function to Sort by Richest man
function sortRichest() {
    data.sort((a, b) => {
        return a.worth - b.worth;
    })

    updateDom();
}

// Function to calculate total net worth of all user 
function calculateTotalNetWorth() {
    const totalWorth = data.reduce((acc, item) => (acc += item.worth), 0);
    
    const totalNetWorthElement = document.createElement('div');
    totalNetWorthElement.innerHTML = `<h3>Total Net Worth: <strong>${formatCurrency(totalWorth)}</strong></h3>`;
    main.appendChild(totalNetWorthElement)

}


// Event Listners

// 1. add user event listner
addUser.addEventListener('click', generateRandomUser);

// 2. add double money event listner
double.addEventListener('click', doubleWorth);

// 3. add Show event listner
millionaries.addEventListener('click', showMillionaires);

// 4. add Sort event listner
sort.addEventListener('click', sortRichest);

//5. add total event listner
total.addEventListener('click', calculateTotalNetWorth)