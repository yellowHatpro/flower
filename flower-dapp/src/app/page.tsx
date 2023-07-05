"use client";
import * as fcl from "@onflow/fcl";
import Navbar from "./navbar";
import { useEffect, useState } from "react"


fcl.config({
  "accessNode.api" : "http://localhost:8888",
  "discovery.wallet" : "http://localhost:8701/fcl/authn", // emulator endpoint
  "app.detail.title" : "Flower",
  "0xFlower" : "0xf8d6e0586b0a20c7"
})

export default function Home() {


  const [user,setUser] = useState({addr: ''});

  const [response, setResponse] = useState("");

  useEffect(()=> {
    fcl.currentUser.subscribe(setUser);
  }, []);

  const logIn = () => {
    fcl.authenticate();
  };
  const logOut = () => {
    fcl.unauthenticate();
  };
  //scripts
  const getName = async () => {
    const scriptRes = await fcl.query({
      cadence: `
      import Flower from 0xFlower

      pub fun main(account: Address) : [UInt64] {
      let publicRef = getAccount(account).getCapability(/public/collection).borrow<&Flower.Collection{Flower.ICollection}>() ?? panic("This account does not have a collection")

      return publicRef.getIDs()
}
`,
      args: (arg, t) => [
        arg("0xf8d6e0586b0a20c7", t.Address),
      ],
    })
    console.log(scriptRes)
    setResponse(scriptRes)
  } 

  //transactions
  const createCollection = async () => {
    const txId = await fcl.mutate({
      cadence : `import Flower from 0xFlower

      transaction {
        prepare(account: AuthAccount){
        account.save(<-Flower.createCollection(), to: /storage/collection)
    account.link<&Flower.Collection{Flower.ICollection}>(/public/collection, target: /storage/collection)
        }
        execute{
        log("Collection created")
      }
    }
`,
    })
    console.log(txId)
  }


  const createPost = async () => {
    const txId = await fcl.mutate({
      cadence: `
      import Flower from 0xFlower

transaction {
  prepare(account: AuthAccount){
    let aReferenceToCollection = account.borrow<&Flower.Collection>(from: /storage/collection) ?? panic("Nothing here")
    aReferenceToCollection.deposit(post: <-Flower.createPost())
  }

  execute {
    log("Post added into Collection")
  }
}

`
    })
    console.log(txId)
  }

  return (
  <div className=" min-h-screen  flex-col items-center">
    <Navbar/>
    <div className="flex flex-col items-center justify-between p-24"> 
        Some good stuff coming soon
        {user.addr ? user.addr : ""}
        {"ashu:" + response}
        <button onClick={createCollection}> transaction </button>
        <button onClick={createPost}> post</button>
        <button onClick={getName}> Click </button>
        <button onClick={logIn}> Log In </button>  
        <button onClick={logOut}> Log Out </button>  
      </div>
    </div>
  )
}
