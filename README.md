# Task:

Build a simple Console application using the technology of your choice (preferably C#) that enables the writing and reporting of loans as per the requirements below. This should be approached as a way that can demonstrate your process to solving problems (any required infrastructure can simply be mocked), and does not need to be built to a production standard. Instead the exercise should be timeboxed to no longer than an hour. Notes can be taken of any assumptions made, and also any other considerations or improvements that you might make if this was a production application.
   
## Requirements
### User inputs that the application should require:
* Amount that the loan is for in GBP
* The value of the asset that the loan will be secured against
* The credit score of the applicant (between 1 and 999)

### Metrics that the application should output:
* Whether or not the applicant was successful
* The total number of applicants to date, broken down by their success status
* The total value of loans written to date
* The mean average Loan to Value of all applications received to date
    * Loan to Value (LTV) is the amount that the loan is for, expressed as a percentage of the value of the asset that the loan will be secured against.

### Business rules used to derive whether or not the applicant was successful:
* If the value of the loan is more than £1.5 million or less than £100,000 then the application must be declined
* If the value of the loan is £1 million or more then the LTV must be 60% or less and the credit score of the applicant must be 950 or more
* If the value of the loan is less than £1 million then the following rules apply:
    * If the LTV is less than 60%, the credit score of the applicant must be 750 or more
    * If the LTV is less than 80%, the credit score of the applicant must be 800 or more
    * If the LTV is less than 90%, the credit score of the applicant must be 900 or more
    * If the LTV is 90% or more, the application must be declined

# Solution:

## Clone this repository

     git clone https://github.com/dwaynobaggins/Lending_Platform.git 
     
Once the repository has been cloned, you will have one folder; **loan_application_builder**  
**loan_application_builder** is for entering loan applicant details and updating the .json data by adding the current applicant.
There are node dependencies for this project and they will need to be installed in this folder.

## Install the dependencies

     npm install  
     
This command will need to be issued once, inside the **loan_application_builder** folder
   
## Operating the loan application builder

     node loanApply.js dwayne brick 0.9 1.2 900

This command will run loanApply.js to first determine if the loan application was successful and then enter the loan application details into an external .json file that holds all applicants to date. The builder requires 5 values, in this order; first name, surname, loan value (in millions), value of the asset that the loan will be secured against (in millions), the credit score of the applicant (between 1 and 999).
All required information will then be output to the console window.


## Notes on this Project

I assumed that the user would enter in their information accurately. A production version of this would require a decent amount of user input validation/restriction, for things like special characters or missing/invalid input.
A front end would very useful here, to display the contents of the applicants database, with metrics such as the mean average Loan to Value of all applications readily visible.
JSON is not the optimal medium for creating a database so a more suitable database solution would be employed if this was a production application.
