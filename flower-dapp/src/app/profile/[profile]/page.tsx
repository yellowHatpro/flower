"use client"; 

import { useEffect, useState } from "react";
import * as fcl from "@onflow/fcl";

interface ProfileProps {
  params : {profile : string}
}

interface Post {
  id: number;
}
fcl.config({
  "accessNode.api" : "http://localhost:8888",
  "discovery.wallet" : "http://localhost:8701/fcl/authn", // emulator endpoint
  "app.detail.title" : "Flower",
  "0xFlower" : "0xf8d6e0586b0a20c7"
})

export default function Profile({ params : { profile } }: ProfileProps){

const [userPosts, setUserPosts] = useState<Array<Post>>([]);

async function getUserPosts() {
    try{
    const result = await fcl.query({
      cadence : `import Flower from 0xFlower

pub fun main(account: Address) : [&Flower.Post] {
 let collection = getAccount(account).getCapability(/public/collection)
  .borrow<&Flower.Collection{Flower.ICollection}>() 
   ?? panic ("Can't get the User's collection")

  let returnVals : [&Flower.Post] = []

  let ids = collection.getIDs()
  for id in ids{
    returnVals.append(collection.borrowEntirePost(id: id))
  }
  return returnVals 

}`   

,
       args: (arg, t) => [
        arg("0xf8d6e0586b0a20c7", t.Address),
      ],
    })
    console.log("ashu: " + result)
    setUserPosts(result)
    }
    catch(error){
      console.log(error)
    }
  }

  useEffect(() => {
    getUserPosts() 
  }, [])

  return(
    <div className = "">
      {profile}
      {userPosts.map((post,index) => (
        <div key={index} >
        <h1> {post.id} </h1>
        </div>
      ))}
    </div>
  )
}

