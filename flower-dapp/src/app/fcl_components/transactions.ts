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

const transaction_create_user = `
import Flower from 0xFlower

transaction(name: String, userBio: String, email: String ) {
  prepare(account: AuthAccount){
    Flower.createUser(userAddress: account.address, name: name, userBio: userBio, email: email)
  }

  execute {
    log("User created successfully")
  }
}
`

const transaction_update_user = `
import Flower from 0xFlower

transaction(name: String, email: String, userBio: String) {
  prepare(account: AuthAccount){
      Flower.updateUser(name: name, email: email, userBio: userBio, userAddress: account.address)
  }

  execute {
    log("User updated successfully")
  }
}
`

export { transaction_create_post, transaction_update_user, transaction_create_user }
