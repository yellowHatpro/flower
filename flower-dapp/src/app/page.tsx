'use client'

import React, {useEffect, useState} from "react"
import Login from "./login"
import {Main} from "@/app/main";
import userStore from "@/app/store/user-store";
import {currentUser} from "@onflow/fcl";
import * as fcl from "@onflow/fcl";
import {script_get_user_details} from "@/app/fcl_components/scripts";

export default function Home() {
    //We get an object, and we only want the addr
    const [userAddress, setUserAddress] = useState({
        addr: ''
    })
    const userNameStore = userStore((state) => state.name)
    useEffect(() => {
        currentUser.subscribe(setUserAddress)
    }, []);

    useEffect(() => {
        async function fetchUser() {
            const res = await fcl.query(
                {
                    cadence: script_get_user_details,
                    args: (arg, t) => [
                        arg(userAddress.addr, t.Address),
                    ],
                }
            )
            console.log("user: ", res)
            if (!res) {
                console.log("User fetch error")
            } else {
                const getUser = () => {
                    userStore.setState(res)
                }
                getUser()
            }
        }

        const handleGetUserDetails = async (): Promise<void> => await fetchUser()
        if (userAddress.addr && userAddress.addr.startsWith('0x',0)) handleGetUserDetails().finally()
    }, [userAddress.addr, userNameStore]);

    useEffect(() => {
        userStore.subscribe(console.log)
        userStore.setState({address: userAddress})
    }, [userAddress])

    return (<main>
        {(userAddress.addr) ?
            <Main userAddr={userAddress.addr}/>
            :
            <Login/>
        }
    </main>)
}
