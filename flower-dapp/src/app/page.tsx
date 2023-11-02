"use client";

import React, {useEffect, useState} from "react"
import Login from "./login"
import {Main} from "@/app/main";
import userStore from "@/app/store/store";

export default function Home() {

    const [user, setUser] = useState({
        addr: ''
    })

    useEffect(() => {
        userStore.subscribe(console.log)
        userStore.setState({userAddress: user.addr})
    }, [user])

    return (
        <main>
            {
                (user.addr) ?
                    <Main user={user}/>
                    :
                    <Login setUser={setUser}></Login>
            }
        </main>)
}
