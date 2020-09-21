let currOnePicker = document.querySelector("#currency-one");
let currTwoPicker = document.querySelector("#currency-two");
const currOneAmount = document.querySelector("#amount-one");
let currTwoAmount = document.querySelector("#amount-two");
const flipButton = document.getElementById('flip');
const rate = document.getElementById('rate');
apiExchange();



async function apiExchange() {
    const currOnCode = currOnePicker.value;
    const currTwoCode = currTwoPicker.value;
    
    // www.exchangeRateApi.com
    let response = await fetch(`https://v6.exchangerate-api.com/v6/b4449277ed12b039cfac1341/latest/${currOnCode}`);
    let { conversion_rates } = await response.json();
    let exchangeRate = conversion_rates[currTwoCode];
    // Display the Conversion Rate
    rate.innerText = `${currOneAmount.value} ${currOnCode} = ${exchangeRate*currOneAmount.value} ${currTwoCode}`;

    currTwoAmount.value = (currOneAmount.value * exchangeRate).toFixed(2);

}

function flip() {
        const temp = currOnePicker.value;
        currOnePicker.value = currTwoPicker.value;
        currTwoPicker.value = temp;
        apiExchange();
}


currOnePicker.addEventListener("change",apiExchange);
currTwoPicker.addEventListener("change",apiExchange);
currOneAmount.addEventListener("input",apiExchange);
currTwoAmount.addEventListener("input",apiExchange);
flipButton.addEventListener('click',flip);
