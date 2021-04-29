## App Requirements

For this app to work, you will require an API key for the weather data from https://api.meteostat.net/

**Please Note:** At the time of writing, the Meteostat API is not currently accepting as many requests as it originally had in V1. Therefore, some requests may get refused seemingly at random (if you make the request for the same data a couple more times, it will usually give you something). I will wait until the V2 API goes fully live on May 1st, but if this issue persists after that time, I may need to look further into possible ways to work around this issue.

Once you have this key, go to the */font_end/public* directory. The key will need to be placed in a file named *api_settings.json*. There is a file already there called *api_settings.example.json* -- this will show you what needs to be in the *api_settings.json* file. If you want the front-end of the app to use the back-end API, then you will also need to poulate the relevant settings for that in *api_settings.json* (again, see *api_settings.example.json*).

- On May 1st 2020, the Meteostat API (which provides the weather data) will be moving to V2. I have now modified this app to work with that new version.
- The V2 Meteostat API was not allowing more than 20 requests every second. This was causing issues for the app, which is high in consecutive calls to that API (a station ID request, and then a weather request, for around 23 races every time). To solve this, I have split the race seasons into quarters, and you have to select a quarter when you do the search. This is a simplistic solution for now, but may be replaced with pagination in the future.

## React Info

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

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

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
