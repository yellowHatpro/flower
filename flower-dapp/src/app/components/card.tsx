import React from 'react'

const Card = (props: { title: string, desc: string, body: string, user: String }) => {
  return (
    <div className={"flex m-2 flex-col bg-catppuccin_blue0 rounded-md p-2 "}>
      <div className={"font-black text-xl"}>
        {props.user}
      </div><div className={"font-black text-xl"}>
        {props.title}
      </div>
      <div className={"text-sm font-semibold "}>
        {props.desc}
      </div>
      <div className={"text-sm pt-2"}>
        {props.body}
      </div>
    </div>
  )
}

export default Card
