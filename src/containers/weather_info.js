import React, { Component } from 'react'
import { connect } from 'react-redux'

class WeatherInfo extends Component {
  constructor(props){
    super(props)
    this.state = { tempConversion: 'celc' }


    this.toggleTempConversion = this.toggleTempConversion.bind(this)
  }

  getWeatherClassName(){
    const id = this.props.weather.weather[0].id
 
    if(id >= 200 && id <= 232){
      return 'wi-thunderstorm';
    } else if ((id >= 300 && id <= 321) || id == 511){
      return 'wi-rain-mix';
    } else if(id >= 500 && id <= 504){
      if (this.isDay()){
        // weather.color = 'day-rain';
        return 'wi-day-rain';
      } else {
        // weather.color = 'night-rain';
        return 'wi-night-alt-rain';
      }
    } else if(id >= 520 && id <= 531){
      return 'wi-rain';
    } else if(id >= 600 && id <= 622){
      if (this.isDay()){
        // weather.color = 'day-snow';
        return 'wi-day-snow';
      } else {
        // weather.color = 'night-snow';
        return 'wi-night-alt-snow';
      };
    } else if(id >= 701 && id <= 781){
      // weather.color = 'fog';
      return 'wi-fog';
    } else if(id == 800){
      if (this.isDay()){
        // weather.color = 'day-sunny';
        return 'wi-day-sunny';
      } else {
        // weather.color = 'night-clear';
        return 'wi-night-clear'
      };
    } else if(id == 801){
      if (this.isDay()) {
        // weather.color = 'day-cloudy';
        return 'wi-day-cloudy';
      } else {
        // weather.color = 'night-cloudy';
        return 'wi-night-alt-cloudy';
      };
    } else if(id == 802){
      return 'wi-cloud';
    } else if(id >= 803 && id <= 804){
      return 'wi-cloudy';
    } else {
      return 'wi-na';
    };
  }

  isDay(){
    const time = this.props.weather.dt
    const sunriseTime = this.props.weather.sys.sunrise
    const sunsetTime = this.props.weather.sys.sunset
    return time >= sunriseTime - 3600 && time <= sunsetTime + 1800
  }

  getTemp(){
    if (this.state.tempConversion == 'celc'){
      return `${(this.props.weather.main.temp - 273.15).toFixed(1)} °C`
    }
    if (this.state.tempConversion == 'fahr'){
      return `${(this.props.weather.main.temp * 9/5 - 459.67).toFixed(1)} °F`
    }
  }

  toggleTempConversion(){
    this.setState({ tempConversion: this.state.tempConversion == 'celc' ? 'fahr' : 'celc' })
  }
  

  render() {
    if(this.props.weather){
      return (
        <div id="weather" className="container text-center">
          <div>
            <h2><p id="location">
              {`${this.props.weather.name}, ${this.props.weather.sys.country}`}
            </p></h2>
          </div>
          <div>
            <div id="weather-icon-box">
              <i className={'wi weather-icon ' + this.getWeatherClassName()}></i> 
            </div>
            <div id="weather-info-box">
              <p id="temp" onClick={this.toggleTempConversion}>{this.getTemp()}</p>
              <p>{this.props.weather.weather[0].description}</p>
            </div>
          </div>
        </div>
      )
    }
    return <div></div>
  }
}

function mapStateToProps({ weather }) {
  return { weather }
}

export default connect(mapStateToProps)(WeatherInfo)