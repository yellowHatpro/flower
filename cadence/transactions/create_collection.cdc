import Flower from "../contracts/flower/Flower.cdc"

transaction {
  prepare(account: AuthAccount){
    account.save(<-Flower.createCollection(), to: /storage/collection)
    account.link<&Flower.Collection{Flower.ICollection}>(/public/collection, target: /storage/collection)
  }
  execute{
    log("Collection created")
  }
}
