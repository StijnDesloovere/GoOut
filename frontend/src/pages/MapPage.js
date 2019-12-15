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
    //For detecting current location
   this.map = L.map('map').locate({setView:true, maxZoom: 120}).on("locationfound", e => {
    
    L.marker([e.latitude, e.longitude]).bindPopup("Your location!").addTo(this.map);}).on("locationerror", error => {
  
    console.log("location not found");
  });


    L.tileLayer('https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png',{
      detectRetina: true,
    }).addTo(this.map);

    this.map.invalidateSize();
    
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

