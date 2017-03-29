import React from 'react'
import {render} from 'react-dom'

import Component from '../../src'
import 'react-select/dist/react-select.css'

let Demo = React.createClass({
  render() {
    return <div>
      <h1>react-select-places Demo</h1>
      <Component/>
    </div>
  }
})

render(<Demo/>, document.querySelector('#demo'))
