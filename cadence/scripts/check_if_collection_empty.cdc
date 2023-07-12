import Flower from "../contracts/flower/Flower.cdc"

pub fun main(account: Address) : Bool {
  if  getAccount(account).getCapability(/public/collection).borrow<&Flower.Collection{Flower.ICollection}>() == nil{
    return  false
  }

  return true
} 

