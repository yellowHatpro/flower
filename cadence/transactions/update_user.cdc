import Flower from "../contracts/flower/Flower.cdc"

transaction(name: String, email: String, userBio: String) {
  prepare(account: AuthAccount){
      Flower.updateUser(name: name, email: email, userBio: userBio, userAddress: account.address)
  }

  execute {
    log("User updated successfully")
  }
}
