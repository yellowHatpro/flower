import Flower from "../contracts/flower/Flower.cdc"

pub fun main(account: Address) : {UInt64: Flower.Post} {
  return Flower.posts
}
