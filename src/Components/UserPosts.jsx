import React, { useEffect, useState } from 'react';
import { getUserPostsApi } from '../Services/UserServices';
import PostCard from './PostCard';

export default function UserPosts({ userId }) {
    const [userPosts, setUserPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    async function getUserposts() {
        try {
            setLoading(true);
            const response = await getUserPostsApi(userId);
            if (response?.posts) {
                setUserPosts(response.posts);
            }
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (userId) getUserposts();
    }, [userId]);

    if (loading) return <p className="text-center mt-4">Loading posts...</p>;

    if (!userPosts.length) return <p className="text-center mt-4">No posts yet.</p>;

    return (
        <div className="w-[95%] md:w-5/6 lg:w-4/6 mx-auto mt-6 flex flex-col gap-6">
            {userPosts.map(post => (
                <div key={post._id} className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
                    <PostCard post={post} />
                </div>
            ))}
        </div>
    );
}
