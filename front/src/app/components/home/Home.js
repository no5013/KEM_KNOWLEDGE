import React, { Component } from 'react'
import { Link } from 'react-router'
import {Input,Button,Table} from 'react-materialize'
import {loadRice} from '../../actions/RiceAction'
import {connect} from 'react-redux'
import Map from './Map'

class Home extends Component {
  render() {
    return (
      <Map/>
    )
  }
}
const mapStateToProps = (state) => {
  return state
}
export default connect(mapStateToProps)(Home)
