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
        document.getElementById('taxableincome').innerHTML = taxableIncome;

        let payee = calculatePAYEE(taxableIncome);
        document.getElementById('payee').innerHTML = payee;

        let netSalary = calculateNetSalary(grossSalary, nhdf, nhif, nssf, payee);
        document.getElementById('netsalary').innerHTML = netSalary;

})



function calculateNHIF(grossSalary) {
    if (grossSalary < 6000) return 150;
    else if (grossSalary < 8000) return 300;
    else if (grossSalary < 12000) return 400;
    else if (grossSalary < 15000) return 500;
    else if (grossSalary < 20000) return 600;
    else if (grossSalary < 25000) return 750;
    else if (grossSalary < 30000) return 850;
    else if (grossSalary < 35000) return 900;
    else if (grossSalary < 40000) return 950;
    else if (grossSalary < 45000) return 1000;
    else if (grossSalary < 50000) return 1100;
    else if (grossSalary < 60000) return 1200;
    else if (grossSalary < 70000) return 1300;
    else if (grossSalary < 80000) return 1400;
    else if (grossSalary < 90000) return 1500;
    else if (grossSalary < 100000) return 1600;
    else return 1700;
}

// number 16
function calculateNSSF(grossSalary) {
    return Math.min(grossSalary, 18000) * 0.06;
}

// number 17
function calculateNHDF(grossSalary) {
    return grossSalary * 0.015;
}

// number 18
function calculateTaxableIncome(grossSalary, nssf, nhdf, nhif) {
    return grossSalary - (nssf + nhdf + nhif);
}

// number 19
function calculatePAYEE(taxableIncome) {
    let payee = 0;

    if (taxableIncome > 0) {
        payee += Math.min(taxableIncome, 24000) * 0.10;
    }

    if (taxableIncome > 24000) {
        payee += Math.min(taxableIncome - 24000, 8333) * 0.25;
    }

    if (taxableIncome > 32333) {
        payee += Math.min(taxableIncome - 32333, 467667) * 0.30;
    }

    if (taxableIncome > 500000) {
        payee += Math.min(taxableIncome - 500000, 300000) * 0.325;
    }

    if (taxableIncome > 800000) {
        payee += (taxableIncome - 800000) * 0.35;
    }

     if (payee < 2400) {
        return 0;
    } else {
        return payee - 2400;
    }
}

// number 20
function calculateNetSalary(grossSalary, nhdf, nhif, nssf, payee) {
    return grossSalary - (nhdf + nhif + nssf + payee);
}