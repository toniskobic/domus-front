# Domus - React app

Domus is a React and ASP.NET Core application for organizing social events in student dormitories. React application was bootstrapped with [Devias Kit - React Admin Dashboard](https://github.com/devias-io/material-kit-react) template. React app and ASP.NET Core web API are in seperated repositories. This repo contains the React app.

This app was made as part of the undergraduate thesis (T. Škobić, "Web application development using UI frameworks", Undergraduate thesis, University of Zagreb, Faculty of Organization and Informatics, Varaždin, 2021., Available at: [https://urn.nsk.hr/urn:nbn:hr:211:415884](https://urn.nsk.hr/urn:nbn:hr:211:415884)).

The implemented functionalities of the application are:
- user authentication and authorization
- creating events of the selected category
- overview of events sorted by specific category
- overview of events and confirmation of arrival
- accepting or refusing to attend the event
- advertising
- administrative actions

State management is implemented using useContext and useReducer APIs.

## `npm start`

Runs the app in development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will automatically reload if you make changes to the code.<br>
You will see the build errors and lint warnings in the console.

## `npm test`

Runs the test watcher in an interactive mode.<br>
By default, runs tests related to files changed since the last commit.

[Read more about testing.](https://facebook.github.io/create-react-app/docs/running-tests)

## `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>

Your app is ready to be deployed.

![Upcoming Events](https://github.com/toniskobic/domus-front/blob/main/upcoming_events.png)


