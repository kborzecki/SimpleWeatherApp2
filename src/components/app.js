import React, { Component } from 'react'
import SearchBar from './searchbar.js'
import WeatherInfo from '../containers/weather_info'

export default class App extends Component {
  render() {
    return (
      <div>
       <SearchBar />
       <WeatherInfo />
      </div>
    )
  }
}
