# ngOps

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.2.1.

## Features

- MySql Connector 
- Register user
- Login User
- Forgot Password (TODO)
- Bootstrap Responsive Admin Theme
- Admin Dashboard
- Left Sidebar
- Top Navbar
- User management i.e.
   - Users List
   - User Details
   - User Edit
   - User Add
   - User Delete
   - User Searching, Sorting and Pagination
- Attendance management i.e.
   - Attendance List
   - Attendance Searching, Sorting and Pagination
- Task Log management i.e.
   - Add new Task Log
   - Task Log List
   - Task Log Searching, Sorting and Pagination
- Login management i.e.
   - Login List of all the users
   - Login Searching, Sorting and Pagination 
- Profile management i.e.
   - Update Profile
   - Update Password
   
## How to install

Copy the folder to any location in your computer.
It has two apps first `Angular App` and second one is `ExpressJS` for api. You need to install both the app and both should be running simultaneously to work this cms. You also need to modify apiUrl and appUrl inside environments files and in env.js file. 
Please note env.js file overwrites the environment variables.

Go to manageACL and run `npm install` to install its dependencies. 
Then run `ng serve`.
Then Open another terminal and Go to the api and run `npm install` then run the command
`node server.js`

That's it.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` or `ng g c component-name --no-spec` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
