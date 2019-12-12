import React from "react";
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import MenuBar from "../components/Menu/Menu";
const divStyle ={
  width: '400px',
  height: '400px',
  margin: '0 auto',
};

class LocationMap extends React.Component {
  componentDidMount() {
    document.title = "Map | GoOut";
   this.map = L.map('map').setView([51.5, -0.09], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png',{
      detectRetina: true,
      maxZoom: 7
    }).addTo(this.map);
    this.map.invalidateSize();
    L.marker([51.5, -0.09]).addTo(this.map);

    function getCoördinates(item){
      
    }
  }
  render() {
    return(
    <div>
      <MenuBar/>
      <div id = 'map' style={divStyle}></div>
    </div>
     
      
    );
    
  }
}

export default LocationMap;

