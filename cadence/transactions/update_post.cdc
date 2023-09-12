import Flower from "../contracts/flower/Flower.cdc"

transaction(title: String, description: String, body: String, id: UInt64) {
  prepare(account: AuthAccount){
    Flower.updatePost(id: id, title: title, description: description, body: body, userAddress: account.address)
  }

  execute {
    log("Post updated")
  }
}
