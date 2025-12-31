import React, { useState, useEffect, useContext } from 'react';
import PostCard from './PostCard';
import { getAllPostsApi } from '../Services/PostServices';
import { AuthContext } from '../Context/AuthContext';

export default function PostsList({}) {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const { userData } = useContext(AuthContext);

    const fetchPosts = async () => {
        setLoading(true);
        try {
            const response = await getAllPostsApi();
            if (response?.posts) setPosts(response.posts);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };
    const handleDeletePost = (postId) => {
        setPosts((prevPosts) => prevPosts.filter(post => post._id !== postId));
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    return (
        <div className="p-5">
            {loading && <p>Loading posts...</p>}
            {posts.map(post => (
                <PostCard
                    key={post._id}
                    post={post}
                    commentLimit={3}
                    onDelete={handleDeletePost}
                />
            ))}

        </div>
    );
}
