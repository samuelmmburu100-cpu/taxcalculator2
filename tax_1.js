document.getElementById('tax_form').addEventListener('submit',function(event){
         event.preventDefault();

   
        let basicSalary = Number(document.getElementById("basic").value);
        let benefits = Number(document.getElementById("benefits").value);

        function calculateGrossSalary(basic, benefits) {
        return basic + benefits;
        }

        let grossSalary = calculateGrossSalary(basicSalary, benefits);
        document.getElementById('gross').innerHTML = grossSalary

        let nhif = calculateNHIF(grossSalary);
        document.getElementById('nhif').innerHTML = nhif;

        let nssf = calculateNSSF(grossSalary);
        document.getElementById('nssf').innerHTML = nssf;

        let nhdf = calculateNHDF(grossSalary);
        document.getElementById('nhdf').innerHTML = nhdf;

        let taxableIncome = calculateTaxableIncome(grossSalary, nssf, nhdf, nhif);
        document.getElementById('taxable income').innerHTML = taxableIncome;

        let payee = calculatePAYEE(taxableIncome);
        document.getElementById('payee').innerHTML = payee;

        let netSalary = calculateNetSalary(grossSalary, nhdf, nhif, nssf, payee);
        document.getElementById('net salary').innerHTML = netSalary;

})



// Helper: Gross Salary
function calculateGrossSalary(basic, benefits) {
    return basic + benefits;
}

// TASK 15: NHIF - Kenya rates
function calculateNHIF(gross) {
    if (gross <= 5999) return 150;
    if (gross <= 7999) return 300;
    if (gross <= 11999) return 400;
    if (gross <= 14999) return 500;
    if (gross <= 19999) return 600;
    if (gross <= 24999) return 750;
    if (gross <= 29999) return 850;
    if (gross <= 34999) return 900;
    if (gross <= 39999) return 950;
    if (gross <= 44999) return 1000;
    if (gross <= 49999) return 1100;
    if (gross <= 59999) return 1200;
    if (gross <= 69999) return 1300;
    if (gross <= 79999) return 1400;
    if (gross <= 89999) return 1500;
    if (gross <= 99999) return 1600;
    return 1700; // 100k+
}

// TASK 16: NSSF - 6% but capped at 18,000
function calculateNSSF(gross) {
    const pensionable = gross > 18000 ? 18000 : gross;
    return pensionable * 0.06; // max is 1080
}

// TASK 17: NHDF / Housing Levy - 1.5%
function calculateNHDF(gross) {
    return gross * 0.015;
}

// TASK 18: Taxable Income
function calculateTaxableIncome(gross, nssf, nhdf, nhif) {
    return gross - (nssf + nhdf + nhif);
}

// TASK 19: PAYEE - Kenya KRA Rates 2023-2025
// Bands monthly: 0-24000=10%, 24001-32333=25%, 32334-500000=30%, 500001-800000=32.5%, 800k+=35%
// Personal Relief = 2400
function calculatePAYEE(taxableIncome) {
    let tax = 0;
    
    if (taxableIncome <= 24000) {
        tax = taxableIncome * 0.10;
    } else if (taxableIncome <= 32333) {
        tax = (24000 * 0.10) + ((taxableIncome - 24000) * 0.25);
    } else if (taxableIncome <= 500000) {
        tax = (24000 * 0.10) + (8333 * 0.25) + ((taxableIncome - 32333) * 0.30);
    } else if (taxableIncome <= 800000) {
        tax = (24000 * 0.10) + (8333 * 0.25) + (467667 * 0.30) + ((taxableIncome - 500000) * 0.325);
    } else {
        tax = (24000 * 0.10) + (8333 * 0.25) + (467667 * 0.30) + (300000 * 0.325) + ((taxableIncome - 800000) * 0.35);
    }

    // Apply personal relief
    let payee = tax - 2400;
    if (payee < 0) payee = 0; // If earning less than 24k, PAYEE is 0

    return payee;
}

// TASK 20: Net Salary
function calculateNetSalary(gross, nhif, nhdf, nssf, payee) {
    return gross - (nhif + nhdf + nssf + payee);
}

// ===================== QUESTION FUNCTIONS FOR HTML =====================

function question15() { // NHIF only
    const basic = parseFloat(document.getElementById('basic').value);
    const benefits = parseFloat(document.getElementById('benefits').value);
    const gross = calculateGrossSalary(basic, benefits);
    const nhif = calculateNHIF(gross);
    showResult(`Gross: ${gross} <br> NHIF: ${nhif}`);
}

function question16() { // NSSF
    const {gross, nhif, nssf} = getCore();
    showResult(`Gross: ${gross} <br> NHIF: ${nhif} <br> NSSF: ${nssf}`);
}

function question17() { // NHDF
    const {gross, nhif, nssf, nhdf} = getCore();
    showResult(`Gross: ${gross} <br> NHIF: ${nhif} <br> NSSF: ${nssf} <br> NHDF: ${nhdf}`);
}

function question18() { // Taxable Income
    const {gross, nhif, nssf, nhdf, taxable} = getCore();
    showResult(`Gross: ${gross} <br> Deductions (NSSF+NHDF+NHIF): ${nssf+nhdf+nhif} <br> <b>Taxable Income: ${taxable}</b>`);
}

function question19() { // PAYEE
    const {gross, taxable, payee} = getCore();
    showResult(`Gross: ${gross} <br> Taxable: ${taxable} <br> <b>PAYEE: ${payee.toFixed(2)}</b>`);
}

function question20() { // Net Salary FINAL
    const {gross, nhif, nssf, nhdf, taxable, payee, net} = getCore();
    showResult(`
        Gross: Ksh ${gross.toLocaleString()}<br>
        NHIF: ${nhif}<br>
        NSSF: ${nssf}<br>
        NHDF (1.5%): ${nhdf}<br>
        Taxable Income: ${taxable}<br>
        PAYEE: ${payee.toFixed(2)}<br>
        <hr>
        <b>NET SALARY: Ksh ${net.toLocaleString()}</b>
    `);
}

// Helpers for HTML
function getCore(){
    const basic = parseFloat(document.getElementById('basic').value);
    const benefits = parseFloat(document.getElementById('benefits').value);
    const gross = calculateGrossSalary(basic, benefits);
    const nhif = calculateNHIF(gross);
    const nssf = calculateNSSF(gross);
    const nhdf = calculateNHDF(gross);
    const taxable = calculateTaxableIncome(gross, nssf, nhdf, nhif);
    const payee = calculatePAYEE(taxable);
    const net = calculateNetSalary(gross, nhif, nhdf, nssf, payee);
    return {basic, benefits, gross, nhif, nssf, nhdf, taxable, payee, net};
}
function showResult(html){ document.getElementById('result').innerHTML = html; }