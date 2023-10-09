import React from 'react'
import { Card, CreatePost } from './components'


const Main = (props: { posts: any[] }) => {
  return (
    <div className={"text-gray-200"}>
      <CreatePost />

      <div className="flex flex-col items-center justify-between">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {props.posts.map((post, idx) => (
            <Card
              key={idx}
              user={post.user}
              title={post.title}
              desc={post.desc}
              body={post.body}
            />
          ))
          }
        </div>
      </div>
    </div>
  )
}

export default Main
