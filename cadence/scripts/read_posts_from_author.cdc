import Flower from "../contracts/flower/Flower.cdc"

pub fun main(account: Address) : [&Flower.Post] {
 let collection = getAccount(account).getCapability(/public/collection)
  .borrow<&Flower.Collection{Flower.ICollection}>() ??
  panic ("Can't get the User's collection")

  let returnVals : [&Flower.Post] = []

  let ids = collection.getIDs()
  for id in ids{
    returnVals.append(collection.borrowEntirePost(id : id))
  }
  return returnVals
}
