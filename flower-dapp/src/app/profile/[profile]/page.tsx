"use client";

import * as fcl from "@onflow/fcl";
import {Navbar} from "@/app/components";
import Link from "next/link";
import React, {useEffect, useState} from "react";
import {
    script_get_user_details,
    script_view_user_bookmarks,
    script_view_user_posts
} from "@/app/fcl_components/scripts";
import Posts from "@/app/components/posts";
import userStore from "@/app/store/store";
import "@/config/fclConfig";
import {Post} from "@/app/model/post";
import {currentUser} from "@onflow/fcl";

interface ProfileProps {
  params : {profile : string}
}
export default function Profile({ params : { profile } }: ProfileProps) {
    const userName = userStore((state) => state.name)
    const userEmail = userStore((state) => state.email)
    const userBio = userStore((state) => state.userBio)
    const [userBookmarks, setUserBookmarks] = useState<Post[]>([])
    const [userPosts, setUserPosts] = useState<Post[]>([])
    const [tab, setTab] = useState(0)
    const [userAddress, setUserAddress] = useState({
        addr: ''
    })
    const userNameStore = userStore((state) => state.name)

    useEffect(() => {
        currentUser.subscribe(setUserAddress)
    }, []);

    useEffect(() => {
        async function fetchUser() {
            const res = await fcl.query(
                {
                    cadence: script_get_user_details,
                    args: (arg, t) => [
                        arg(userAddress.addr, t.Address),
                    ],
                }
            )
            console.log("user: ", res)
            if (!res) {
                console.log("User fetch error")
            } else {
                const getUser = () => {
                    console.log("what?")
                    userStore.setState(res)
                }
                getUser()
            }
        }

        const handleGetUserDetails = async (): Promise<void> => await fetchUser()
        if (userAddress.addr && userAddress.addr.startsWith('0x',0)) handleGetUserDetails().finally()
    }, [userAddress.addr, userNameStore]);

    useEffect(() => {
        userStore.subscribe(console.log)
        userStore.setState({address: userAddress})
    }, [userAddress])



    useEffect(() => {
        const handleGetAllUserPosts = async (): Promise<void> => {
            await fetchAllUserPosts()
        }
        if(userName!='') handleGetAllUserPosts().then().finally();
    }, [])

    useEffect(() => {
        const handleGetAllUserBookmarks = async () => {
            await fetchAllUserBookmarks()
        }
        if (userName!='') handleGetAllUserBookmarks().then().finally()
    }, []);

    async function fetchAllUserPosts() {
        const res = await fcl.query(
            {
                cadence: script_view_user_posts,
                args: (arg, t) => [
                    arg(userAddress.addr, t.Address),
                ],
            }
        )
        if (!res) {
            console.log("Error")
        } else {
            const getPosts = () => {
                setUserPosts(res)
            }
            getPosts()
        }
    }

    async function fetchAllUserBookmarks() {
        const res = await fcl.query(
            {
                cadence: script_view_user_bookmarks,
                args: (arg, t) => [
                    arg(userAddress.addr, t.Address),
                ],
            }
        )
        if (!res) {
            console.log("Error")
        } else {
            const getPosts = () => {
                setUserBookmarks(res)
            }
            getPosts()
        }
    }

    return (
        <div className={"min-h-screen flex-col items-center bg-catppuccin_blue5"}>
            <Navbar leftItem={<Link href={"/"}>
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
                    <div className={"flex flex-col items-center justify-center"}>
                        {userName && <ItemGroup item={"Name"} name={userName}/>}
                        {userBio && <ItemGroup item={"Bio"} name={userBio}/>}
                        {userEmail && <ItemGroup item={"Email"} name={userEmail}/>}
                    </div>

                </div>
                <div className="divider p-4"/>
                <div>
                    <div className="tabs">
                        <a onClick={() => setTab(0)} className={`tab tab-lifted ${tab === 0 && "tab-active"}`}>Your
                            posts</a>
                        <a onClick={() => setTab(1)}
                           className={`tab tab-lifted ${tab === 1 && "tab-active"}`}>Bookmarks</a>
                        <a onClick={() => setTab(2)} className={`tab tab-lifted ${tab === 2 && "tab-active"}`}>Liked
                            posts</a>
                    </div>
                    <div className={"p-4"}>
                        {tab === 0 && <>
                            <div className="bg-catppuccin_blue5 text-gray-200 min-h-screen flex-col">
                                <Posts posts={userPosts}/>
                            </div>
                        </>}
                        {tab === 1 && <>
                            <div className="bg-catppuccin_blue5 text-gray-200 min-h-screen flex-col">
                                <Posts posts={userBookmarks}/>
                            </div>
                        </>}
                    </div>
                </div>
            </div>
        </div>
    )
}

const ItemGroup = (props: {item: string, name: string}) => {
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
        </div>
    )
}

