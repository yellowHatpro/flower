import Flower from "../contracts/flower/Flower.cdc"

pub fun main(account: Address) : [Flower.Post] {
  var posts : [Flower.Post] = []
  var user : Flower.User?=  Flower.users[account]
  if user == nil {
      Flower.createUser(userAddress: account, name: "Anonymous")
      log("user was nil")
      return posts
  }
  var postIds = user!.userPosts
  for postId in postIds {
    log(postId)
    posts.append(Flower.posts[postId]!)
  }
  return posts
} 
