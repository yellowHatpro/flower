"use client";
import * as fcl from "@onflow/fcl";
import {Navbar} from "./components";
import { useEffect, useState } from "react"
import {Poppins} from 'next/font/google'
import Login from "./login"
import {undefined} from "zod";

const poppins = Poppins(
    {weight: ["100", "200", "300"],
        subsets: ['latin'],
        variable: '--font-poppins',
    })

fcl.config({
  "accessNode.api" : "http://localhost:8888",
  "discovery.wallet" : "http://localhost:8701/fcl/authn", // emulator endpoint
  "app.detail.title" : "Flower",
  "0xFlower" : "0xf8d6e0586b0a20c7"
})

export default function Home() {

    const [user, setUser] = useState({addr: ''});

    const [posts, setPosts] = useState("");

    useEffect(() => {
        fcl.currentUser.subscribe(setUser);

    }, []);

    const logIn = async (): Promise<void> => {
        await fcl.authenticate();
        await checkCollectionIsCreated();
    };
    const logOut = () => {
        fcl.unauthenticate();
    };

    //scripts

    async function checkCollectionIsCreated() {
        const res = await fcl.query(
            {
                cadence: `import Flower from "../contracts/flower/Flower.cdc"

pub fun main(account: Address) : Bool {
  if  getAccount(account).getCapability(/public/collection).borrow<&Flower.Collection{Flower.ICollection}>() == nil{
    return  false
  }

  return true
} 

`,
                args: (arg, t) => [
                    arg("0xf8d6e0586b0a20c7", t.Address),
                ],
            }
        )
        if (!res) {
            await createCollection();
        }
    }


    //transactions
    async function createCollection() {
        const txId = await fcl.mutate({
            cadence: `import Flower from 0xFlower

      transaction {
        prepare(account: AuthAccount){
        account.save(<-Flower.createCollection(), to: /storage/collection)
    account.link<&Flower.Collection{Flower.ICollection}>(/public/collection, target: /storage/collection)
        }
        execute{
        log("Collection created")
      }
    }`,
        })
        console.log(txId)
    }

    return (
        <main className={poppins.className}>
            {
                (user.addr) ?

                    <div className=" min-h-screen flex-col items-center bg-catppuccin_blue5">
                        <Navbar
                            logout={logOut}
                            userAcc={user.addr}/>
                        <div className="flex flex-col items-center justify-between p-24">

                            <div className="">

                                {"post ids:" + posts}
                            </div>
                        </div>
                    </div>
                    :
                    <div>
                        <Login login={logIn}></Login>
                    </div>


            }
        </main>)
}
