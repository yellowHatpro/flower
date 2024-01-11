import Flower from "../contracts/flower/Flower.cdc"

transaction(name: String, userBio: String, email: String ) {
  prepare(account: AuthAccount){
    Flower.createUser(userAddress: account.address, name: name, userBio: userBio, email: email)
  }

  execute {
    log("User created successfully")
  }
}
