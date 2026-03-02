import React, { useContext, useEffect, useState } from 'react'
import PostCard from '../Components/PostCard'
import { getAllPostsApi } from '../Services/PostServices'
import LoadingScreen from '../Components/LoadingScreen'
import CreatePost from '../Components/CreatePost'
import { useQuery } from '@tanstack/react-query'

export default function FeedPage() {
  const {
    data: posts = [],
    isLoading,
    isError,
    error,
    refetch:getPosts
  } = useQuery({
    queryKey: ['posts'],
    queryFn: getAllPostsApi,
    select: (res) => res.data.posts
  });
  if (isLoading) return <LoadingScreen />;
  if (isError) {
    return <p>{error?.response?.data?.message}</p>;
  }

  return (
    <div className="w-4/6 mx-auto">
      <CreatePost callback={getPosts} />
      {posts.map((post) => (
        <PostCard
          key={post._id}
          post={post}
          commentLimit={5}
          callback={getPosts}
        />
      ))}
    </div>
  );
}




