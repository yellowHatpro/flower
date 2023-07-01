pub contract interface IPost {
  //Total posts in existence. 
  pub var totalSupply: UFix64

  pub event PostInitialized(initialSupply: UFix64)
  
  pub resource interface IAuthor {
    pub var posts: UFix64
  }
}
