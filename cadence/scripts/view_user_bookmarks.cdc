import Flower from "../contracts/flower/Flower.cdc"

pub fun main(account: Address) : [Flower.Post] {
    var bookmarks : [Flower.Post] = []
    var user : Flower.User?=  Flower.users[account]
    var postIds = user!.bookmarks
    for postId in postIds {
        log(postId)
        bookmarks.append(Flower.posts[postId]!)
    }
    return bookmarks
} 
