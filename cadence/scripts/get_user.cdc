import Flower from "../contracts/flower/Flower.cdc"

pub fun main(account: Address) : Flower.User? {
  return Flower.getUserDetails(userAddress: account)
}
