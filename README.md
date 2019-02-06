# Get Roasted!!!
This app is my Nashville Software School front-end capstone. Get-Roasted!!! is an app for the home coffee roasting enthusiast.

The app provides the user with a selection of coffee beans. The user may then add coffee beans to their private inventory. From the inventory page, the user may select a bean to use for creating a roast profile. On the roasts page all profiles are accessible and the user may choose to create an attempt of that roast. When a roast is selected, the user is routed to a page containing all of their attempts at that roast.

The user has the ability to add, edit and delete their inventory and roast attempts. Add, edit and delete functionality of the beans and roasts is reserved for the app owner.

Each page provides search functionality by bean region or name or, on the attempts page, by attempt date.

The attempts page has graphing for all of the attempts of a roast with time vs temperature on first crack, second crack and the end of the roast.

## Tech Requirements
* React.js
* Use Firebase CRUD to easily read, add, edit and delete coffee beans, inventory, roasts and attempts
* Boostrap
* Reactstrap
* React libraries including React Search Field and React Animated CSS
* Planning with Github Projects

## Screenshots
![Auth Screenshot](./images/get-roasted-auth-view.png)
![Beans Screenshot](./images/get-roasted-beans-view.png)
![Beans Modal Screenshot](./images/get-roasted-beans-modal-view.png)
![Inventory Screenshot](./images/get-roasted-inventory-view.png)
![Roasts Screenshot](./images/get-roasted-roasts-view.png)
![Attempts Screenshot](./images/get-roasted-attemtps-view.png)
![Attempts Graph Screenshot](./images/get-roasted-attemtps-graph-view.png)

## Deployed Site Link
[Get-Roasted!!!](https://get-roasted-228b6.firebaseapp.com/)

## How to run this project:

* Setup Firebase  
  -Create a firebase project  
  -Enable 'Google Authentication'  
  -Create a Firebase Realtime Database (Not Firestore)  
  -Create an apiKeys.js file (an example file exists in the 'helpers' folder)
  -Copy firebase keys from firebase web app settings into apiKeys.js

* Clone or download the repo

* Browse to the repo directory in your terminal

* In the root of the project run ```npm install``` to install necessary dependencies

* ```npm start``` will run the project at http://localhost:3000

## Thank Yous
* Zoe Ames
* Callan Morrison
* Lauren Rouse
* Adam Wieckert
* Bryon Larrance
* Kaldi, the 9th century Ethiopian goatherd who noticed his animated goats and discovered coffee
