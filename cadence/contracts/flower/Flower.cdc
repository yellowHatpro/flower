pub contract Flower {

  pub var totalSupply: UInt64

  pub resource Post {
    pub let id: UInt64
    pub let title: String
    pub let description: String 
    pub let body: String
    
    init( _title: String,
      _description :  String,
      _body: String) {
      self.id = Flower.totalSupply
      self.title = _title
      self.description = _description
      self.body = _body
      Flower.totalSupply = Flower.totalSupply + 1
    }
  }

  pub resource interface ICollection {
    pub fun getIDs() : [UInt64]
    pub fun borrowEntirePost(id : UInt64) : &Post
  }

  pub resource Collection : ICollection {

    init() {
      self.myPosts <- {}
    }
    destroy () {
      destroy self.myPosts
    }

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

    pub fun borrowEntirePost(id: UInt64) : &Post{
      return (&self.myPosts[id] as &Post?)!  
    }
  }
  
  pub fun createCollection() : @Collection {
    return <- create Collection()
  }

  pub fun createPost(title: String, description: String, body: String) : @Post {
    return <- create Post(_title:title, _description: description , _body: body)
  }
  
  init(){
    self.totalSupply = 0
  }
}
