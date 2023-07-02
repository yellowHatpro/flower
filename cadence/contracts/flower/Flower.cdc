pub contract Flower {
  pub var totalSupply: UInt64

  pub resource Post {
    pub let id: UInt64

    init(){
      self.id = Flower.totalSupply
      Flower.totalSupply = Flower.totalSupply + (1 as UInt64)
    }
  }

  pub resource interface ICollection {
    pub fun getIDs() : [UInt64]
  }

  pub resource Collection : ICollection {
    pub var myPosts: @{UInt64: Post}
    
    pub fun deposit(post: @Post){
      self.myPosts[post.id] <-! post
    }

    pub fun withdraw(id: UInt64): @Post{
      let post <- self.myPosts.remove(key: id) ?? panic("This collection does not contain post with specified id")
      return <- post
    }

    pub fun getIDs(): [UInt64] {
      return self.myPosts.keys
    }


    init() {
      self.myPosts <- {}
    }
    destroy () {
      destroy self.myPosts
    }
  }
  
  pub fun createCollection() : @Collection {
    return <- create Collection()
  }

  pub fun createPost() : @Post {
    return <- create Post()
  }
  
  init(){
    self.totalSupply = 0
  }
}
