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


function getGross(basic, benefits){ return basic + benefits; }

function calculateNHIF(gross){
  if(gross<=5999) return 150; if(gross<=7999) return 300;
  if(gross<=11999) return 400; if(gross<=14999) return 500;
  if(gross<=19999) return 600; if(gross<=24999) return 750;
  if(gross<=29999) return 850; if(gross<=34999) return 900;
  if(gross<=39999) return 950; if(gross<=44999) return 1000;
  if(gross<=49999) return 1100; if(gross<=59999) return 1200;
  if(gross<=69999) return 1300; if(gross<=79999) return 1400;
  if(gross<=89999) return 1500; if(gross<=99999) return 1600;
  return 1700;
}
// TASK 16: NSSF
function calculateNSSF(gross){ return Math.min(gross, 18000) * 0.06; }
// TASK 17: NHDF
function calculateNHDF(gross){ return gross * 0.015; }
// TASK 18: Taxable
function calculateTaxableIncome(gross,nssf,nhdf,nhif){ return gross-(nssf+nhdf+nhif); }
// TASK 19: PAYE
function calculatePAYEE(taxable){
  let paye=0;
  if(taxable<=24000) paye=taxable*0.10;
  else if(taxable<=32333) paye=24000*0.10+(taxable-24000)*0.25;
  else paye=24000*0.10+8333*0.25+(taxable-32333)*0.30;
  return Math.max(0, paye-2400);
}
// TASK 20: Net
function calculateNetSalary(gross,nhif,nhdf,nssf,payee){ return gross-(nhif+nhdf+nssf+payee); }

function runAll(){
  const basic=parseFloat(document.getElementById('basic').value)||0;
  const ben=parseFloat(document.getElementById('benefits').value)||0;
  const gross=getGross(basic,ben);
  const nhif=calculateNHIF(gross);
  const nssf=calculateNSSF(gross);
  const nhdf=calculateNHDF(gross);
  const taxable=calculateTaxableIncome(gross,nssf,nhdf,nhif);
  const payee=calculatePAYEE(taxable);
  const net=calculateNetSalary(gross,nhif,nhdf,nssf,payee);

  document.getElementById('table').innerHTML=`
    <tr><td>Gross Salary</td><td>${gross}</td></tr>
    <tr><td>NSSF (6% of 18k max)</td><td>${nssf.toFixed(2)}</td></tr>
    <tr><td>NHIF (Table)</td><td>${nhif}</td></tr>
    <tr><td>NHDF 1.5%</td><td>${nhdf.toFixed(2)}</td></tr>
    <tr><td>Taxable Income</td><td>${taxable.toFixed(2)}</td></tr>
    <tr><td>PAYE</td><td>${payee.toFixed(2)}</td></tr>
    <tr><td><b>Net Salary</b></td><td><b>${net.toFixed(2)}</b></td></tr>
  `;
  document.getElementById('net').innerText=`Net Pay: KES ${net.toFixed(2)}`;
}