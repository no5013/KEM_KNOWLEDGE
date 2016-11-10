import React, { Component } from 'react'
import {connect} from 'react-redux'

class Map extends Component {

  createMap() {
    this.map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 13.7246004, lng: 100.6331108},
      zoom: 6
    })
    this.createMarker()
    this.setCenter()
    this.addMapClickListener()
  }
  createMarker(){
    this.marker = new google.maps.Marker({
      map: map,
      draggable: true,
      animation: google.maps.Animation.DROP,
      position: {lat: 13.7246004, lng: 100.6331108},
      map:this.map
    })
  }
  relocateMarker(location,marker){
    marker.setPosition(location)
  }
  addMapClickListener(){
    let relocateMarker = this.relocateMarker
    let current_marker = this.marker
    google.maps.event.addListener(this.map, 'click', function(event) {
      relocateMarker(event.latLng,current_marker)
    })
  }
  setCenter(){
    let current_map = this.map
    let current_marker = this.marker
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }
        current_map.setCenter(pos)
        current_map.setZoom(10)
        current_marker.setPosition(pos)
      }, function() {
        handleLocationError(true,  current_map.getCenter());
      })
    }
  }
  componentDidMount() {
    this.createMap();
  }

  render(){
    let style={
      position:'absolute',
      height:'100%',
      width:'100%'
    }
    return (
      <div>
        <div id="map" style={style}></div>
      </div>
    )
  }
}
const mapStateToProps = (state) => {
  return state
}
const mapDispatchToProps = (dispatch) => {
  return {

  }
}
export default connect(mapStateToProps,mapDispatchToProps)(Map)
