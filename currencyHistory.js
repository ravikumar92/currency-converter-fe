document.addEventListener("DOMContentLoaded", function() {
  const conversionHistory = document.getElementById("conversionHistory");
  const url = "http://localhost:8080/api/v1/currency";
  fetch(url)
    .then(response => response.json())
    .then(data => {
      data.forEach(entry => {
        const row = document.createElement("tr");


        const amountCell = document.createElement("td");
        amountCell.textContent = entry.amount;
        row.appendChild(amountCell);

        const fromCell = document.createElement("td");
        fromCell.textContent = entry.currencyFrom;
        row.appendChild(fromCell);

        const toCell = document.createElement("td");
        toCell.textContent = entry.currencyTo;
        row.appendChild(toCell);


        const convertedAmountCell = document.createElement("td");
        convertedAmountCell.textContent = entry.convertedAmount;
        row.appendChild(convertedAmountCell);


        const dateCell = document.createElement("td");
        dateCell.textContent = entry.timestamp;
        row.appendChild(dateCell);

        conversionHistory.appendChild(row);
      });
    })
    .catch(error => {
      console.log("Error fetching conversion history:", error);
    });
});
