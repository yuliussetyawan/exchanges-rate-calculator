const currencyOne = document.getElementById("currency-one");
const currencyTwo = document.getElementById("currency-two");
const amountOne = document.getElementById("amount-one");
const amountTwo = document.getElementById("amount-two");
const rate = document.getElementById("rate");
const swap = document.getElementById("swap");

// fetch exchanges and update the dom
function calculate() {
  const currencyOneValue = currencyOne.value;
  const currencyTwoValue = currencyTwo.value;

  fetch(`https://api.exchangerate-api.com/v4/latest/${currencyOneValue}`)
    .then((res) => res.json())
    .then(data => {
      const rateValue = data.rates[currencyTwoValue];
      rate.innerText = `1 ${currencyOneValue} = ${rateValue} ${currencyTwoValue}`;
      amountTwo.value = (amountOne.value * rateValue).toFixed(2);
    });
}


currencyOne.addEventListener("change", calculate);
currencyTwo.addEventListener("change", calculate);
amountOne.addEventListener("input", calculate);
amountTwo.addEventListener("input", calculate);

swap.addEventListener('click', () => {
    const temp = currencyOne.value;
    currencyOne.value = currencyTwo.value;
    currencyTwo.value = temp;
    calculate();
});



calculate();
