import Link from "next/link";

export default function Navbar(props: {logout : () => void , userAcc : string  }){
  return(
    <div className = "flex bg-catppuccin_blue3 justify-between p-2">

      <text className="text-2xl left-0 ">  
        Flower
      </text>
      <div className={" "}>
     <Link href = "/create"> <button className="px-10" >
        Create New Post
      </button> </Link>
      <button className = "px-10"> 
       <Link href={"/profile/"+props.userAcc}> {props.userAcc} </Link>
      </button>
      <button className={"bg-catppuccin_blue1 "} onClick={props.logout}>
        Log Out
      </button>
      </div>
    </div> 
  )
}
