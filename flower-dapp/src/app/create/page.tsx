"use client"

import React, {useEffect, useState} from "react";
import * as fcl from "@onflow/fcl";
import { transaction_create_post } from "../fcl_components/transactions";
import {Navbar} from "@/app/components";
import {logOut} from "@/app/fcl_components/onflow_fcl";
import Link from "next/link";
import {useRouter} from "next/navigation";
import Modal from "@/app/components/modal";

export default function Create() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [body, setBody] = useState('');
  const [user, setUser] = useState({addr: ''});
  const [errorModal, setErrorModal] = useState(false);
  const router = useRouter();

  const routeToHome = () => {
    router.push("/");
  }

  const createAndUpdatePosts = async (): Promise<void> => {
    try {
      const txId = await fcl.mutate({
        cadence: transaction_create_post,
        limit: 50,
        args: (arg, t) => [
          arg(title, t.String),
          arg(description, t.String),
          arg(body, t.String),
            arg(Date.now().toString(), t.String)
        ]
      })
      console.log(txId)
    } catch (error) {
      console.error('Error occurred:', error);
    }
  };

  const closeErrorModal = () => {
    setErrorModal(false);
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (title.trim()=="" || description.trim()=="" || body.trim()==""){
      setErrorModal(true);
    } else {
      await createAndUpdatePosts();
      routeToHome()
    }

  };

  const handleReset = ()  =>{
    setTitle("")
    setDescription("")
    setBody("")
  }

  useEffect(() => {
    fcl.currentUser.subscribe(setUser);
  }, []);


  return (
<>
  <Navbar leftItem={
    <Link href={"/"}>
        <div className={"btn btn-square bg-gray-200"}>
          ᐊ
        </div>
    </Link>
  }/>

  {
    errorModal &&
      <Modal isOpen={errorModal} onClose={closeErrorModal}>
        {"Please fill complete details"}
      </Modal>
  }

  <div className="bg-catppuccin_blue5 text-gray-200 min-h-screen flex-col">
    <div className="px-10 py-10 justify-start items-start">
      <form onSubmit={handleSubmit} onReset={handleReset}>
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
          <button className="btn join-item bg-catppuccin_blue1 text-gray-200 hover:bg-gray-200 hover:text-catppuccin_blue0" type="reset">Discard</button>
        </div>
      </form>
    </div>
  </div>
</>
  )
}
