"use client"

import { useState } from "react";
import * as fcl from "@onflow/fcl";

export default function Create(){
    const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [body, setBody] = useState('');
  fcl.config({
  "accessNode.api" : "http://localhost:8888",
  "discovery.wallet" : "http://localhost:8701/fcl/authn", // emulator endpoint
  "app.detail.title" : "Flower",
  "0xFlower" : "0xf8d6e0586b0a20c7"
}) 
    const createAndUpdatePosts = async (): Promise<void> => {
  try {
    const txId = await fcl.mutate({
      cadence: `
      import Flower from 0xFlower

      transaction(title: String, description: String, body: String) {
        prepare(account: AuthAccount){
        let aReferenceToCollection = account.borrow<&Flower.Collection>(from: /storage/collection) ?? panic("Nothing here")
        aReferenceToCollection.deposit(post: <-Flower.createPost(title: title, description: description, body: body))
        }

      execute {
        log("Post added into Collection")
        }
      }`,
        args: (arg, t) => [
          arg(title, t.String),
          arg(description, t.String),
          arg(body, t.String)
        ]
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
     } catch (error) {
    console.error('Error occurred:', error);
  }
};

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await createAndUpdatePosts()
   // onSubmit(title, description, body);
  };  
  return (

  <div className = "bg-catppuccin_blue5 min-w-full">
  <div>
    <div className="navbar bg-catppuccin_blue1">
  <div className="flex-1">
    <a className="btn btn-ghost normal-case text-xl">Flower</a>
  </div>
  <div className="flex-none">
    <button className="btn btn-square btn-ghost">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-5 h-5 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path></svg>
    </button>
  </div>
</div>
  <div className={"px-10 py-4"}>
       <text className={"text-xl"}> Create Post </text>
    </div> 
  </div>


  <div className = "px-10 py-10 flex flex-row justify-start items-start">
   <form onSubmit={handleSubmit}>
      <div className={"flex flex-col py-4"}>
        <label htmlFor="title" className={"py-4"}>Title:</label>
        <input
          className={"input input-bordered input-primary w-full max-w-xs"}
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className={"flex flex-col py-4"}>
        <label htmlFor="description" className={"py-4"}>Description:</label>
        <input
          className={"input input-bordered input-primary w-full max-w-xs"}
          type="text"
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className={"flex flex-col py-4"}>
        <label htmlFor="body" className={"py-4"}>Body:</label>
        <textarea
          className={"textarea textarea-bordered textarea-lg w-full max-w-xs"}
          id="body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        ></textarea>
      </div>
      <div className="join">
  <button className="btn join-item" type="submit">Submit</button>
  <button className="btn join-item">Cancel</button>
</div>
    </form>
    </div>
    </div>
  )
}
