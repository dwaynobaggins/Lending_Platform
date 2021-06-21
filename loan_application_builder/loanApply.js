const fs = require('fs');       
const log = require("fancy-log");                           // Make my logs a bit more helpful and pleasant to read
const partial = process.argv.slice(2);
const firstName = partial[0];                               // first name of applicant
const surname = partial[1];                                 // surname of applicant
const loanAmount = multiplyByMillion(partial[2]);           // Amount that the loan is for in GBP
const assetValue = multiplyByMillion(partial[3]);           // The value of the asset that the loan will be secured against               
const creditScore = partial[4];                             // The credit score of the applicant (between 1 and 999)
const loanToValue = determineLTV();                         // Loan to Value (LTV) is the amount that the loan is for,
                                                            // expressed as a percentage of the value of the asset that the loan will be secured against
var loanApproved = true;                                    // loan starts as approved by default, and if it fails any of the criteria it is set to fail
 
log.info('Name : ' + firstName + ' ' + surname);
log.info('Loan amount : £' + loanAmount);
log.info('Asset value : £' + assetValue);
log.info('Credit Score : ' + creditScore);
log.info('LTV : ' + loanToValue + '%');

function determineLTV() {    
    return Math.round((loanAmount / assetValue) * 100);
}

function multiplyByMillion(value) {
    return value * 1000000;
}

if (partial.length > 4) {   
    if (loanAmount > 1500000)  {
        // log.error('Application declined, loan amount too large');
        loanApproved = false;
    }
    else if (loanAmount >= 1000000)  {
        if (loanToValue > 60) {
            // log.error('Application declined, loan to value over 60%: ' + loanToValue + '% calculated.');
            loanApproved = false;
        }
        else if (creditScore < 950) {
            log.error('Application declined, credit score below 950');
            loanApproved = false;
        }
    }
    else if ((loanAmount >= 100000) && (loanAmount < 1000000))  {
        if (loanToValue < 60) {
            if (creditScore < 750) {
                // log.error('Application declined, case 1');
                loanApproved = false;
            }
        }
        else if (loanToValue < 80) {
            if (creditScore < 800) {
                // log.error('Application declined, case 2');
                loanApproved = false;
            }
        }
        else if (loanToValue < 90) {
            if (creditScore < 900) {
                // log.error('Application declined, case 3');
                loanApproved = false;
            }
        }
        else if (loanToValue >= 90) {
            // log.error('Application declined, case 4');
            loanApproved = false;
        }
    }
    else if (loanAmount < 100000) {
        // log.error('Application declined, loan amount too small');
    }
}
else {
    log.error('Five entry values required: FirstName Surname LoanAmount AssetValue CreditScore');
}

var status = (loanApproved == true) ? "Approved" : "Declined";
log.info('Current loan application status : ' + status);

fs.readFile(`applicants.json`, (err, data) => {
    if (err) {
        throw err;
    }
    else {
        let newJson = JSON.parse(data);
        newJson.applicants.push({
            firstName: firstName,
            surname: surname,
            loanAmount: loanAmount,
            assetValue: assetValue,
            creditScore: creditScore,
            LTV: loanToValue,
            status: status
        });
        showMetrics(newJson);
        writeApplicantsData(newJson);
    }
});

function showMetrics(newJson) {
    let applicantSuccessfulSum = 0;
    let LTVsum = 0;
    let totalValueSum = 0;
    for (let i = 0; i < newJson.applicants.length; i++) {
        let currentApplicant = newJson.applicants[i].status;
        if (currentApplicant == 'Approved') {
            applicantSuccessfulSum++;
        }
        let currentLTV = newJson.applicants[i].LTV;
        let currentLoanValue = newJson.applicants[i].loanAmount;
        LTVsum = LTVsum + currentLTV; 
        totalValueSum = totalValueSum + currentLoanValue;
        // log.info('currentLoanValue ' + currentLoanValue);
        // log.info('totalValueSum ' + totalValueSum)
    }
    let applicantUnsuccessfulSum = newJson.applicants.length - applicantSuccessfulSum;
    log.info('The total number of applicants to date : ' + newJson.applicants.length + '; ' + applicantSuccessfulSum + ' successful, and ' + applicantUnsuccessfulSum + ' unsuccessful');
    log.info('The total value of loans written to date : £' + totalValueSum);
    let meanAverage = Math.round(LTVsum / newJson.applicants.length);
    log.info('The mean average Loan to Value of all applications received to date : ' +  meanAverage + '%');
}

function writeApplicantsData(newJson) {
    // const data = JSON.stringify({ results: resultsArr });               // minimized json output
    const data = JSON.stringify({applicants:newJson.applicants}, null, 2);         // Human readable output

    fs.writeFile(`applicants.json`, data, (err) => {
        if (err) {
            throw err;
        }
        else {
            // log.info('File completed.');
        }
    });
}