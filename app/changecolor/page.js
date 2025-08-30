"use client";
import React from 'react'
import { useState, useEffect } from "react";

const page = () => {
 
   const [colorIndex, setColorIndex] = useState(0);
   const [currentColor, setCurrentColor] = useState("red");
 
   const colors = ["red", "green", "yellow"];
 
   // useEffect runs when colorIndex changes
   useEffect(() => {
     setCurrentColor(colors[colorIndex]);
   }, [colorIndex]);
 
   const handleClick = () => {
     setColorIndex((prev) => (prev + 1) % colors.length);
   };
 
   return (
     <div className="flex min-h-screen flex-col items-center justify-center py-2">
       <button
         onClick={handleClick}
         style={{
           backgroundColor: currentColor,
           color: "white",
           padding: "10px 20px",
           border: "none",
           borderRadius: "5px",
           cursor: "pointer",
         }}
       >
         Click me
       </button>
     </div>
   );
 
   
 }
 

export default page
