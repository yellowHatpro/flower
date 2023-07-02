"use client";

import Navbar from "./navbar";
import { useState } from "react"
export default function Home() {

  const [newGreeting, setnewGreeting]= useState("");
  
  return (
  <main className=" min-h-screen  flex-col items-center">
    <Navbar/>
    <div className="flex flex-col items-center justify-between p-24"> 
        Some good stuff coming soon      
      </div>
    </main>
  )
}
