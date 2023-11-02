import {create} from "zustand";

const userStore = create((set) => ({
    userAddress: '',
    userName: 'Anonymous',
    userEmail: 'gladiator@gamezplayer.com',
    userBio: 'Gladiator @ GamezPlayer',
    userPosts: [],
    userBookmarks: [],
    userLikedPosts: []
}))

export default userStore
