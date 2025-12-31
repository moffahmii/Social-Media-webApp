import React, { useContext, useState } from 'react';
import { Input, Button } from '@heroui/react';
import PostHeader from './PostHeader';
import DropDownActions from '../DropDownActions';
import { deleteCommentApi, updateCommentApi } from '../../Services/CommentServices';
import { AuthContext } from '../../Context/AuthContext';

export default function Comments({ comment, postUserId, callback }) {
    const [loading, setLoading] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    const [updatedValue, setUpdatedValue] = useState(comment.content);
    const { userData } = useContext(AuthContext);
    async function handleUpdate(e) {
        e.preventDefault();
        if (updatedValue.trim().length < 1) return;
        setLoading(true);
        try {
            const response = await updateCommentApi(comment._id, updatedValue);
            if (response?.message === 'success') {
                setIsUpdating(false);       
                if (typeof callback === 'function') await callback(); 
            }
        } catch (err) {
            console.error("Update comment error:", err);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="bg-gray-100 p-4 pb-0 border-b border-divider rounded-2xl mb-3">
            <PostHeader photo={comment.commentCreator.photo} name={comment.commentCreator.name} date={comment.createdAt} />
            {userData?._id === comment.commentCreator._id && (
                <div className="flex justify-end">
                    <DropDownActions
                        id={comment._id}
                        deleteAction={deleteCommentApi}
                        callback={callback}
                        setIsUpdating={setIsUpdating}
                        isComment={true}
                    />
                </div>
            )}
            <p className="p-4">{comment.content}</p>
            {isUpdating && (
                <form onSubmit={handleUpdate} className="flex gap-2 py-2 items-center">
                    <Input
                        variant="bordered"
                        value={updatedValue}
                        onChange={(e) => setUpdatedValue(e.target.value)}
                        className="bg-white"
                    />
                    <Button type="submit" isLoading={loading} color="primary">
                        Update
                    </Button>
                </form>
            )}
        </div>
    );
}
