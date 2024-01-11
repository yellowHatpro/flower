"use client";

import React, {useEffect, useState} from "react"
import Login from "./login"
import {Main} from "@/app/main";
import userStore from "@/app/store/store";
import {currentUser} from "@onflow/fcl";

export default function Home() {
    //We get an object, and we only want the addr
    const [userAddress, setUserAddress] = useState({
        addr: ""
    })
    const userName = userStore((state) => state.name)
    useEffect(() => {
        currentUser.subscribe(setUserAddress)
    }, []);

    useEffect(() => {
        userStore.subscribe(console.log)
        userStore.setState({address: userAddress})
    }, [userAddress])

    return (
        <main>
            {
                (userAddress.addr) ?
                    <Main userAddr={userAddress.addr}/>
                    :
                    <Login />
            }
        </main>)
}
