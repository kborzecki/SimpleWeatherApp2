import config from '../../config/config'
import axios from 'axios'

export const FETCH_WEATHER = 'FETCH_WEATHER'

const ROOT_URL = `https://api.openweathermap.org/data/2.5/forecast?appid=${config.API_KEY}`

export function fetchWeather(city) {
  const url = `${ROOT_URL}&q=${city},pl`
  const request = axios.get(url)

  return {
    type: FETCH_WEATHER,
    payload: request
  }
}