import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Divider } from '@heroui/react';
import { ThumbsUp, MessageSquare, Share2, Heart } from 'lucide-react';

export default function PostFooter({ comments, postId }) {
    return (
        <div className="w-full">
            <div className="flex items-center justify-between px-2 py-2">
                <div className="flex items-center">
                    <div className="flex -space-x-1">
                        <div className="bg-primary w-5 h-5 rounded-full flex items-center justify-center border-2 border-white z-20">
                            <ThumbsUp size={10} className="text-white fill-current" />
                        </div>
                        <div className="bg-danger w-5 h-5 rounded-full flex items-center justify-center border-2 border-white z-10">
                            <Heart size={10} className="text-white fill-current" />
                        </div>
                    </div>
                    <p className="ml-2 text-xs font-medium text-slate-500 hover:underline cursor-pointer">
                        8 others
                    </p>
                </div>
                <Link
                    to={'/post-details/' + postId}
                    className="text-xs font-medium text-slate-500 hover:underline transition-all"
                >
                    {comments} {comments === 1 ? 'comment' : 'comments'}
                </Link>
            </div>
            <Divider className="my-1 opacity-50" />
            <div className="grid grid-cols-3 gap-1 py-1">
                <Button
                    variant="light"
                    radius="md"
                    size="sm"
                    className="flex items-center gap-2 text-slate-600 font-bold hover:bg-slate-50"
                    startContent={<ThumbsUp size={18} />}
                >
                    Like
                </Button>
                <Button
                    as={Link}
                    to={'/post-details/' + postId}
                    variant="light"
                    radius="md"
                    size="sm"
                    className="flex items-center gap-2 text-slate-600 font-bold hover:bg-slate-50"
                    startContent={<MessageSquare size={18} />}
                >
                    Comment
                </Button>
                <Button
                    variant="light"
                    radius="md"
                    size="sm"
                    className="flex items-center gap-2 text-slate-600 font-bold hover:bg-slate-50"
                    startContent={<Share2 size={18} />}
                >
                    Share
                </Button>
            </div>
        </div>
    );
}