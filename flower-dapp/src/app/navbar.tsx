export default function Navbar(props: {logout : () => void , createAndUpdatePosts : () => void , userAcc : string  }){
  return(
    <div className = "flex bg-catppuccin_blue3 justify-between p-2">

      <text className="text-2xl left-0 ">  
        Flower
      </text>
      <div className={" "}>
      <button className="px-10" onClick={props.createAndUpdatePosts}>
        +
      </button>
      <button className = "px-10"> 
        {props.userAcc}
      </button>
      <button className={"bg-catppuccin_blue1 "} onClick={props.logout}>
        Log Out
      </button>
      </div>
    </div> 
  )
}
