import Link from "next/link";
import {flower} from "../../assets";
import Image from "next/image";

export default function Navbar(props: {logout : () => void , userAcc : string  }){
  return(
    <div className = "flex bg-catppuccin_blue3 justify-between p-2">

      <Image src={flower} alt={"Flower"} className="h-[40px] w-[40px]"/>

      <div className={" flex flex-row items-center justify-center space-x-1.5"}>


      <button className={"bg-catppuccin_blue1 "} onClick={props.logout}>

      </button>
          <div className="dropdown dropdown-bottom dropdown-end ">
              <label tabIndex={0} className="btn m-1">👤</label>
              <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-catppuccin_blue1 rounded-box w-52">
                  <li><Link href={"/profile/"+props.userAcc}>{props.userAcc}</Link></li>
                  <li onClick={props.logout}><a>Log out</a></li>
              </ul>
          </div>
      </div>
    </div> 
  )
}
