"use client";
import * as fcl from "@onflow/fcl";
import Navbar from "./navbar";
import { useEffect, useState } from "react"
import Login from "./login"

fcl.config({
  "accessNode.api" : "http://localhost:8888",
  "discovery.wallet" : "http://localhost:8701/fcl/authn", // emulator endpoint
  "app.detail.title" : "Flower",
  "0xFlower" : "0xf8d6e0586b0a20c7"
})

export default function Home() {


  const [user,setUser] = useState({addr: ''});

  const [posts, setPosts] = useState("");

  useEffect(()=> {
    fcl.currentUser.subscribe(setUser);

  }, []);

  const logIn = async(): Promise<void> => {
    await fcl.authenticate();
    await createCollection();
  };
  const logOut = () => {
    fcl.unauthenticate();
  };


  //scripts
  const createAndUpdatePosts = async (): Promise<void> => {
  try {
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
      }`
    })
    console.log(txId)

    const scriptRes = await fcl.query({
      cadence: `
      import Flower from 0xFlower

      pub fun main(account: Address) : [UInt64] {
        let publicRef = getAccount(account).getCapability(/public/collection).borrow<&Flower.Collection{Flower.ICollection}>() ?? panic("This account does not have a collection")
      return publicRef.getIDs()
    }`,
      args: (arg, t) => [
        arg("0xf8d6e0586b0a20c7", t.Address),
      ],
    })
    console.log(scriptRes)
    setPosts(scriptRes)
     } catch (error) {
    console.error('Error occurred:', error);
  }
};


  //transactions
  async function  createCollection (){
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
    }`,
    })
    console.log(txId)
  }

  if (user.addr){
      return (
  <div className=" min-h-screen flex-col items-center bg-catppuccin_blue5">
    <Navbar 
          logout={logOut} 
          userAcc = {user.addr} 
          createAndUpdatePosts = {createAndUpdatePosts} />
    <div className="flex flex-col items-center justify-between p-24">
          
          <div className="">
            
            {"post ids:" + posts}
          </div>
      </div>
    </div>
  )

  } else {
    return (
    <div>
        <Login login={logIn}></Login>     
      </div>
    )
  }
}
