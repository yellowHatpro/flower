import Flower from "../contracts/flower/Flower.cdc"

transaction( postId: UInt64,
receiverAddress: Address, 
time: String 
) {
    prepare(account: AuthAccount){
        var approvalRequest = Flower.ApprovalRequest(postId: postId, receiverAddress: receiverAddress, senderAddress: account.address, time: time)
        Flower.createApprovalRequest(approvalRequest: approvalRequest, senderAddress: account.address)
    }

    execute {
        log("Approval Request created")
    }
}
