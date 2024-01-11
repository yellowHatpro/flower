import * as React from 'react';
import {CreatePost, Navbar} from "@/app/components";
import Image from "next/image";
import {flower} from "@/assets";
import Posts from "@/app/components/posts";
import {useEffect, useState} from "react";
import * as fcl from "@onflow/fcl";
import {script_get_user_details, script_view_all_posts} from "@/app/fcl_components/scripts";
import {CompleteYourProfileBanner} from "@/app/components/complete_your_profile_banner";
import {LeftMain} from "@/app/left-main";
import {Post} from "@/app/model/post";
import {useRouter} from "next/navigation";
import userStore from "@/app/store/store";
import {UserForm} from "@/app/user-form";



export function Main(props: {
    userAddr: string
}) {

    const [posts, setPosts] = useState<Post[]>([]);
    const [shouldShowCompleteProfileBanner, setShouldShowCompleteProfileBanner] = useState(true)
    const userName = userStore((state) => state.name)


    useEffect(() => {
        handleGetAllPosts().then().finally()
    }, [])

    useEffect(() => {
        handleGetUserDetails().then().finally()
    }, []);

    const router = useRouter()

    const addr = props.userAddr

    const handleGetUserDetails = async (): Promise<void> => await fetchUser()
    const handleGetAllPosts = async (): Promise<void> => await fetchAllPosts()

    async function fetchAllPosts() {
        const res = await fcl.query(
            {
                cadence: script_view_all_posts,
                args: (arg, t) => [
                    arg(addr, t.Address),
                ],
            }
        )
        console.log("posts: ", res)
        if (!res) {
            console.log("Error")
        } else {
            const getPosts = () => {
                setPosts(res)
            }
            getPosts()
        }
    }

    async function fetchUser() {
        const res = await fcl.query(
            {
                cadence: script_get_user_details,
                args: (arg, t) => [
                    arg(addr, t.Address),
                ],
            }
        )
        console.log("user: ", res)
        if (!res) {
            console.log("User fetch error")
        } else {
            const getUser = () => {
                userStore.setState(res)
            }
            getUser()
        }
    }

    if (userName && userName?.length <= 1) {
        return (
            <UserForm/>
        )
    }

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
    );
}
