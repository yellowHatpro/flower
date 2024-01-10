export interface Post {
    id: number
    title: string
    author: string
    description: string
    body: string
    date: string
    status: PostStatus,
    approveRequests: String[],
    approvers: String[]
}

enum PostStatus {
    NOT_APPROVED,
    APPROVED
}
