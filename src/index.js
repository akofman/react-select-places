import React, { Component } from 'react'
import Select from 'react-select';
import scriptjs from 'scriptjs';

class SelectPlaces extends Component {
  static propTypes = {
    value: React.PropTypes.string,
    apiKey: React.PropTypes.string,
    onChange: React.PropTypes.func,
    simpleValue: React.PropTypes.bool,
    language: React.PropTypes.string,
    autocompletionRequest:  React.PropTypes.shape({
      bounds: React.PropTypes.object,
      componentRestrictions: React.PropTypes.object,
      location: React.PropTypes.object,
      offset: React.PropTypes.number,
      radius: React.PropTypes.number,
      types: React.PropTypes.array
    })
  }

  bindInitialValue = (props) => {
    let value;
    if(props.value) {
      if(props.multi){
        value = props.value.map((label) => ({
          label
        }));
      } else {
        value = {label: props.value};
      }
    }
    return {value};
  }

  constructor(props) {
    super(props);
    this.state = this.bindInitialValue(props)
  }

  componentWillReceiveProps(nextProps) {
    this.setState(this.bindInitialValue(nextProps));
  }

  loadOptions = (input, callback) => {
    const {autocompletionRequest, language, apiKey} = this.props;
    const getPlacePredictions = (input, callback) => {
      this.autocompleteService.getPlacePredictions({...autocompletionRequest, input}, (predictions) => {
        let options = [];
        if(predictions) {
          options = predictions.map(prediction => ({
            label: prediction.description,
            placeId: prediction.place_id,
            ...prediction
          }));
        }

        callback(null, {
          options,
          complete: false
        });
      });
    };

    if (input) {
      if (!window.google || !window.google.maps) {
        scriptjs(`https://maps.googleapis.com/maps/api/js?libraries=places&language=${language}&key=${apiKey}&no-cache=${Math.random()}`, () => {
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
        if(!this.autocompleteService) {
          this.autocompleteService = new window.google.maps.places.AutocompleteService();
        }
        getPlacePredictions(input, callback);
      }
    } else {
      callback(null, {options: [], complete: false});
    }
  }

  onChange = value => {
    const {onChange, multi, simpleValue} = this.props;
    const removing = multi && this.state.value && this.state.value.length > value.length;
    const place = multi?value[value.length -1]:value;
    if (place && onChange && !simpleValue && !removing) {
      if(!this.placesService) {
        this.placesService = new google.maps.places.PlacesService(this.refs.selectPlaces);
      }
      this.placesService.getDetails({placeId: place.placeId}, (placeInfo) => {
        this.setState({
          value
        }, () => {
          onChange(placeInfo);
        });
      });
    }
    else {
      this.setState({
        value: simpleValue?value && {label: value}:value
      }, () => {
        onChange && onChange(value);
      });
    }
  }

  render() {
    return (
      <div>
        <Select.Async {...this.props} valueKey='label' value={this.state.value} loadOptions={this.loadOptions} onChange={this.onChange}  />
        <div ref="selectPlaces"></div>
      </div>
    )
  }
}

export default SelectPlaces;
