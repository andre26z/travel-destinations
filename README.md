# Travel Destination React App - Developed by Andre A. Santos

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm install`
Install all the needed dependecies, the application and the node version used for the app is Node.js v18.17.1

### `npm start`
After installing the dependencies start the development mode whit npm start. 

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.


## Travel Destination Searcher
Welcome to the Travel Destination Searcher application! This web application allows you to search for travel destinations and explore information about them.

## How it Works
The Travel Destination Searcher is built using React and connects to a fake API to fetch destination data. Here's an overview of how it works:

Search Destinations: As you start typing in the search input box, the application dynamically searches for destinations based on your input. It uses the searchDestinations function to fetch matching destinations from the fake API.

Select a Destination: You can click on one of the search results to select a destination. The selected destination's details will then be displayed on the right side of the page. The getDestinationDetails function is used to retrieve detailed information about the selected destination.

Closest Countries: After selecting a destination, you can view a list of the closest countries to the selected destination. These countries are sorted by their proximity to the selected destination. You can click on any of these countries to view their details.

## Additional Features
The application calculates the distance between destinations using the Haversine formula, providing information about how far each destination is from the selected one.

## How to Use
Enter the name of a travel destination in the search input box.

As you type, the application will display matching destination options. Click on one of them to select it.

The selected destination's details will be shown on the right side of the page, including its name, description, country, climate, and currency.

Below the destination details, you'll find a list of the closest countries to the selected destination. Click on any of these countries to view their details.

## Note
This application uses a fake API for demonstration purposes. In a real-world scenario, it would connect to a real API or database to retrieve destination information.

Feel free to explore and discover travel destinations with the Travel Destination Searcher application!
