import {Post} from "@/app/model/post";

export interface User {
    addr?: addr
    role?: Role
    name?: string
    email?: string
    userBio?: string
    userPosts?: number[]
    bookmarks?: number[]
}

enum Role {
    NEW_USER,
    EDITOR,
    APPROVER,
    READER
}
type addr = {
    addr: String
}
