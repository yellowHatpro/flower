"use client";

import * as fcl from "@onflow/fcl";
import { Navbar } from "./components";
import { useEffect, useState } from "react"
import Login from "./login"
import { script_view_all_posts } from "./scripts";
import Main from "./main";


fcl.config({
  "accessNode.api": "http://localhost:8888",
  "discovery.wallet": "http://localhost:8701/fcl/authn", // emulator endpoint
  "app.detail.title": "Flower",
  "0xFlower": "0xf8d6e0586b0a20c7"
})

export default function Home() {

  const [user, setUser] = useState({addr: ''});

  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    fcl.currentUser.subscribe(setUser);
  }, []);

  useEffect(() => {
    handleGetAllPosts();
  }, [])

  const handleGetAllPosts = async (): Promise<void> => {
    await fetchAllPosts()
  }


  const logIn = async (): Promise<void> => {
    await fcl.authenticate();
  };
  const logOut = () => {
    fcl.unauthenticate();
  };

  async function fetchAllPosts() {
    const res = await fcl.query(
        {
          cadence: script_view_all_posts,
          args: (arg, t) => [
            arg("0xf8d6e0586b0a20c7", t.Address),
          ],
        }
    )
    console.log(res)
    if (!res) {
      console.log("Error")
    } else {
      const getPosts = () => {
        setPosts(res)
      }
      getPosts()
    }
  }


  return (
      <main>
        {
          (user.addr) ?

              <div className=" min-h-screen flex-col items-center bg-catppuccin_blue5">
                <Navbar
                    logout={logOut}
                    userAcc={user.addr}/>
                <Main posts={posts}/>
              </div>
              :
              <Login login={logIn}></Login>
        }
      </main>)
}
