import {flower_logo_no_text} from '../assets'
import Image from "next/image";
const Login = (props :  { login :  () => void}) => {
  return(
    <div className={"flex justify-center items-center flex-col min-h-screen bg-catppuccin_blue5"}>
      <Image src={flower_logo_no_text} alt={"Flower Dapp"} className={"indefinite-rotate"}/>
    <div className="flex flex-col ">  
      <text className={"text-6xl  flex justify-center font-black text-pink-50"}> Flower </text>
      <text className={"text-4xl flex justify-center p-2"}> A decentralised blog sharing site </text>
      <button className={"flex text-xl justify-center bg-blue-200"} onClick={props.login}>Login</button>
    </div>
    </div>
  )
}

export default Login;
