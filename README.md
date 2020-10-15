# FULL STACK APP WITH REACT AND REST API

## Tenth Full Stack JavaScript Techdegree - Full stack REACT app Project - Unit-10

---
**APP** using REACT for Client and Express for REST API that provide a way for users to administer a school database containing information about courses: users can interact with the database by _retrieving_ a list of courses, _viewing_ detail for a specific course, as well as _creating_, _updating_ and _deleting_ courses in the database.

In addition, require users to _create an account and _sign in_ to make changes to the database.

Created with [**React js**](https://github.com/reactjs) and consuming [**REST API**](https://github.com/MikeLiam/rest_api) using [**create_react_app**](https://github.com/facebook/create-react-app), [**react_router**](https://github.com/ReactTraining/react-router), first look to landing page:

- Show all existing courses, link to create a new course and options to create a new user or sign in with an existing user:
![Landing page](https://res.cloudinary.com/da3z5stec/image/upload/v1601300853/Full%20stack%20app/landing_page_b1y0z0.png)
- To create a new user to be able to modify courses or create a new course, or sign in with user:
![Sign up/Sign in](https://res.cloudinary.com/da3z5stec/image/upload/v1601300853/Full%20stack%20app/signupin_plv0j9.png)
- To create a new Course once user has signed in:
![New Course](https://res.cloudinary.com/da3z5stec/image/upload/v1601300853/Full%20stack%20app/new_course_ryw93m.png)
- View detail for a specific course once user has signed in and where updates or deletes if user own the course:
![Detail Course](https://res.cloudinary.com/da3z5stec/image/upload/v1601300853/Full%20stack%20app/detailcourse2_phyinm.png)
- Updating a course:
![Update Course](https://res.cloudinary.com/da3z5stec/image/upload/v1601300854/Full%20stack%20app/update_fqqqu1.png)

## Getting Started

### REST API live on:
[REST API LIVE](https://restapimikeliam.herokuapp.com/api/).

### To run the client.

Open a new terminal on _client_ folder and install the dependencies.

```
npm install

```

And lastly, start the application listening at [http://localhost:3000/](http://localhost:3000/).

```
npm start
```

### To get up and running the REST API "locally", run the following commands.

Go to _[REST API repository](https://github.com/MikeLiam/rest_api)_ .

```
npm install

```

Second, seed the SQLite database.

```
npm run seed
```

And lastly, start the application listening at [http://localhost:5000/](http://localhost:5000/).

```
npm start
```
---

### Style Customization:
---
* Theme based on green palette colours.
* Courses and new course links styled with clip-path and animation.
* Added Markdown utility for textareas on view detailed course.
* Logo as favicon.

---

![MikelIam](https://res.cloudinary.com/da3z5stec/image/upload/v1597004412/Portfolio/logo_about_pemkn6.jpg)

---

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `yarn build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
