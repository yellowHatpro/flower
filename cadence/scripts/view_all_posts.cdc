import Flower from "../contracts/flower/Flower.cdc"

pub fun main(account: Address) : [Flower.Post] {
  return Flower.posts.values
}
