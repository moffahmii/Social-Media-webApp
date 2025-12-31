import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getSinglePost } from '../Services/PostServices'
import PostCard from '../Components/PostCard'

export default function PostDetails() {
  let { id } = useParams()
  console.log(id)

  const [post, setPost] = useState(null)
  async function getPost() {
    const response = await getSinglePost(id)
    if (response.message) {
      setPost(response.post)
    }
  }
  useEffect(() => {
    getPost()
  }, [])

  return <>
    <div className='w-4/6 mx-auto'>
      {post && <PostCard post={post} callBack={getPost} commentLimit={post.comments.length} />}
    </div>
  </>
}
