import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import SelectPlaces from '../src';
import 'react-select/dist/react-select.css';
import './styles.css';

const apiKey = 'AIzaSyBTu5Vh3iLX03PQWsK1IumqjsVDL2EnFx8';
const inline = true;

storiesOf('SelectPlaces', module)
.addWithInfo(
  'default',
  `
  This is the basic usage without any props.
  `,
  () => (<SelectPlaces apiKey={apiKey} />),
  { inline }
)
.addWithInfo(
  'override styles',
  (<div>
    <p>
      It is possible to override the default <a href='https://github.com/JedWatson/react-select' target='_blank'>
        react-select
      </a> styles
      from the className props which is also convenient in order to
      use libs like <a href='https://github.com/styled-components/styled-components' target='_blank'>
        styled-component
      </a>.
    </p>
  </div>),
  () => (<SelectPlaces className={'short pink'} apiKey={apiKey} />),
  { inline }
)
.addWithInfo(
  'retrieve places info on change',
  (<div>
    <p>
      The <b>onChange</b> callback gives access to more places info returned by the <a
      href='https://developers.google.com/maps/documentation/javascript/reference?hl=fr#PlaceResult' target='_blank'> Google Maps Places api</a>.
    </p>
  </div>),
  () => (<SelectPlaces onChange={action('onChange')} apiKey={apiKey} />),
  { inline }
)
.addWithInfo(
  'restrict predictions to cities in France',
  (<div>
    <p>
      It is possible to customize the autocompletion request based on the <a
      href='https://developers.google.com/maps/documentation/javascript/reference?hl=fr#AutocompletionRequest' target='_blank'> AutocompletionRequest object specification</a> of
      the Google Maps Places api.
    </p>
  </div>),
  () => {
    const autocompletionRequest = {
      types: ['(cities)'],
      componentRestrictions: {
        country: 'FR'
      }
    };
    return <SelectPlaces autocompletionRequest={autocompletionRequest} apiKey={apiKey} />
  },
  { inline }
);
