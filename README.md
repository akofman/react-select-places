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

:warning:`react-select` is not bundled into this component. You must add it as a dependency of your project in order to use `react-select-places`.

```javascript
npm install --save react-select
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

It also uses the Google Maps Places API, so you need to include it in the `<head>` of your HTML:

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

Then you have the possibility to configure the [AutocompletionRequest](https://developers.google.com/maps/documentation/javascript/3.exp/reference?hl=fr#AutocompletionRequest) as it is specified in the Google Places API.

Example:

```javascript
const autocompletionRequest = {
  types: ['(cities)'],
  componentRestrictions: {
    country: 'FR'
  }
};

<SelectPlaces autocompletionRequest={autocompletionRequest} />
```

The value retrieved from the parameter of the `onChange` callback is a [PlaceResult](https://developers.google.com/maps/documentation/javascript/3.exp/reference?hl=fr#PlaceResult).

It is possible to init a default value using the `value` property:

```javascript
<SelectPlaces value={{ label:'Paris' }} />
```

The `value` property can be an object with the `label` and `placeId` attributes.
If `placeId` is provided, this component will use the Google Maps Places API in order to retrieve the label to display in the right language. If the place is not retrieved, the provided `label` will be used.

```javascript
<SelectPlaces value={{ label:'defaultLabel', placeId:'ChIJpTvG15DL1IkRd8S0KlBVNTI' }} />
```

It is also possible to provide only the label as a string:

```javascript
<SelectPlaces value='Paris' />
```

# Contributing

See the [CONTRIBUTING.md](https://github.com/akofman/react-select-places/blob/master/CONTRIBUTING.md) for information on how to contribute.

# License

MIT Licensed. Copyright (c) Alexis Kofman 2017.

[build-badge]: https://img.shields.io/travis/akofman/react-select-places/master.png?style=flat-square
[build]: https://travis-ci.org/akofman/react-select-places

[npm-badge]: https://img.shields.io/npm/v/react-select-places.png?style=flat-square
[npm]: https://www.npmjs.org/package/react-select-places

[coveralls-badge]: https://img.shields.io/coveralls/akofman/react-select-places/master.png?style=flat-square
[coveralls]: https://coveralls.io/github/akofman/react-select-places
