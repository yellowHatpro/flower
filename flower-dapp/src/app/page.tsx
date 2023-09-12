"use client";
import * as fcl from "@onflow/fcl";
import { Navbar } from "./components";
import { useEffect, useState } from "react"
import { Poppins } from 'next/font/google'
import Login from "./login"
import { script_view_all_posts } from "./scripts";
import Card from "./components/card";

const poppins = Poppins(
  {
    weight: ["100", "200", "300"],
    subsets: ['latin'],
    variable: '--font-poppins',
  })

fcl.config({
  "accessNode.api": "http://localhost:8888",
  "discovery.wallet": "http://localhost:8701/fcl/authn", // emulator endpoint
  "app.detail.title": "Flower",
  "0xFlower": "0xf8d6e0586b0a20c7"
})

export default function Home() {

  const [user, setUser] = useState({ addr: '' });

  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    fcl.currentUser.subscribe(setUser);

  }, []);

  useEffect(() => {
    handleGetAllPosts()
  }, [posts])

  const handleGetAllPosts = async (): Promise<void> => {
    await fetchAllPosts()
  }


  const logIn = async (): Promise<void> => {
    await fcl.authenticate();
  };
  const logOut = () => {
    fcl.unauthenticate();
  };

  //scripts

  async function fetchAllPosts() {
    const res = await fcl.query(
      {
        cadence: script_view_all_posts,
        args: (arg, t) => [
          arg("0xf8d6e0586b0a20c7", t.Address),
        ],
      }
    )
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
    <main className={poppins.className}>
      {
        (user.addr) ?

          <div className=" min-h-screen flex-col items-center bg-catppuccin_blue5">
            <Navbar
              logout={logOut}
              userAcc={user.addr} />
            <div className="flex flex-col items-center justify-between p-24">

              <div className="">
                {"post ids:"}
                {posts.map((post, idx) => (
                  <Card
                    key={idx}
                    title={post.title}
                    desc={post.description}
                    body={post.body}
                  />
                ))
                }
              </div>
            </div>
          </div>
          :
          <div>
            <Login login={logIn}></Login>
          </div>
      }
    </main>)
}
