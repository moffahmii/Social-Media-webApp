import React, { useContext, useEffect, useState } from 'react'
import PostCard from '../Components/PostCard'
import { getAllPosts } from '../Services/PostServices'
import LoadingScreen from '../Components/LoadingScreen'
import CreatePost from '../Components/CreatePost'

export default function FeedPage() {
  const [posts, setPosts] = useState([])

  async function getAllPosTs() {
    const response = await getAllPosts()
    setPosts(response.posts)
  }
  useEffect(() => {
    getAllPosTs()
  }, [])

  return <>
    <div className='w-4/6 mx-auto'>
      <CreatePost callback={getAllPosTs} />
      {posts.length === 0 ? (
        <LoadingScreen />
      ) : (
        posts.map((post) => (
          <PostCard commentLimit={1} post={post} key={post.id} />
        ))
      )}
    </div>
  </>



}
