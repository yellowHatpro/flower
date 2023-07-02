import Flower from "../contracts/flower/Flower.cdc"

transaction {
  prepare(account: AuthAccount){
    let aReferenceToCollection = account.borrow<&Flower.Collection>(from: /storage/Collection) ?? panic("Nothing here")
    aReferenceToCollection.deposit(post: <-Flower.createPost())
  }

  execute {
    log("Post added into Collection")
  }
}
