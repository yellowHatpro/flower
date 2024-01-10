pub contract Flower {

    pub var totalSupply: UInt64

    pub var posts : {UInt64: Post}

    pub var users : {Address: User}

    pub var topics : [Topic]

    pub var topicGenre: [TopicGenre]

    pub enum Role: UInt8 {
        pub case NEW_USER
        pub case EDITOR
        pub case APPROVER 
        pub case READER
    }

    pub enum PostStatus: UInt8 {
        pub case NOT_APPROVED
        pub case APPROVED
    }

    pub enum ApprovalRequestStatus: UInt8 {
        pub case REJECTED
        pub case APPROVED
        pub case PENDING
    }

    pub struct TopicGenre {
        pub(set) var genre: String
        init(
            genre: String,
        ) {
            self.genre = genre

        }
    }

    pub struct Topic {
        pub(set) var name: String 
        pub(set) var genre: TopicGenre
        init(
            name: String ,
            genre: TopicGenre,
        ) {
            self.name = name
            self.genre = genre
        }
    }

    pub struct ApprovalRequest  {
        pub(set) var postId: UInt64  
        pub(set) var receiverAddress: Address 
        pub(set) var senderAddress: Address
        pub(set) var time: String
        pub(set) var status: ApprovalRequestStatus
        init(
            postId: UInt64,
            receiverAddress: Address, 
            senderAddress: Address, 
            time: String 
        ) {
            self.postId = postId
            self.receiverAddress = receiverAddress
            self.senderAddress = senderAddress
            self.time = time
            self.status = ApprovalRequestStatus.PENDING
        }
    }

    pub struct PostApproval {
        pub(set) var time: String 
        pub(set) var remarks: String
        pub(set) var approverAddress: Address 
        init(
            time: String,
            remarks: String,
            approverAddress: Address
        ) {
            self.approverAddress = approverAddress
            self.remarks = remarks
            self.time = time 
        }
    }

    pub struct Post {
        pub(set) var id: UInt64 
        pub(set) var title: String
        pub(set) var author: Address
        pub(set) var description: String
        pub(set) var body: String
        pub(set) var date: String
        pub(set) var status: PostStatus
        pub(set) var approveRequests: [Address]
        pub(set) var approvers: [Address]

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
                self.approvers = []
                self.approveRequests = []
                self.status = PostStatus.NOT_APPROVED
            }
        } 

        pub struct User {
            pub(set) var addr: Address
            pub(set) var role: Role
            pub(set) var name: String
            pub(set) var email: String
            pub(set) var userBio: String
            pub(set) var userPosts : [UInt64] // post id array 
            pub(set) var bookmarks : [UInt64]
            pub(set) var requestsForApproval: [ApprovalRequest]
            init(name: String, addr: Address ){
                self.addr = addr
                self.email = ""
                self.userBio = ""
                self.userPosts = []
                self.bookmarks = []
                self.requestsForApproval = []
                self.name = name
                self.role = Role.NEW_USER
            }
        }

        pub fun createPost(title: String, description: String, body: String, authorAddress: Address, date: String) {
            var post = Post(_title:title, _description: description , _body: body, _authorAddress : authorAddress, _date: date)
            self.posts[self.totalSupply] = post
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
            self.users[userAddress] = User(name: name, addr: userAddress)
        }

        pub fun updateUser(name: String, email: String, userBio: String, userAddress: Address){
            var user = self.users[userAddress]!
            user.name = name
            user.userBio = userBio
            user.email = email
            self.users[userAddress] = user
        }

        pub fun createApprovalRequest(approvalRequest: ApprovalRequest, senderAddress: Address){
            var user = self.users[approvalRequest.receiverAddress]!
            user.requestsForApproval.append(approvalRequest)
        }

        pub fun acceptApprovalRequest(approvalRequest: ApprovalRequest){
            var post = self.posts[approvalRequest.postId]!
            post.approvers.append(approvalRequest.receiverAddress)
            post.status = PostStatus.APPROVED
            approvalRequest.status = ApprovalRequestStatus.APPROVED
        }

        init(){
            self.totalSupply = 0
            self.posts = {}
            self.users = {}
            self.topics = []
            self.topicGenre = []
        }
    }
