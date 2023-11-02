import React from 'react'
import { Card } from './index'
import {Emptyness} from "@/app/components/emptyness";


const Posts = (props: { posts: any[] }) => {
    return (
        <div className={"text-gray-200"}>
            {
                props.posts.length > 0 ? <div className="flex flex-col items-center justify-between">
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
                </div> : <Emptyness/>
            }
        </div>
    )
}

export default Posts
