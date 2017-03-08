In the project directory, you can run:

### `npm install`

Install the app in local, then you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

User Stories <br>
0.As a user, I got all the transactions' data at main page and calculate the total balance.<br>
1.As a user, I need vendor names to be easily readable. Make the vendor names more readable, remove garbage from names.<br>
2.As a user, I do not want to have any duplicated transactions in the list. Use the data provided to detect and identify duplicate transactions.<br>
3.As a user, I need to get a list expense categories. For each category I need a list of transactions, and the total expenses for that category.<br>
4.As a user, I need to calculate daily calculated balances. A running total for each day. For example, if I have 3 transactions for the 5th 6th 7th, each for $5, then the daily balance on the 6th would be $10 (Not include in this release.I didnt make it for this release March 8th, 2017)<br>

Technology used: es6, reactjs, rc-table, axios, and enzyme plus jest for unit testing.
If you have question contact ssliu@ualberta.ca
