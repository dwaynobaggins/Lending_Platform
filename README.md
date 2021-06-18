# Task:

## Countries REST API

Create a basic Node command line script which consumes the REST Countries API - http://restcountries.eu   
Only returning countries that have the region value of "Europe".   
Which takes the argument of a country name (or partial): Eg node yourScript.js united      
Then writes a JSON object to a .json file of just the Country name and Capital city, with the filename of the input. Eg ./united.json    

     { results: [   
               {   
                    countryName: "United Kingdom",   
                    capitalCity: "London"   
               },   
               …   
          ]   
     }         
     
Also create a basic frontend in HTML and ES6 transpiled using Babel, which will take the input country name via a text field, load the matching .json file and then return a UL list of the countries and capitals below the field. This test is designed so it shows us that you can interact with external APIs, build backend JS to process that data and also frontend JS to consume that sort of data, within our current stack.   

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
