import Flower from "../contracts/flower/Flower.cdc"

transaction(name: String) {
  prepare(account: AuthAccount){
      Flower.createUser(userAddress: account.address, name: name)
  }

  execute {
    log("User created successfully")
  }
}
