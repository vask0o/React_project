# React_project

The project is an online shop like olx, which is consisting of two parts - backend written in nodejs and express, and frontend with the usage of reactjs. It has two types of user > administrators and normal users. Administrators  are able to  approve  every newly created item which is added by normal users.Each new item must  be approved by admin in order to be view by other users. Pending approval items can e viewed and edited only by the user who created them. Approved items can be viewed by everyone and cannot be edited anymore. Rejected items can be view and edited by their creators.
Each registered used has a unique property location, which is dinamically generating a google ap from it in the profile page.




npm start
Runs the app in the development mode.
Open http://localhost:3000 to view it in the browser.
The default seeded admin is with username : Admin, password:123
Normal users and items are self added and need to be approved by admin.
The page will reload if you make edits.
You will also see any lint errors in the console.

npm test
Launches the test runner in the interactive watch mode.
See the section about running tests for more information.

npm run build
Builds the app for production to the build folder.
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.
Your app is ready to be deployed!
