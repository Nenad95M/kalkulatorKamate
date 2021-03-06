// Osluskivaci
document.getElementById('loan-form').addEventListener('submit', function(e){
    e.preventDefault();
    //prikaz elemenata
    document.getElementById('results').style.display='none';
    document.getElementById('loading').style.display='block';
    setTimeout(calculateResults,2000);

});

function calculateResults(){
    //pristupamo inputima forme
    const amount= document.getElementById('amount');
    const interest=document.getElementById('interest');
    const years=document.getElementById('years');
    const monthlyPayment=document.getElementById('monthly-payment');
    const totalInterest=document.getElementById('total-interest');
    const totalPayment=document.getElementById('total-payment');

    //racunamo
   const principal=parseFloat(amount.value);
   const calculateInterest=parseFloat(interest.value)/100/12;
   const calculatePayments=parseFloat(years.value)*12;
    //mesecna rata
   const x=Math.pow(1+calculateInterest,calculatePayments);
   const monthly=(principal*x*calculateInterest)/(x-1);
    //proveravamo da li je u pitanju konacan broj, ako jeste idemo dalje
   if(isFinite(monthly)){
    monthlyPayment.value=monthly.toFixed(2);
    totalPayment.value=(monthly*calculatePayments).toFixed(2);
    totalInterest.value=((monthly*calculatePayments)-principal).toFixed(2);

    document.getElementById('results').style.display='block';
    document.getElementById('loading').style.display='none';

}
else{

showError("Проверите унос");

}

}

function showError(error){
    document.getElementById('loading').style.display='none';

    //pravimo div
    const errorDiv=document.createElement('div');

    //dodajemo mu bootstrap klase
    errorDiv.className='alert alert-danger';
    errorDiv.appendChild(document.createTextNode(error));

    //pristupamo elementu u koji ga smestamo
    const card=document.querySelector('.card');
    const heading=document.querySelector('.heading');
    //ubacivanje elementa iznad pristupljenih elemenata
    card.insertBefore(errorDiv, heading);
    setTimeout(clearError,3000);

}
function clearError(){

    document.querySelector('.alert').remove();

}