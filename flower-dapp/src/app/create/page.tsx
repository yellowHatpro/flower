"use client"

import React, { useState } from "react";
import * as fcl from "@onflow/fcl";
import { transaction_create_post } from "../components/transactions";

export default function Create() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [body, setBody] = useState('');
  fcl.config({
    "accessNode.api": "http://localhost:8888",
    "discovery.wallet": "http://localhost:8701/fcl/authn", // emulator endpoint
    "app.detail.title": "Flower",
    "0xFlower": "0xf8d6e0586b0a20c7"
  })
  const createAndUpdatePosts = async (): Promise<void> => {
    try {
      const txId = await fcl.mutate({
        cadence: transaction_create_post,
        limit: 50,
        args: (arg, t) => [
          arg(title, t.String),
          arg(description, t.String),
          arg(body, t.String)
        ]
      })
      console.log(txId)
    } catch (error) {
      console.error('Error occurred:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await createAndUpdatePosts()
  };
  return (

    <div className="bg-catppuccin_blue5 text-gray-200 min-h-screen flex-col">
      <div className="px-10 py-10 justify-start items-start">
        <form onSubmit={handleSubmit}>
          <div className={"flex flex-col py-4"}>
            <label htmlFor="title" className={"py-4"}>Title:</label>
            <input
              className={"input input-bordered bg-catppuccin_blue0"}
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className={"flex flex-col py-4"}>
            <label htmlFor="description" className={"py-4"}>Description:</label>
            <textarea
              className={"textarea textarea-bordered bg-catppuccin_blue0"}
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className={"flex flex-col py-4"}>
            <label htmlFor="body" className={"py-4"}>Body:</label>
            <textarea
              className={"textarea textarea-bordered textarea-lg w-full bg-catppuccin_blue0"}
              id="body"
              value={body}
              onChange={(e) => setBody(e.target.value)}
            ></textarea>
          </div>
          <div className="join">
            <button className="btn join-item bg-catppuccin_blue1 text-gray-200 hover:bg-gray-200 hover:text-catppuccin_blue0" type="submit">Submit</button>
            <button className="btn join-item bg-catppuccin_blue1 text-gray-200 hover:bg-gray-200 hover:text-catppuccin_blue0">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  )
}
