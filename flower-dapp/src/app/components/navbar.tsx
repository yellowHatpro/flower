import Link from "next/link";
import { flower } from "../../assets";
import Image from "next/image";
import React from "react";

export default function Navbar(props: { leftItem: React.ReactNode, logout: () => void, userAcc: string }) {
  return (
    <div className="flex bg-catppuccin_blue3 justify-between p-2 items-center text-gray-200">

        {props.leftItem}

      <div className={" flex flex-row items-center justify-center space-x-1.5"}>


        <button className={"bg-catppuccin_blue1 "} onClick={props.logout}>

        </button>
        <div className="dropdown dropdown-bottom dropdown-end">
          <label tabIndex={0} className="btn m-1 bg-gray-200">👤</label>
          <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-catppuccin_blue1 rounded-box w-52">
            <li><Link href={{ pathname: `"/profile/" + ${props.userAcc}`, query: props.userAcc }}>{props.userAcc}</Link></li>
            <li onClick={props.logout}><a>Log out</a></li>
          </ul>
        </div>
      </div>
    </div>
  )
}
