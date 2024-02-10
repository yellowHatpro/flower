import Link from "next/link";
import React from "react";
import userStore from "@/app/store/user-store";
import {logOut} from "@/app/fcl_components/onflow_fcl";
import {useRouter} from "next/navigation";


export default function Navbar(props: {
  leftItem: React.ReactNode}) {

  const router = useRouter()

  const userAddr = userStore((state)=>state.address?.addr)

  return (
      <div className="flex bg-catppuccin_blue3 justify-between p-2 items-center text-gray-200">

        {props.leftItem}

        <div className={" flex flex-row items-center justify-center space-x-1.5"}>
          <div className="dropdown dropdown-bottom dropdown-end">
            <label tabIndex={0} className="btn m-1 bg-gray-200">👤</label>
            <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-catppuccin_blue1 rounded-box w-52">
              <li><Link href={{pathname: `/profile/${userAddr}`}}>{userAddr}</Link></li>
              <li onClick={()=> {
                logOut()
                router.push('/',{

                })
              }}><a>Log out</a></li>
            </ul>
          </div>
        </div>
      </div>
  )
}
