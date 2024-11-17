import React, { useEffect, useState } from "react";
import axios from 'axios';
const YourEvents = () => {

  const [yourevent,setYourevent] = useState([])

  useEffect (() =>{
    const fetchAllEvents = async()=>{
      try{
        const res = await axios.get("http:localhost:3000/")
      }catch(err){

      }
    }
  },[])
   
  return (
    <section className="flex flex-col">
    <div className="py-20 px-10">
        Books
        </div>
        </section>
  );
};

export default YourEvents;
