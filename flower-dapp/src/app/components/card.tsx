import React from 'react'

const Card = (props: { title: string, desc: string, body: string }) => {
  return (
    <div>
      <div className={"flex"}>
        {props.title}
      </div>
      <div className={"flex"}>
        {props.desc}
      </div>
      <div className={"flex"}>
        {props.body}
      </div>
    </div>
  )
}

export default Card
