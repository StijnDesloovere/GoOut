import React from "react";
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-control-geocoder/dist/Control.Geocoder.js';
import MenuBar from "../components/Menu/Menu";

const divStyle ={
  width: '400px',
  height: '400px',
  margin: '0 auto',
};

const weatherbox ={
  width: '150px',
  height: '100px',
  overflow: 'hidden'
};
var map =null;

class LocationMap extends React.Component {

  //Code from the WPO's 
  getCurrentLocation() {
    var onError = function(error) {
      alert("Could not get the current location.");
    };
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
        function(position) {
          var currentLocation = [position.coords.latitude, position.coords.longitude];
          map.setView(currentLocation, 17)
          var output = "Your current position is:" + currentLocation[0] + "," + currentLocation[1];
          document.getElementById("currentPosition").innerHTML = output;
          L.marker([position.coords.latitude, position.coords.longitude]).addTo(map).bindPopup("You are here!");
        }, 
        onError
      );
    }else{
      onError();
    }
  }

  MarkersandPopupLoop(array){

    for(var i; i< array.length; i++){
      L.marker([array[i].lat, array[i].long]).addTo(map).bindPopup("Name event:" +array[i].name+"<br> Time:" + array[i].startTime +"-"+array[i].endTime);
    }
  }
 
 
  componentDidMount() {
    document.title = "Map | GoOut";
    //Based in the WPO's of Mapping
    var MAPBOX_ACCESSTOKEN = "pk.eyJ1Ijoic3Rpam5kZXNsb292ZXJlIiwiYSI6ImNrM3VjamhvOTA4ZXYzZWs0N3Jpd3E5b3EifQ.ZYonYGoNAEX7YrlHcv9DGw";

    map = L.map('map').locate({setView:true, maxZoom: 120});

    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
				attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
				maxZoom: 18,
				id: 'mapbox/streets-v11',
				accessToken: MAPBOX_ACCESSTOKEN
      }).addTo(map);
    }

  render() {
    return(
      <div>
      <MenuBar/>
      <div id = 'map' style={divStyle}></div>
      <button onClick={this.getCurrentLocation.bind(this)}>Get Current Position</button>
      <div id="currentPosition"></div>
    </div>
      
    );
    
  }
}

export default LocationMap;

