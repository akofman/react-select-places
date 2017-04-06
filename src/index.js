import React, { Component, PropTypes } from 'react'
import Select from 'react-select';

class SelectPlaces extends Component {
  mapValueToState = async (props) => {
    const retrieveValue = async (props) => {
      let value;

      if(props.value.placeId) {
        try{
          value = await new Promise((resolve, reject) => {
            if(!this.placesService && window.google && window.google.maps) {
              this.placesService = new window.google.maps.places.PlacesService(this.refs.selectPlaces);
            }

            this.placesService.getDetails({placeId: props.value.placeId}, (placeInfo, requestStatus) => {
              if(requestStatus === 'OK') {
                resolve({label: placeInfo.formatted_address});
              }
              else if (props.value.label) {
                console.warn(`Google Maps Places API RequestStatus is: ${requestStatus}, label property is used`);
                resolve({label: props.value.label});
              }
              else {
                reject();
                console.warn(`Google Maps Places API RequestStatus is: ${requestStatus} and label property is missing`);
              }
            });
          });
        } catch(e) {
          console.warn('Google Maps Places is not loaded', e);
          value = props.value.label && { label: props.value.label };
        }
      } else {
        if(typeof props.value === 'string') {
          value = { label: props.value };
        }
        else {
          value = props.value.label && { label: props.value.label };
        }
      }
      return value;
    }

    if(props.multi) {
      let multiValue = [];
      props.value.forEach(async (place) => {
        multiValue.push(await retrieveValue({value: place}));
      });
      this.setState({value: await multiValue});
    } else {
      this.setState({value: await retrieveValue(props)});
    }
  }

  componentDidMount() {
    if (this.props.value) {
      this.mapValueToState(this.props);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value && this.props.value !== nextProps.value) {
      this.mapValueToState(nextProps);
    }
  }

  loadOptions = (input, callback) => {
    if (input) {
      if(!this.autocompleteService && window.google && window.google.maps) {
        this.autocompleteService = new window.google.maps.places.AutocompleteService();
      }

      if(this.autocompleteService) {
        this.autocompleteService.getPlacePredictions({...this.props.autocompletionRequest, input}, (predictions) => {
          let options = [];
          if(predictions) {
            options = predictions.map(prediction => ({
              label: prediction.description,
              ...prediction
            }));
          }

          callback(null, {
            options,
            complete: false
          });
        });
      }
      else {
        callback(null, {options: [], complete: false});
      }
    }
    else {
      callback(null, {options: [], complete: false});
    }
  }

  onChange = (value) => {
    const {onChange, multi, simpleValue} = this.props;
    const removing = this.multi && this.state && this.state.value && this.state.value.length > value.length;
    const place = multi?value[value.length -1]:value;

    if (place && place.place_id && onChange && !simpleValue && !removing) {
      if(!this.placesService) {
        this.placesService = new window.google.maps.places.PlacesService(this.refs.selectPlaces);
      }
      this.placesService.getDetails({placeId: place.place_id}, (placeInfo) => {
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
        <Select.Async {...this.props} valueKey='label' value={this.state && this.state.value} loadOptions={this.loadOptions} onChange={this.onChange} onOpen={this.onOpen}/>
        <div ref='selectPlaces'></div>
      </div>
    )
  }
}

SelectPlaces.propTypes = {
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.array
  ]),
  onChange: PropTypes.func,
  simpleValue: PropTypes.bool,
  autocompletionRequest:  PropTypes.shape({
    bounds: PropTypes.object,
    componentRestrictions: PropTypes.object,
    location: PropTypes.object,
    offset: PropTypes.number,
    radius: PropTypes.number,
    types: PropTypes.array
  })
};

export default SelectPlaces;
