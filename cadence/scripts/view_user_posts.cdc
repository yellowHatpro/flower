import Flower from "../contracts/flower/Flower.cdc"

pub fun main(account: Address) : [UInt64] {
  return Flower.userAddressToPosts[account]?.keys! 
} 
