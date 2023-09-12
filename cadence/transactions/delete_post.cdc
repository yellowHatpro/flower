import Flower from "../contracts/flower/Flower.cdc"

transaction(id: UInt64) {
  prepare(account: AuthAccount){
    Flower.deletePost(id: id, userAddress: account.address)
  }

  execute {
    log("Post Deleted")
  }
}
