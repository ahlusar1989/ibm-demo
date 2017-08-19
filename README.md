## Getting Started

**Note : Please ensure that MongoDB is running.** Also, `npm3` is required to install dependencies properly and Node version is 6.9.

## Available Commands

1. `npm run start` - starts the development server with hot reloading enabled

2. `npm run bs` - bundles the code and starts the production server

3. `npm run test` - start the test runner

4. `npm run watch:test` - start the test runner with watch mode

5. `npm run cover` - generates test coverage report

6. `npm run lint` - runs linter to check for lint errors

7. `npm run clean-slate` - removes all node modules and dist directory and reinstalls all npm modules

## File Structure

### Webpack Configs

There are four types of Webpack configs provided `webpack.config.dev.js` (for development), `webpack.config.prod.js` (for production), `webpack.config.server.js` (for bundling server in production) and `webpack.config.babel.js` (for [babel-plugin-webpack-loaders](https://github.com/istarkov/babel-plugin-webpack-loaders) for server rendering of assets included through webpack).


### Server

This app uses an express web framework. The app sits in server.js where it checks for the node environment (NODE_ENV).

If NODE_ENV is development, we apply Webpack middlewares for bundling and Hot Module Replacement.

#### Server Side Rendering

React Router's match function is used for handling all page requests so that browser history works.

All the routes are defined in `client/routes.js`. React Router renders components according to route requested.

```js
// Server Side Rendering based on routes matched by React-router.
app.use((req, res) => {
    match({
        routes,
        location: req.url
    }, (err, redirectLocation, renderProps) => {
        if (err) {
            return res.status(500).end('Internal server error');
        }

        if (!renderProps) {
            return res.status(404).end('Not found!');
        }

        const initialState = {
            posts: [],
            post: {}
        };

        const store = configureStore(initialState);

        fetchComponentData(store.dispatch, renderProps.components, renderProps.params).then(() => {
            const initialView = renderToString(
                <Provider store = {store} >
                  <RouterContext {...renderProps}/>
                </Provider>
            );

            const finalState = store.getState();

            res.status(200).end(renderFullPage(initialView, finalState));
        }).catch(() => {
            res.end(renderFullPage('Error', {}));
        });
    });
});
```

`match` takes two parameters, first is an object that contains routes, location and history and second is a callback function which is called when routes have been matched to a location.

If there's an error in matching we return 500 status code, if no matches are found we return 404 status code. If a match is found then, we need to create a new Redux Store instance.

**Note:** A new Redux Store is recreated on every request.

`fetchComponentData` is the essential function. It takes three params: first is a dispatch function of Redux store, the second is an array of components that should be rendered in current route and third is the route params. `fetchComponentData` collects all the needs (need is an array of actions that are required to be dispatched before rendering the component) of components in the current route. It returns a promise when all the required actions are dispatched. We render the page and send data to the client for client-side rendering in `window.__INITIAL_STATE__`.

### Client

Client directory contains all the shared components, routes, modules.

#### components
This directory contains all the common components which are used throughout the project.

#### index.js
Index.js takes on the burden of client side rendering using the data provided from `window.__INITIAL_STATE__`.

#### modules
Modules are the way of organising different domain-specific modules in the project. A typical module contains the following


### Docker

There is a production docker configuration.

To run docker for production,

```
docker-compose build
docker-compose up

```
The app container will be listening on port 80. One can access locally at localhost:80.

## Misc Notes

### Importing Assets
Assets can be kept where you want and can be imported into your js files or css files. Those fill be served by webpack in development mode and copied to the dist folder during production.

### ES6 support
We use babel to transpile code in both server and client with `stage-0` plugin. So, you can use both ES6 and experimental ES7 features.

### Lessons Learned and Notes

#### Unstyled Content on initial Load
To make the hot reloading of CSS work, this app is not extracting CSS in development. Ideally, during server rendering, one would be extracting CSS, and one will get a .css file, and one can use it in the html template. That's what is being done in production, but in development, after all scripts get loaded, React loads the CSS as chunks. Hence why there is a second of unstyled content.

#### Client and Server Markup Mismatch
This warning is visible only on development and totally harmless. This occurs due to the hash difference in `react-router`. To solve it, react router docs asks you to use `match` function. If one uses `match`, `react-hot-reloader` stops working.
