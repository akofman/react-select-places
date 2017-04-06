import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import scriptjs from 'scriptjs';
import SelectPlaces from '../src';
import 'react-select/dist/react-select.css';
import './styles.css';

const inline = true;

storiesOf('SelectPlaces', module)
.addWithInfo(
  'default',
  null,
  () => (
    <div>
      <p>
        This is the basic usage without any props or with a default value.
      </p>
      <SelectPlaces />
      <p>
        As a default value it is possible to provide a <b>label</b> and a <b>placeId</b>.
        <br/>If the <b>placeId</b> property is provided, this component will use the <b>Google Maps Places API</b> in order to retrieve the label to display.
        <br/>If the place is not retrieved, the <b>label</b> property will be used:
      </p>
      <SelectPlaces value={{placeId: 'ChIJpTvG15DL1IkRd8S0KlBVNTI'}} />
      <br/>
      <SelectPlaces value={{label: 'MyCity'}} />
      <br/>
      <SelectPlaces value={{label:'MyCity', placeId: 'fakeId'}} />
      <p>
        It is also possible to provide only the label as a string:
      </p>
      <SelectPlaces value='MyCity' />
    </div>
  ),
  { inline }
)
.addWithInfo(
  'override styles',
  (<div>
    <p>
      It is possible to override the default <a href='https://github.com/JedWatson/react-select' target='_blank'>
      react-select</a> styles
      from the className props which is also convenient in order to
      use libs like <a href='https://github.com/styled-components/styled-components' target='_blank'>
      styled-component</a>.
    </p>
  </div>),
  () => (<SelectPlaces className={'short pink'} />),
  { inline }
)
.addWithInfo(
  'retrieve places info on change',
  (<div>
    <p>
      The <b>onChange</b> callback gives access to more places info returned by the <a
        href='https://developers.google.com/maps/documentation/javascript/reference?hl=fr#PlaceResult' target='_blank'> Google Maps Places api
      </a>.
    </p>
  </div>),
  () => (<SelectPlaces onChange={action('onChange')} />),
  { inline }
)
.addWithInfo(
  'restrict predictions to cities in France',
  (<div>
    <p>
      It is possible to customize the autocompletion request based on the <a
        href='https://developers.google.com/maps/documentation/javascript/reference?hl=fr#AutocompletionRequest' target='_blank'> AutocompletionRequest object specification
      </a> of
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
    return <SelectPlaces autocompletionRequest={autocompletionRequest} />
  },
  { inline }
)
.addWithInfo(
  'Use multi select',
  (<div>
    <p>
      As a wrapper of <a href='https://github.com/JedWatson/react-select' target='_blank'>
      react-select</a>, <a href='https://github.com/akofman/react-select-places' target='_blank'>
      react-select-places</a> proposes the same <a href='https://github.com/JedWatson/react-select#usage' target='_blank'>
      usage</a>.
      So it is possible to use the <b>multi</b> prop as it is done in this first sample or using it with the <b>simpleValue</b> prop.
    </p>
  </div>),
  () => {
    return (
      <div>
        <SelectPlaces multi onChange={action('onChange')} value={['France', 'Australia']} />
        <br/>
        <SelectPlaces simpleValue delimiter='&' multi onChange={action('onChange')} />
      </div>
    )
  },
  { inline }
);
