import {create} from "zustand";
import {User} from "@/app/model/user";

const userStore = create<User>((set) => (
    {
        user: {}
    }
))
export default userStore
