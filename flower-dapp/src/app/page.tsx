"use client";

import React, {useEffect, useState} from "react"
import Login from "./login"
import {Main} from "@/app/main";
import userStore from "@/app/store/store";
import {currentUser} from "@onflow/fcl";

export default function Home() {
    const [userAddr, setUserAddr] = useState({
        addr: ''
    })

    useEffect(() => {
        currentUser.subscribe(setUserAddr)
    }, []);

    useEffect(() => {
        userStore.subscribe(console.log)
        userStore.setState({addr: userAddr})
    }, [userAddr])

    return (
        <main>
            {
                (userAddr.addr) ?
                    <Main userAddress={userAddr.addr}/>
                    :
                    <Login/>
            }
        </main>)
}
