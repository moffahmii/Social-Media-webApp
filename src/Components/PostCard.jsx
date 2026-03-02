import React, { useContext, useState } from 'react';
import {
    Input,
    Button,
    Card,
    CardBody,
    CardHeader,
    CardFooter,
    Divider,
    Avatar
} from '@heroui/react';
import PostHeader from './Card/PostHeader';
import PostBody from './Card/PostBody';
import PostFooter from './Card/PostFooter';
import Comments from './Card/Comments';
import DropDownActions from './DropDownActions';
import { createCommentApi } from '../Services/CommentServices';
import { deletePostApi } from '../Services/UserServices';
import { AuthContext } from '../Context/AuthContext';
import { Send, MessageCircle } from 'lucide-react';
import { useMutation } from '@tanstack/react-query';
import { queryClient } from '../main';

export default function PostCard({ post, commentLimit, onDelete }) {
    const [commentContent, setCommentContent] = useState('');
    const { userData } = useContext(AuthContext);

    const comments = post.comments || [];

    const { isPending, mutate: createComment } = useMutation({
        mutationKey: ['create-comment'],
        mutationFn: () => createCommentApi(commentContent, post._id),
        onSuccess: () => {
            setCommentContent('');
            queryClient.invalidateQueries(['posts']);
        }
    });

    return (
        <Card className="max-w-xxl w-[95%] sm:w-full mx-auto my-6 shadow-sm border border-slate-100 rounded-2xl overflow-hidden relative">
            <CardHeader className="flex justify-between items-start px-4 pt-4 pb-2">
                <PostHeader
                    photo={post.user.photo}
                    name={post.user.name}
                    date={post.createdAt}
                />

                {userData?._id === post.user._id && (
                    <div className="z-10">
                        <DropDownActions
                            id={post._id}
                            deleteAction={deletePostApi}
                            onDelete={onDelete}
                        />
                    </div>
                )}
            </CardHeader>

            <CardBody className="px-4 py-2 overflow-visible">
                <PostBody body={post.body} image={post.image} />
            </CardBody>

            <div className="px-4">
                <PostFooter comments={comments.length} postId={post._id} />
            </div>
            <Divider className="my-2 opacity-50" />

            <CardFooter className="flex flex-col gap-4 px-4 pb-4">
                {/* Add Comment */}
                <div className="flex items-center gap-3 w-full">
                    <Avatar
                        src={userData?.photo}
                        size="sm"
                        isBordered
                        color="primary"
                    />

                    <Input
                        variant="flat"
                        radius="full"
                        value={commentContent}
                        onChange={e => setCommentContent(e.target.value)}
                        placeholder="Write a comment..."
                        className="bg-slate-50 grow"
                    />

                    <Button
                        isIconOnly
                        color="primary"
                        variant="light"
                        isLoading={isPending}
                        disabled={commentContent.trim().length < 2}
                        onPress={createComment}
                        className="rounded-full"
                    >
                        <Send size={20} />
                    </Button>
                </div>

                {/* Comments */}
                <div className="w-full flex flex-col gap-3 mt-2">
                    {comments.length > 0 && (
                        <div className="flex items-center gap-2 text-slate-500 text-xs font-semibold mb-1">
                            <MessageCircle size={14} />
                            <span>Recent Comments</span>
                        </div>
                    )}

                    {comments.slice(0, commentLimit).map(comment => (
                        <Comments
                            key={comment._id}
                            comment={comment}
                            postUserId={post.user._id}
                        />
                    ))}
                </div>
            </CardFooter>
        </Card>
    );
}
