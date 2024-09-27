document.querySelectorAll('input[type="number"]').forEach(inputNumber => {
    inputNumber.oninput = () => {
        if (inputNumber.value.length > inputNumber.maxLength) {
            inputNumber.value = inputNumber.value.slice(0, inputNumber.maxLength);
        }
    };
});

let loanAmount = document.getElementById('amount');
let loanInterest = document.getElementById('interest');
let loanTenure = document.getElementById('loanTenure');
let calculate = document.getElementById('calculate');

calculate.onclick = (e) => {
    e.preventDefault();

    let isYear = document.getElementById('year').checked;
    let isMonth = document.getElementById('month').checked;
    let noOfMonths = 0;

    if (!isYear && !isMonth) {
        alert('Please select loan tenure type -> Year or Month');
        return;
    }

    if (isYear) {
        noOfMonths = loanTenure.value * 12;
    } else {
        noOfMonths = loanTenure.value;
    }

    let r = parseFloat(loanInterest.value) / 12 / 100;
    let p = loanAmount.value;
    let n = noOfMonths;

    // EMI formula = (P * r * (1+r)^n ) / ((1+r)^n - 1)
    let emi = (p * r * Math.pow((1 + r), n)) / (Math.pow((1 + r), n) - 1);
    let totalInterest = (emi * n) - p;
    let totalPayment = totalInterest + parseFloat(p);

    document.getElementById('emi').innerHTML = '₹' + Math.round(emi);
    document.getElementById('totalInterest').innerHTML = '₹' + Math.round(totalInterest);
    document.getElementById('totalPayment').innerHTML = '₹' + Math.round(totalPayment);
};
