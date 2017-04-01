# React-Select-Places

[![Travis][build-badge]][build]
[![npm package][npm-badge]][npm]
[![Coveralls][coveralls-badge]][coveralls]

A Select control for places built from [React-Select](https://github.com/JedWatson/react-select) and [Google Places](https://developers.google.com/places/).

## Demo & Examples
![demo](https://cloud.githubusercontent.com/assets/579922/24573198/8470ba08-1680-11e7-8726-e78ade5f0e05.gif)

Live demo: [akofman.github.io/react-select-places](https://akofman.github.io/react-select-places)

To run it locally, clone this repo then run:

```javascript
npm install
npm run storybook
```

Then open [`localhost:6006`](http://localhost:6006) in a browser.

## Installation

```javascript
npm install --save react-select-places
```

Then you can import `react-select-places` in your application:

```js
import SelectPlaces from 'react-select-places';
```
In order to style SelectPlaces, you can import the `react-select` css:
```js
import 'react-select/dist/react-select.css';
```
Or you can use [styled-component](https://github.com/styled-components/styled-components).

## Usage

`React-Select-Places` wraps `React-Select` so that you can use all of its [options](https://github.com/JedWatson/react-select#usage).

Example:

```javascript
var SelectPlaces = require('react-select-places');

function logChange(val) {
  console.log("Selected: " + val);
}

<SelectPlaces
  onChange={logChange}
/>
```

Also this component uses the Google Maps Places API, you need to include the Google Maps Places API in the <head> of your HTML:

```html
<!DOCTYPE html>
  <html>
  <head>
    …
    <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places"></script>
  </head>
  <body>
    …
  </body>
</html>
```
or you can provide your api key as a props:

```javascript
<SelectPlaces
  apiKey='YOUR_API_KEY'
/>
```
Then you have the possibility to configure the [AutocompletionRequest](https://developers.google.com/maps/documentation/javascript/3.exp/reference?hl=fr#AutocompletionRequest) as it is specified in the Google Places API:

```javascript
const autocompletionRequest = {
  types: ['(cities)'],
  componentRestrictions: {
    country: 'FR'
  }
};

<SelectPlaces autocompletionRequest={autocompletionRequest} apiKey={apiKey} />
```

# Contributing

See our [CONTRIBUTING.md](https://github.com/akofman/react-select-places/blob/master/CONTRIBUTING.md) for information on how to contribute.

# License

MIT Licensed. Copyright (c) Alexis Kofman 2017.

[build-badge]: https://img.shields.io/travis/akofman/react-select-places/master.png?style=flat-square
[build]: https://travis-ci.org/akofman/react-select-places

[npm-badge]: https://img.shields.io/npm/v/react-select-places.png?style=flat-square
[npm]: https://www.npmjs.org/package/react-select-places

[coveralls-badge]: https://img.shields.io/coveralls/akofman/react-select-places/master.png?style=flat-square
[coveralls]: https://coveralls.io/github/akofman/react-select-places
