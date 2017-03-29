import React, { Component } from 'react'
import Select from 'react-select';
import scriptjs from 'scriptjs';

class SelectPlaces extends Component {
  static defaultProps = {
    value: null
  }

  static propTypes = {
    value: React.PropTypes.string
  }

  state = {
    value: this.props.value,
  }

  getPlacePredictions = (input, callback) => {
    this.autocompleteService.getPlacePredictions({...this.props.autocompletionRequest, input}, (predictions) => {
      let options = [];
      if(predictions) {
        options = predictions.map(prediction => ({
          label: prediction.description
        }));
      }
      callback(null, {
        options,
        complete: false
      });
    });
  }

  loadOptions = (input, callback) => {
    if (input) {
      if (!this.autocompleteService) {
        scriptjs(`https://maps.googleapis.com/maps/api/js?libraries=places&language=${this.props.language}&no-cache=${Math.random()}`, () => {
          if (window.google) {
            this.autocompleteService = new window.google.maps.places.AutocompleteService();
            this.getPlacePredictions(input, callback);
          }
          else {
            callback(null, {options: [], complete: false});
          }
        });
      }
      else {
        this.getPlacePredictions(input, callback);
      }
    } else {
      callback(null, {options: [], complete: false});
    }
  }

  onChange = value => {
    this.setState({
      value
    });
  }

  render() {
    return (
      <div>
        <Select.Async value={this.state.value} loadOptions={this.loadOptions} onChange={this.onChange} {...this.props.optionsForSelect} />
      </div>
    )
  }
}

export default SelectPlaces;
