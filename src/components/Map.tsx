import React, {useState, useEffect} from 'react';
import { MapContainer, Marker, Popup, TileLayer} from "react-leaflet";

const APIkey = "efdc732539f140c1afb149cdf767487d"

function Map() {

    const [location, setLocation] = useState();
    const [lat, setLat] = useState(51.505)
    const [lon, setLon] = useState(-0.09);

    function getLocationInfo(latitude: any, longitude: any) {
        const url = `https://api.opencagedata.com/geocode/v1/json?q=${latitude},${longitude}&key=${APIkey}`;
        fetch(url)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            if (data.status.code === 200) {
            console.log("results:", data.results);
            setLocation(data.results[0].formatted);
            setLon(longitude)
            setLat(latitude)
            } else {
            console.log("Reverse geolocation request failed.");
            }
        })
        .catch((error) => console.error(error));
    }

    var options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
    };
    function success(pos: any) {
        var crd = pos.coords;
        console.log("Your current position is:");
        console.log(`Latitude : ${crd.latitude}`);
        console.log(`Longitude: ${crd.longitude}`);
        console.log(`More or less ${crd.accuracy} meters`);

        getLocationInfo(crd.latitude, crd.longitude);
    }

    function errors(err: any) {
        console.warn(`ERROR(${err.code}): ${err.message}`);
    }

      useEffect(() => {
        if (navigator.geolocation) {
          navigator.permissions
            .query({ name: "geolocation" })
            .then(function (result) {
              console.log(result);
              if (result.state === "granted") {
                //If granted then you can directly call your function here
                navigator.geolocation.getCurrentPosition(success, errors, options);
              } else if (result.state === "prompt") {
                //If prompt then the user will be asked to give permission
                navigator.geolocation.getCurrentPosition(success, errors, options);
              } else if (result.state === "denied") {
                //If denied then you have to show instructions to enable location
              }
            });
        } else {
          console.log("Geolocation is not supported by this browser.");
        }
      }, []);

      const MapaCont = () => (
        <MapContainer center={[lat, lon]} zoom={13} scrollWheelZoom={true}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[lat, lon]} >
                <Popup>
                    Tu estas aqui: {location}
                </Popup>
            </Marker>
        </MapContainer>
      )



    
      return (
        console.log(location),
        <MapaCont />
      );
    }
    

export default Map