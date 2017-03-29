import React, { Component } from 'react'
import Select from 'react-select';
import scriptjs from 'scriptjs';

class SelectPlaces extends Component {
  static propTypes = {
    value: React.PropTypes.string
  }

  constructor(props) {
    super(props);
    this.state = {
      value: null
    }
  }

  loadOptions = (input, callback) => {
    const getPlacePredictions = (input, callback) => {
      this.autocompleteService.getPlacePredictions({...this.props.autocompletionRequest, input}, (predictions) => {
        let options = [];
        if(predictions) {
          options = predictions.map(prediction => ({
            label: prediction.description,
            placeId: prediction.place_id
          }));
        }
        callback(null, {
          options,
          complete: false
        });
      });
    };

    if (input) {
      if (!this.autocompleteService) {
        scriptjs(`https://maps.googleapis.com/maps/api/js?libraries=places&language=${this.props.language}&no-cache=${Math.random()}`, () => {
          if (window.google) {
            this.autocompleteService = new window.google.maps.places.AutocompleteService();
            getPlacePredictions(input, callback);
          }
          else {
            callback(null, {options: [], complete: false});
          }
        });
      }
      else {
        getPlacePredictions(input, callback);
      }
    } else {
      callback(null, {options: [], complete: false});
    }
  }

  onChange = value => {
    const getDetails = (value) => {
      this.placesService.getDetails({placeId: value.placeId}, (placeResult) => {
        this.setState({
          value
        }, () => {
          this.props.onChange && this.props.onChange({ ...value, ...placeResult});
        });
      });
    }

    if(window.google && !this.placesService){
      this.placesService = new google.maps.places.PlacesService(this.refs.selectPlaces);
      getDetails(value);
    }
    else {
      getDetails(value);
    }
  }

  render() {
    return (
      <div>
        <Select.Async {...this.props} value={this.state.value} loadOptions={this.loadOptions} onChange={this.onChange} />
        <div ref='selectPlaces'></div>
      </div>
    )
  }
}

export default SelectPlaces;
