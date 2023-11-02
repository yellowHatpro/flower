import * as fcl from "@onflow/fcl";


const fclConfig = fcl.config({
    "accessNode.api": "http://localhost:8888",
    "discovery.wallet": "http://localhost:8701/fcl/authn", // emulator endpoint
    "app.detail.title": "Flower",
    "0xFlower": "0xf8d6e0586b0a20c7"
})

export default fclConfig
