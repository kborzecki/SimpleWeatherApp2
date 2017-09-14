import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchWeather } from '../actions/index'

export class SearchBar extends Component {
  constructor(props) {
    super(props)

    this.state = { term: '', placeholder: 'Location' }
    this.onInputChange = this.onInputChange.bind(this)
    this.onFormSubmit = this.onFormSubmit.bind(this)
  }

  onInputChange(event) {
    this.setState({term: event.target.value })
  }

  onFormSubmit(event) {
    event.preventDefault()
    if(this.state.term){
      this.props.fetchWeather(this.state.term)
      this.setState({ term: '' , placeholder: this.state.term })
    }
  }

  render() {
    return (
      <div>
        <form className="input-group"
          onSubmit={this.onFormSubmit}>
          <input
            className="form-control"
            placeholder={this.state.placeholder} 
            value={this.state.term}
            onChange={this.onInputChange} />
          <span className="input-group-btn">
            <button type="submit" className="btn btn-primary">Search</button>
          </span>

        </form>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchWeather }, dispatch)
}

export default connect(null, mapDispatchToProps)(SearchBar)