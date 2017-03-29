import React, {Component} from 'react'
import {render} from 'react-dom'

import SelectPlaces from '../../src'
import 'react-select/dist/react-select.css'

class Demo extends Component {
  onChange = (value) => {
    console.log(value);
  }

  render() {
    return <div>
      <h1>react-select-places Demo</h1>
      <SelectPlaces onChange={this.onChange}/>
    </div>
  }
}

render(<Demo/>, document.querySelector('#demo'))
