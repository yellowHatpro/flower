import Flower from "../contracts/flower/Flower.cdc"

pub fun main(postId: UInt64) : Flower.Post {
  return Flower.posts[postId]!
}
