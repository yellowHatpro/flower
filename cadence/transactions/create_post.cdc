import Flower from "../contracts/flower/Flower.cdc"

transaction(title: String, description: String, body: String) {
  prepare(account: AuthAccount){
    Flower.createPost(title: title, description: description, body: body, userAddress: account.address) 
  }

  execute {
    log("Post created")
  }
}
