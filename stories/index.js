import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import { decorateAction } from '@kadira/storybook-addon-actions'
import SelectPlaces from '../src';
import 'react-select/dist/react-select.css'

const onClick = () => {
  action('test');
}

storiesOf('SelectPlaces', module)
  .add('default', () => (
    <SelectPlaces apiKey='AIzaSyBTu5Vh3iLX03PQWsK1IumqjsVDL2EnFx8'/>
  ))
  .add('retrieve places info from onChange', () => {

    return <SelectPlaces onChange={action()} apiKey='AIzaSyBTu5Vh3iLX03PQWsK1IumqjsVDL2EnFx8' />
  });
