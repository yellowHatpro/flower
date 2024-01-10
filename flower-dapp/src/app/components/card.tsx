import React from 'react'
import {BiBookmark} from "react-icons/bi";
import {FaHandshake} from "react-icons/fa";

const Card = (props: { title: string, desc: string, body: string, user: String, clickHandler: ()=>void }) => {
    return (
        <div className={"flex m-2 flex-col bg-catppuccin_blue0 rounded-md p-2 min-w-fit"} onClick={props.clickHandler}>
            <div>
                <div className={"font-black text-xl"}>
                    {props.title}
                </div>
                <div className={"font-black text-xl"}>
                    {props.desc}
                </div>
                <div className={"text-sm font-semibold"}>
                    {props.body}
                </div>
                <div className={"text-sm p-2"}>
                    {`By: ${props.user}`}
                </div>
            </div>
            <hr/>
            <div className={"flex justify-between"}>
                <FaHandshake/>
                <BiBookmark/>
            </div>
        </div>
    )
}

export default Card
