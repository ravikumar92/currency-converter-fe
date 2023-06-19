window.onload = function() {
  fetchSupportedCurrenciesList()
    .then(data => {
      populateDropdown(data);
    })
    .catch(error => {
      console.error(error);
    });
};

function fetchSupportedCurrenciesList() {
  const url = "http://localhost:8080/api/v1/currency/supported";
  return fetch(url)
    .then(response => response.json())
    .then(data => {
      return data;
    });
}

function populateDropdown(data) {
  const from = document.querySelector("#from");
  const to = document.querySelector("#to");

  from.innerHTML = "";
  to.innerHTML = "";

  data.forEach(item => {
    const optionFrom = document.createElement("option");
    const optionTo = document.createElement("option");

    optionFrom.value = item.symbol;
    optionFrom.textContent = item.symbol;
    from.appendChild(optionFrom);

    optionTo.value = item.symbol;
    optionTo.textContent = item.symbol;
    to.appendChild(optionTo);
  });
}


document.addEventListener("DOMContentLoaded", function() {
  const form = document.querySelector("form");
  const submitButton = document.querySelector("input[type='submit']");

  form.addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form submission
    
    const currency = document.querySelector("#currency").value;
    const from = document.querySelector("#from").value;
    const to = document.querySelector("#to").value;
    
    convertCurrency(currency, from, to);
  });

 function convertCurrency(amount, from, to) {
    const url = `http://localhost:8080/api/v1/currency`;
    const data = {
        "amount": amount,
        "currencyFrom": from,
        "currencyTo": to
    }

    fetch(url,{
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(data => {
        document.querySelector("#currency").innerHTML = "";
        document.querySelector("#from").innerHTML = "";
        document.querySelector("#to").innerHTML = "";
        document.getElementById("convertedAmount").innerHTML = data[0]?.convertedAmount;
      })
      .catch(error => {
        console.error(error);
      });
  }
});