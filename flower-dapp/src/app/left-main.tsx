import * as React from 'react';
import userStore from "@/app/store/store";

export function LeftMain() {
    const userName = userStore((state) => state.name)
    const userBio = userStore((state) => state.userBio)
    const bookmarks = userStore((state) => state.bookmarks)
    const likedPosts = userStore((state) => state.likedPosts)
    const userPosts = userStore((state) => state.userPosts)
    return (

        <div className={"bg-catppuccin-1"}>
            <div className={"avatar placeholder"}>
                <div className="bg-neutral-focus text-neutral-content rounded-full w-32">
                    <span className="text-4xl">0x</span>
                </div>
            </div>
            <div>
                {userName}
            </div>
            <div>
                {userBio}
            </div>
            <div>
                {`Bookmarks: ${bookmarks === undefined ? 0 : bookmarks.length}`}
            </div>
            <div>
                {`Liked posts: ${likedPosts === undefined ? 0 : likedPosts.length}`}
            </div>
            <div>
                {`Your posts: ${userPosts === undefined ? 0 : userPosts.length}`}
            </div>
        </div>
    );
}
