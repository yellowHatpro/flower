export interface Post {
    id: number
    title: string
    author: string
    description: string
    body: string
    date: string
    status: PostStatus,
    approveRequests: string[],
    approvers: string[]
}

enum PostStatus {
    NOT_APPROVED,
    APPROVED
}
