import Flower from "../contracts/flower/Flower.cdc"

transaction(title: String, description: String, body: String, date: String) {
  prepare(account: AuthAccount){
      Flower.createPost(title: title, description: description, body: body, authorAddress: account.address, date: date) 
  }

  execute {
    log("Post created successfully")
  }
}
