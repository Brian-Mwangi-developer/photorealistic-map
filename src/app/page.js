"use client";
import { Wrapper } from '@googlemaps/react-wrapper'
import { useEffect, useRef, useState } from 'react';
import ChoosenArea from "../components/choosenArea"



// const MapOptions = {
//   mapId: process.env.NEXT_PUBLIC_MAP_ID,
//   center: { lat: 40.712772, lng: -74.006058 },
//   zoom: 18,
//   disableDefaultUI: true,
//   heading: 25,
//   tilt: 67,
// };

export default function Home() {
  return (
    <Wrapper
      apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
      version='alpha'
      libraries={["places", "maps3d"]}
    >
      <Map />
    </Wrapper>
  );
}

function Map(){
  const [map, setMap] = useState();
  const [currentLocation, setCurrentLocation] = useState({lat: 40.712772, lng: -74.006058});
  const mapContainerRef= useRef(null);

  useEffect(() => {
    const initializeMap = async () => {
      const { Map3DElement } = await google.maps.importLibrary("maps3d");
      const container = document.createElement("div");
      container.style.width = "100%";
      container.style.height = "100%";
      
      const Mapsin3d = new Map3DElement({
        center: {lat:currentLocation.lat, lng:currentLocation.lng, altitude:400},
        range:1000,
        tilt:50,
      });
      if(mapContainerRef.current){
        mapContainerRef.current.innerHTML = "";
        mapContainerRef.current.appendChild(Mapsin3d);
        console.log("Container",Mapsin3d)
      }
      
      setMap(Mapsin3d);
    };

    initializeMap();
  }, []);
  useEffect(() => {
    if (map && currentLocation) {
      // Fly to the new location smoothly when currentLocation changes
      console.log(currentLocation)
      map.flyCameraTo({
        endCamera: {
          center:{lat:currentLocation.lat, lng:currentLocation.lng, altitude:400},
          tilt: 50,
          range: 1000,
        },
        durationMillis: 10000,
      });
    }
  }, [currentLocation, map]); 
  return (
    <>
      <div className="h-screen w-screen" ref={mapContainerRef} />
      {map && <ChoosenArea setLocation={setCurrentLocation} />}
    </>
  );
}

