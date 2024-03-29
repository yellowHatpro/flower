'use client'

import * as React from 'react';
import {useState} from "react";
import * as fcl from "@onflow/fcl";
import userStore from "@/app/store/user-store";
import {useRouter} from "next/navigation";
import {transaction_create_user} from "@/app/fcl_components/transactions";
import Modal from "@/app/components/modal";
import fclConfig from "@/config/fclConfig";



export function Main(props: {
    userAddr: string
}) {
    const [errorModal, setErrorModal] = useState(false);
    const [userName, setUserName] = useState("")
    const [userEmail, setUserEmail] = useState("")
    const [userBio, setUserBio] = useState("")

    const userNameStore  = userStore((state) => state.name)

    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (userName?.trim()=="" || userEmail?.trim()=="" || userBio?.trim()==""){
            setErrorModal(true);
        } else {
            await createUser().then(()=>{
                router.push("/feed")
            });
        }
    };

    const closeErrorModal = () => {
        setErrorModal(false);
    }

    const createUser = async (): Promise<void> => {
        try {
            const txId = await fcl.mutate({
                cadence: transaction_create_user,
                limit: 50,
                args: (arg, t) => [
                    arg(userName, t.String),
                    arg(userEmail, t.String),
                    arg(userBio, t.String),
                ]
            })
            console.log(txId)
        } catch (error) {
            console.error('Error occurred:', error);
        }
    }
    const addr = props.userAddr


    if (userNameStore?.length! <= 1) {
        return (
            <div className={"min-h-screen flex-col items-center bg-catppuccin_blue5"}>
                <div>
                    {addr}
                </div>
                {
                    errorModal &&
                    <Modal isOpen={errorModal} onClose={closeErrorModal}>
                        {"Please fill complete details"}
                    </Modal>
                }
                <form onSubmit={handleSubmit}>
                    <div className={"flex flex-col py-4"}>
                        <label htmlFor="title" className={"py-4"}>What shall we call you?</label>
                        <input
                            className={"input input-bordered bg-catppuccin_blue0"}
                            type="text"
                            id="name"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                        />
                    </div>
                    <div className={"flex flex-col py-4"}>
                        <label htmlFor="description" className={"py-4"}>Umm... email please?</label>
                        <input
                            className={"input input-bordered bg-catppuccin_blue0"}
                            id="email"
                            type={"email"}
                            value={userEmail}
                            onChange={(e) =>  setUserEmail(e.target.value)}
                        />
                    </div>
                    <div className={"flex flex-col py-4"}>
                        <label htmlFor="body" className={"py-4"}>What do you wanna share about you?</label>
                        <input
                            className={"input input-bordered bg-catppuccin_blue0"}
                            type="text"
                            id={"bio"}
                            value={userBio}
                            onChange={(e) =>  setUserBio(e.target.value)}
                        />
                    </div>
                    <button className="btn join-item bg-catppuccin_blue1 text-gray-200 hover:bg-gray-200 hover:text-catppuccin_blue0" type="submit">Fill User Details</button>
                </form>
            </div>
        )
    } else {
        router.push("/feed")
    }
}
