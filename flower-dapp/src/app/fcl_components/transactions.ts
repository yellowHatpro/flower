const transaction_create_post = `
 import Flower from 0xFlower

transaction(title: String, description: String, body: String, date: String) {
  prepare(account: AuthAccount){
      Flower.createPost(title: title, description: description, body: body, authorAddress: account.address, date: date) 
  }

  execute {
    log("Post created successfully")
  }
}
`

export { transaction_create_post }
