const script_view_all_posts = `
import Flower from 0xFlower;
          pub fun main(account: Address) : [Flower.Post] {
          return Flower.posts.values
        }`


const script_view_user_posts = `
  import Flower from 0xFlower;

    pub fun main(account: Address) : [UInt64] {
    return Flower.userAddressToPosts[account]?.keys! 
} 

`

export { script_view_all_posts, script_view_user_posts };
