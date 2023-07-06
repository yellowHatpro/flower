const Login = (props :  { login :  () => void}) => {
  return(
    <div className="flex justify-center items-center flex-col min-h-screen bg-catppuccin_blue5">
      <text className={"text-4xl"}> Flower </text>
      <text className={"text-2xl"}> A decentralised blog sharing website </text>
      <button className={""} onClick={props.login}>Login</button>
    </div>
  )
}

export default Login;
