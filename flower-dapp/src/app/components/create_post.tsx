import Link from 'next/link'
import React from 'react'

const CreatePost = () => {
  return (
    <div className={"flex bg-catppuccin_blue0 rounded-md p-2 mx-20 my-10 justify-center"}>
      <Link href={"/create"}>
        <div>      Create Post ✍🏻
        </div>
      </Link>
    </div>
  )
}
export default CreatePost
