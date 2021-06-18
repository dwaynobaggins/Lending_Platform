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

     git clone https://github.com/dwaynobaggins/Countries.git 
     
Once the repository has been cloned, you will have two folders; **json_builder** and **client**.   
**json_builder** is for creating the .json files that will be used later by the client, and the **client** folder contains everything necessary to use those files.
There are node dependencies for this project and they will need to be installed in both folders.

## Install the dependencies

     npm install  
     
This command will need to be issued *twice*, once each inside both the **json_builder** and **client** folders
   
   
## Operating the json builder

     node findCountry.js united

This command will run findCountry.js to build a .json file as a filtered snippet from the http://restcountries.eu API.   
Note the final argument tells the API which countries to find by name, and can take a partial.   
The created .json is saved to the **data** folder in the client project.

## Operating the client
   
   
### Run a Http server localhost:5555

To operate the client frontend, you will need a server, which you can initilize on port 5555

     npm run serve
     
### Build the client project

The frontend is ready to go once cloned, but you can update it and then run the build (which transpiles the .js through Babel) 

     npm run build
     
## Notes on this Project

The frontend is purely functional, for practicality, rather than designed. What I mean by that is that I haven't prettied up the CSS nor made the page responsive. On a site for Web deployment these things would be a must. Also if I was to build a Web deployed site I wouldn't have used Babel on its own, it would be part of a build process like Webpack or Rollup. Or maybe Rome, which I've heard good things about.
   
The test did not explicitly tell me to start a Web server, but Fetch wont work without using Http: or Https: for loading its resources, so I took it as implicit that I needed to create a localhost to get it to work.
