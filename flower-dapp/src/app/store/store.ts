import {create} from "zustand";
import {User} from "@/app/model/user";

const userStore = create<User>((set) => ({
    address: {addr: ""} ,
    name: '',
    email: '',
    userBio: '',
    userPosts: [],
    bookmarks: [],
}))

//TODO: Create an error Store

export default userStore
