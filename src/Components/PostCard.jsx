import React, { useContext, useState } from 'react';
import { Input, Button } from '@heroui/react';
import PostHeader from './Card/PostHeader';
import PostBody from './Card/PostBody';
import PostFooter from './Card/PostFooter';
import Comments from './Card/Comments';
import DropDownActions from './DropDownActions';
import { getPostCommentsApi } from '../Services/PostServices';
import { createCommentApi } from '../Services/CommentServices';
import { deletePostApi } from '../Services/UserServices';
import { AuthContext } from '../Context/AuthContext';

export default function PostCard({ post, commentLimit, onDelete }) {
    const [comments, setComments] = useState(post.comments || []);
    const [commentContent, setCommentContent] = useState('');
    const [loading, setLoading] = useState(false);
    const { userData } = useContext(AuthContext);

    async function createComment(e) {
        e.preventDefault();
        if (commentContent.trim().length < 2) return;
        setLoading(true);
        try {
            const response = await createCommentApi(commentContent, post._id);
            if (response?.message === 'success') {
                setCommentContent('');
                setComments(response.comments);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    async function getPostComments() {
        const response = await getPostCommentsApi(post._id);
        if (response?.comments) setComments(response.comments);
    }

    return (
        <div className="bg-white p-3 my-5 rounded-md shadow-md">
            <div className="flex justify-between items-center">
                <PostHeader photo={post.user.photo} name={post.user.name} date={post.createdAt} />
                {userData._id === post.user._id && (
                    <DropDownActions
                        id={post._id}
                        deleteAction={deletePostApi}
                        onDelete={onDelete}
                    />
                )}
            </div>

            <PostBody body={post.body} image={post.image} />
            <PostFooter comments={comments.length} postId={post._id} />
            <form onSubmit={createComment} className="flex gap-2 my-3">
                <Input
                    variant="bordered"
                    value={commentContent}
                    onChange={e => setCommentContent(e.target.value)}
                    placeholder="Comment..."
                />
                <Button type="submit" color='primary' isLoading={loading} disabled={commentContent.trim().length < 2}>
                    Add Comment
                </Button>
            </form>
            {comments.slice(0, commentLimit).map(comment => (
                <Comments
                    key={comment._id}
                    comment={comment}
                    postUserId={post.user._id}
                    callback={getPostComments} // تحديث التعليقات بعد تعديل/حذف
                />
            ))}
        </div>
    );
}
