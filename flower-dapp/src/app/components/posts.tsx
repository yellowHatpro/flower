import React from 'react'
import { Card } from './index'
import {Emptyness} from "@/app/components/emptyness";
import {Post} from "@/app/model/post";
import {useRouter} from "next/navigation";
import Link from "next/link";


type PostsProps = {
    posts: Post[]
}

const Posts = ( { posts } : PostsProps) => {
    return (
        <div className={"text-gray-200"}>
            {
                posts.length > 0 ? <div className="flex flex-col items-center justify-between">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {posts.map((post, idx) => (
                            <Link key={idx} href={{pathname: `/post/${post.id}`}}>
                                <Card
                                    user={post.author}
                                    title={post.title}
                                    desc={post.description}
                                    body={post.body}
                                    clickHandler={()=>{
                                    }}
                                />
                            </Link>
                        ))
                        }
                    </div>
                </div> : <Emptyness/>
            }
        </div>
    )
}

export default Posts
