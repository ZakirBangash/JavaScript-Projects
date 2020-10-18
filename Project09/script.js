const balance = document.getElementById('balance');
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const description = document.getElementById('description');
const amount = document.getElementById('amount');

// Dummy Transactions
const dummyTransactions = [
    { id: 1, description: 'Salary', amount: 100000 },
    { id: 2, description: 'Electric Bill', amount: -50000 },
    { id: 3, description: 'Internet Bill', amount: -10000 },
    { id: 4, description: 'Profit', amount: 50000 }
];

let transactions = dummyTransactions;

// Function to display transaction in transaction history
function addTransactionUI(transaction) {
  
        // classify if icome or expense
        const type = transaction.amount > 0 ? '+' : '-';

        // create DOM for list item
        const item = document.createElement('li');

        // add class for item
        item.classList.add(transaction.amount > 0 ? 'plus' : 'minus');

    
        // adding content to li innerHTML
        item.innerHTML = `
            ${transaction.description}
            <span>${type} ${Math.abs(transaction.amount)}</span>
           <button class="btn-delete" onclick="deleteTransaction(${transaction.id})">x</button>
        `;

        // Appending the li item with List
        list.appendChild(item);
    
}

//Function to generate id
function generatedID() {
    return Math.floor(Math.random() * 100000000);
}


// Add new Transaction from Form 
function addTransaction(e) {
    e.preventDefault();

    if(description.value.trim() === '' ||  amount.value.trim() === ''){
        alert("Form is empty")
    }else{
        const transaction = {
            id : generatedID(),
            description: description.value,
            amount: +amount.value
        }
        transactions.push(transaction)
        addTransactionUI(transaction);    
        updateSums();   

        description.value = ' ';
        amount.value = ' ';

   }

}

// Function to Remove a Transaction
function deleteTransaction(id) {
    transactions = transactions.filter( transaction => transaction.id != id );
    init();
}

// Function to update the balance,icome,expense summaries
function updateSums() {
    
    // Create array of transaction amounts from transactions array
    const amounts = transactions.map( transaction => transaction.amount );
    
    // Calculate total value for balance
    const total = amounts
                    .reduce( (acc, amount) => ( acc += amount ), 0 )
                    .toFixed(2);
    
    // Calculate total income
    const income = amounts
                    .filter( amount => amount > 0 )
                    .reduce( (acc, amount) => ( acc += amount ), 0 )
                    .toFixed(2);                    

    // Calculate total expense
    const expense = amounts
                    .filter( amount => amount < 0 )
                    .reduce( (acc, amount) => ( acc += amount ), 0 )
                    .toFixed(2);

    // update balance in DOM
    balance.innerText = `${total} PKR`;    

    // update income in DOM
    money_plus.innerText = `${income} PKR`;

    // update expense in DOM
    money_minus.innerText = `${Math.abs(expense)} PKR`

}






// Function to initialize the app
function init() {
    list.innerHTML = ' ';
    transactions.forEach(transaction => {
        addTransactionUI(transaction);
    });

    updateSums();

}




// 1. Event listner for form
form.addEventListener('submit',addTransaction);

init();