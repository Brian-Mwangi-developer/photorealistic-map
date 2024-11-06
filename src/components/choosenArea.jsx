"use client";
import React, { useEffect,useRef } from 'react'
import { Input } from './ui/input'
import { Slider } from "@/components/ui/slider";

const ChoosenArea = ({setLocation}) => {
  const inputRef= useRef();
  useEffect(()=>{
    if(window.google){
      const autocomplete = new window.google.maps.places.Autocomplete(
        inputRef.current,
        {
          type: ["(cities)"],
        }
      );
      autocomplete.addListener("place_changed",()=>{
        const place = autocomplete.getPlace();
        if(place.geometry){
          const location ={
            lat:place.geometry.location.lat(),
            lng:place.geometry.location.lng()
          }
          console.log("Location",location.lat,location.lng);
          setLocation(location)
        }
      })
    }
  },[setLocation])
  return (
    <div className="absolute top-2 bg-white rounded-lg w-25% right-3">
      <div className="pt-5 m-4">
        <h3 className="text-black">Choose an Area to Start Exploring🚀</h3>
        <div className="mt-3">
          <Input
            ref={inputRef}
            className="w-full mb-6 outline-none placeholder:italic placeholder:text-gray-400 text-black text-md"
            placeholder="New york city"
          />
          <div>
            <p className="text-gray-400 mb-6">
              {" "}
              Slide for Distance you Want Covered
              {" "}
            </p>
            <Slider defaultValue={[15]} max={100} step={1} className="mt-4" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChoosenArea