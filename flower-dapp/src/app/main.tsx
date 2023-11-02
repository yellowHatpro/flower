import * as React from 'react';
import {CreatePost, Navbar} from "@/app/components";
import Image from "next/image";
import {flower} from "@/assets";
import {logOut} from "@/app/fcl_components/onflow_fcl";
import Posts from "@/app/components/posts";
import {useEffect, useState} from "react";
import * as fcl from "@onflow/fcl";
import {script_view_all_posts} from "@/app/fcl_components/scripts";
import {CompleteYourProfileBanner} from "@/app/components/complete_your_profile_banner";
import userStore from "@/app/store/store";
import {useRouter} from "next/navigation";

export function Main(props: {user: any}) {

    const [posts, setPosts] = useState<any[]>([]);
    const userName = userStore((state)=>state.userName)
    const userAddress = userStore((state)=>state.userAddress)
    const [shouldShowCompleteProfileBanner, setShouldShowCompleteProfileBanner] = useState(true)
    const handleGetAllPosts = async (): Promise<void> => await fetchAllPosts()
    const router = useRouter()

    const routeToProfilePage = () => {
        router.push(`/profile/${userAddress}`);
    }
    async function fetchAllPosts() {
        const res = await fcl.query(
            {
                cadence: script_view_all_posts,
                args: (arg, t) => [
                    arg(props.user.addr, t.Address),
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

    useEffect(() => {
        handleGetAllPosts().then().finally();
    }, [])


    return (
        <div className={"min-h-screen flex-col items-center bg-catppuccin_blue5"}>
            <Navbar
                leftItem={
                    <Image src={flower} alt={"Flower"} className="h-[40px] w-[40px]"/>
                }
                logout={logOut}/>
            <CreatePost/>
            <Posts posts={posts}/>
            {(shouldShowCompleteProfileBanner && userName!=='Anonymous') && <CompleteYourProfileBanner acceptFn={routeToProfilePage} denyFn={() => setShouldShowCompleteProfileBanner(false)}/>}
        </div>
    );
}
