pub contract Flower {

  pub var totalSupply: UInt64

  pub var posts : {UInt64: Post}

  pub var users : {Address: User}

  pub struct Post {
    pub(set) var id: UInt64 
    pub(set) var title: String
    pub(set) var author: Address
    pub(set) var description: String
    pub(set) var body: String
    pub(set) var date: String
    pub(set) var likes: UInt64
    
    init( 
        _title: String,
        _description :  String,
        _body: String,
        _authorAddress : Address,
        _date: String) {
      self.id = Flower.totalSupply
      self.author = _authorAddress
      self.title = _title
      self.description = _description
      self.body = _body
      self.date = _date
      self.likes = 0
    }
  }


  pub struct User {
    pub(set) var addr: Address
    pub(set) var name: String 
    pub(set) var userPosts : [UInt64] // post id array 
    pub(set) var bookmarks : [UInt64]
    pub(set) var likedPosts: [UInt64]
    init(_name: String, _addr: Address){
      self.addr = _addr
      self.userPosts = []
      self.bookmarks = []
      self.likedPosts = []
      self.name = _name
    }
  }

  pub fun createPost(title: String, description: String, body: String, authorAddress: Address, date: String) {
      var post = Post(_title:title, _description: description , _body: body, _authorAddress : authorAddress, _date: date)
    self.posts[self.totalSupply] = post
    if (self.users[authorAddress] == nil){
        self.users[authorAddress] = User(_name: "Anonymous", _addr: authorAddress)
    }
    self.users[authorAddress]!.userPosts.append(self.totalSupply)
    self.totalSupply = self.totalSupply + 1
  }

  pub fun updatePost(id: UInt64, title: String, description: String, body: String, userAddress: Address) {
    var post = self.posts[id]!
    post.title = title
    post.description = description
    post.body = body
    self.posts[id] = post
  }

  pub fun deletePost(id: UInt64, userAddress: Address) {
    self.posts.remove(key: id)
    let postIdx = self.users[userAddress]!.userPosts.firstIndex(of: id)!
    self.users[userAddress]!.userPosts.remove(at: postIdx)
  }

  pub fun getPostById(id: UInt64) : Post{
    return self.posts[id]!
  }

  pub fun getUserDetails(userAddress: Address) : User {
    return self.users[userAddress]!
  }

  pub fun getPost(id: UInt64): Post {
    return self.posts[id]!
  }

  pub fun createUser(userAddress: Address, name: String) {
      self.users[userAddress] = User(_name: name, _addr: userAddress)
  }


  init(){
    self.totalSupply = 0
    self.posts = {}
    self.users = {}
  }
}
