import React, { useEffect, useState } from 'react';
import { getUserPostsApi } from '../Services/UserServices';
import PostCard from './PostCard';
import LoadingScreen from './LoadingScreen';
import { Card } from '@heroui/react';

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
            console.error("Error fetching user posts:", err);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (userId) getUserposts();
    }, [userId]);

    if (loading) {
        return (
            <div className="w-full flex flex-col gap-2">
                <LoadingScreen />
                <LoadingScreen />
                <LoadingScreen />
            </div>
        );
    }

    if (!userPosts.length) {
        return (
            <Card className="max-w-md mx-auto p-10 text-center bg-white/50 border-2 border-dashed border-slate-200 shadow-none mt-6">
                <p className="text-slate-400 font-bold">No posts created yet.</p>
            </Card>
        );
    }

    return (
        <div className="max-w-xxl flex flex-col gap-2 mt-2">
            {userPosts.map(post => (
                <PostCard
                    key={post._id}
                    post={post}
                    onDelete={getUserposts
                    } 
                />
            ))}
        </div>
    );
}