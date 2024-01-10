import * as React from 'react';
import userStore from "@/app/store/store";

export function LeftMain() {
    const userName = userStore((state) => state.name)
    const userBio = userStore((state) => state.userBio)
    const bookmarks = userStore((state) => state.bookmarks)
    const userPosts = userStore((state) => state.userPosts)
    return (

        <div className={"p-8 bg-catppuccin_blue3 hidden md:flex min-h-screen rounded-xl flex-col items-center"}>
            <div className={"avatar placeholder"}>
                <div className="bg-neutral-focus text-neutral-content rounded-full w-32">
                   <span className="text-4xl">0x</span>
                </div>
            </div>
            <h1>
                {userName}
            </h1>
            <h1>
                {userBio}
            </h1>
            <h1>
                {`Bookmarks: ${bookmarks === undefined ? 0 : bookmarks.length}`}
            </h1>
            <div>
                {`Your posts: ${userPosts === undefined ? 0 : userPosts.length}`}
            </div>
        </div>
    );
}
