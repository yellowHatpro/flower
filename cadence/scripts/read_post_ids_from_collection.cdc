import Flower from "../contracts/flower/Flower.cdc"

pub fun main(account: Address) : [UInt64] {
  let publicRef = getAccount(account).getCapability(/public/collection).borrow<&Flower.Collection{Flower.ICollection}>() ?? panic("This account does not have a collection")

  return publicRef.getIDs()
} 
