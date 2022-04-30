![Data Flow](documentation/UI.PNG?raw=true "UI")

# Simple React TODO App

This app was created to learn new things and see how React has evolved(4years since last project with React)
Created using PrimeReact, Axios, RxJS and Mirage.

## Data Flow

![Data Flow](documentation/dataFlow.png?raw=true "Data Flow")

## Known bugs

- ~~Todo items are fetched two times when the app is opened in the browser.~~ Was caused by React.StrictMode tag at index.tsx file. The strict mode intentionally invokes useState, useMemo, etc. [React doc - Strict mode](https://reactjs.org/docs/strict-mode.html)

## To improve

- Unit tests.
- Text localization.
- User accounts so the app could be used by multiple different users and the remote storage would make more sense.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.

### `npm test`

Launches the test runner in the interactive watch mode.

### `npm run build`

Builds the app for production to the `build` folder.
