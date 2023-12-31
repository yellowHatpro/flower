import {create} from "zustand";
import {User} from "@/app/model/user";

const userStore = create<User>((set) => ({
    addr: {userAddress: ""} ,
    name: 'Anonymous',
    email: 'gladiator@gamezplayer.com',
    userBio: 'Gladiator @ GamezPlayer',
    userPosts: [],
    bookmarks: [],
    likedPosts: []
}))

export default userStore
