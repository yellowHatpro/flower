"use client";

import * as fcl from "@onflow/fcl";
import {Navbar} from "@/app/components";
import Link from "next/link";
import React, {useEffect, useState} from "react";
import {script_view_user_posts} from "@/app/fcl_components/scripts";
import Posts from "@/app/components/posts";
import userStore from "@/app/store/store";
import "@/config/fclConfig";

interface ProfileProps {
  params : {profile : string}
}
export default function Profile({ params : { profile } }: ProfileProps){
    const userAddress = userStore((state)=>state.userAddress)
    const userName = userStore((state)=>state.userName)
    const userEmail = userStore((state)=>state.userEmail)
    const userBio = userStore((state)=>state.userBio)
    const [userBookmarks, setUserBookmarks] = useState<any[]>([])
    const [userLikes, setUserLikes] = useState<any[]>([])
    const [userPosts, setUserPosts] = useState<any[]>([])
    const [tab, setTab] = useState(0)


    useEffect(() => {
        handleGetAllPosts().then().finally();
    }, [])

    const handleGetAllPosts = async (): Promise<void> => {
        await fetchAllUserPosts()
    }


    async function fetchAllUserPosts() {
        const res = await fcl.query(
            {
                cadence: script_view_user_posts,
                 args: (arg, t) => [
                     arg(userAddress, t.Address),
                 ],
            }
        )
        console.log(res)
        console.log(userAddress)
        if(!res){
            console.log("Error")
        } else {
            const getPosts = () => {
                setUserPosts(res)
            }
            getPosts()
        }
    }


    return(
    <div className={"min-h-screen flex-col items-center bg-catppuccin_blue5"}>
      <Navbar leftItem={<Link href={"/"} >
          <div className={"btn btn-square bg-gray-200"}>
              ᐊ
          </div>
      </Link>}/>
      <div className={""}>
          <div className={"flex flex-row items-center justify-around"}>
            <div className={"avatar placeholder"}>
                <div className="bg-neutral-focus text-neutral-content rounded-full w-44">
                    <span className="text-7xl">0x</span>
                </div>
            </div>
              <div className={"flex flex-col min-w-[70%]"}>
                 <ItemGroup item={"Name"} name={userName} todo={()=>null}/>
                 <ItemGroup item={"Bio"} name={userBio} todo={()=>null}/>
                 <ItemGroup item={"Email"} name={userEmail} todo={()=>null}/>
              </div>

          </div>
          <div className="divider p-10"/>
          <div>
              <div className="tabs">
                  <a onClick={()=>setTab(0)} className={`tab tab-lifted ${tab===0 && "tab-active"}`}>Your posts</a>
                  <a onClick={()=>setTab(1)} className={`tab tab-lifted ${tab===1 && "tab-active"}`}>Bookmarks</a>
                  <a onClick={()=>setTab(2)} className={`tab tab-lifted ${tab === 2 && "tab-active"}`}>Liked posts</a>
              </div>
              { tab===0 && <>
                  <div className = "bg-catppuccin_blue5 text-gray-200 min-h-screen flex-col">
                      <Posts posts={userPosts}/>
                  </div>
              </>}
              { tab===1 && <>
                  <div className = "bg-catppuccin_blue5 text-gray-200 min-h-screen flex-col">
                      <Posts posts={userBookmarks}/>
                  </div>
              </>}
              { tab===2 && <>
                  <div className = "bg-catppuccin_blue5 text-gray-200 min-h-screen flex-col">
                      <Posts posts={userLikes}/>
                  </div>
              </>}
          </div>
      </div>
    </div>
  )
}

const ItemGroup = (props: {item: string, name: string, todo: () => void}) => {
    return (
        <div className={"flex flex-row items-center"}>
          <div className={"flex flex-row items-center p-4"}>
              <div className={"p-2"}>
                  {props.item}
              </div>
              <div>
                  <input type="text" placeholder={`${props.name}`} className="input w-full"/>
              </div>
          </div>
            <button className={"btn btn-outline"} onClick={props.todo}>
                ✔️
            </button>
        </div>
    )
}

