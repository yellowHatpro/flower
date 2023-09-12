const transaction_create_post = `
 import Flower from 0xFlower

  transaction(title: String, description: String, body: String) {
  prepare(account: AuthAccount){
    Flower.createPost(title: title, description: description, body: body, userAddress: account.address) 
  }

  execute {
    log("Post created")
  }
}`

export { transaction_create_post }
