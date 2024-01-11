'use client'
import {CreatePost, Navbar} from "@/app/components";
import Image from "next/image";
import {flower} from "@/assets";
import {LeftMain} from "@/app/left-main";
import Posts from "@/app/components/posts";
import userStore from "@/app/store/store";
import {CompleteYourProfileBanner} from "@/app/components/complete_your_profile_banner";
import * as React from "react";
import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import {Post} from "@/app/model/post";
import * as fcl from "@onflow/fcl";
import "@/config/fclConfig";
import {script_get_user_details, script_view_all_posts} from "@/app/fcl_components/scripts";
import {currentUser} from "@onflow/fcl";

export default function UserFeed() {

    const addr = userStore((state) => state.address?.addr)
    const username = userStore((state) => state.name)

    const [posts, setPosts] = useState<Post[]>([]);
    const [shouldShowCompleteProfileBanner, setShouldShowCompleteProfileBanner] = useState(true)
    const [userAddress, setUserAddress] = useState({
        addr: ''
    })

    const router = useRouter()

    //USE EFFECTS
    //1. FOR PASSING SET USER ADDRESS CALLBACK FUNCTION
    useEffect(() => {
        currentUser.subscribe(setUserAddress)
    }, []);

    //2. STORING THE STATE
    useEffect(() => {
        userStore.subscribe(console.log)
        userStore.setState({address: userAddress})
    }, [userAddress])


    //3. FETCH USER DETAILS
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
            if (!res) {
                console.log("User fetch error")
            } else {
                const getUser = () => {
                    userStore.setState(res)
                }
                getUser()
            }
        }

        const handleGetUserDetails = async (): Promise<void> => await fetchUser()
        if (userAddress.addr && userAddress.addr.startsWith('0x', 0))
            handleGetUserDetails().finally()
    }, [userAddress.addr, username]);

    //4. FETCH ALL POSTS
    useEffect(() => {
        async function fetchAllPosts() {
            const res = await fcl.query(
                {
                    cadence: script_view_all_posts,
                    args: (arg, t) => [arg(addr, t.Address),],
                }
            )
            if (res) setPosts(res)
        }

        const handleGetAllPosts = async (): Promise<void> => await fetchAllPosts()
        if (addr) handleGetAllPosts().then().finally()
    }, [addr])

    return (
        <div className={"min-h-screen flex-col items-center bg-catppuccin_blue5"}>
            <Navbar
                leftItem={
                    <Image src={flower} alt={"Flower"} className="h-[40px] w-[40px]"/>
                }/>
            <div className={"flex flex-row p-2"}>
                <LeftMain/>
                <div className={"grow"}>
                    <CreatePost/>
                    <Posts posts={posts}/>
                </div>
            </div>
            {(shouldShowCompleteProfileBanner && userStore.getState().name !== 'Anonymous') &&
                <CompleteYourProfileBanner acceptFn={() => router.push(`/profile/${addr}`)}
                                           denyFn={() => setShouldShowCompleteProfileBanner(false)}/>}
        </div>
    )
}
