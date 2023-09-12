pub contract Flower {

  pub var totalSupply: UInt64

  pub var posts : {UInt64: Post}

  pub var userAddressToPosts : {Address: {UInt64: Bool}}

  pub var users: {UInt64: User}

  pub struct Post {
    pub var id: UInt64
    pub(set) var userAddress: Address
    pub(set) var title: String
    pub(set) var description: String 
    pub(set) var body: String
    
    init( _title: String,
      _description :  String,
      _body: String,
      _userAddress : Address) {
      self.id = Flower.totalSupply
      self.userAddress = _userAddress 
      self.title = _title
      self.description = _description
      self.body = _body
    }
  }

  pub struct User {
    pub let id: Address
    pub let totalPosts : UInt64 
    pub let bookmarks : [Post]

    init( _id: Address, _totalPosts : UInt64, _bookmnarks: [Post]){
      self.id = _id
      self.totalPosts = _totalPosts
      self.bookmarks = _bookmnarks
    }
  }

  pub fun createPost(title: String, description: String, body: String, userAddress: Address) {
    var post = Post(_title:title, _description: description , _body: body, _userAddress : userAddress)
    self.posts[self.totalSupply] = post
    self.totalSupply = self.totalSupply + 1
    self.userAddressToPosts[userAddress]?.insert(key: self.totalSupply, true)
  }

  pub fun updatePost(id: UInt64, title: String, description: String, body: String, userAddress: Address) {
    var post = self.getPostById(id: id);
    post.title = title
    post.description = description
    post.body = body
    self.posts[id] = post
  }

  pub fun deletePost(id: UInt64, userAddress: Address) {
    self.posts.remove(key: id)
  }

  pub fun getPostById(id: UInt64) : Post{
    return self.posts[id]!
  }

  init(){
    self.totalSupply = 0
    self.posts = {}
    self.users = {}
    self.userAddressToPosts = {}
  }
}
