import React, { useState } from 'react';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Spinner } from '@heroui/react';

export default function DropDownActions({
    id,
    deleteAction,
    onDelete,
    callback,
    setIsUpdating,
    isComment = false
}) {
    const [loading, setLoading] = useState(false);

    async function handleDelete() {
        setLoading(true);
        try {
            await deleteAction(id);

            if (isComment) {
                if (typeof callback === 'function') await callback();
            } else {
                if (typeof onDelete === 'function') {
                    onDelete(id); 
                }
            }
        } catch (err) {
            console.error("Error deleting:", err);
        } finally {
            setLoading(false);
        }
    }


    return (
        <Dropdown>
            <DropdownTrigger>
                <button className="p-2 hover:bg-gray-100 rounded-full" disabled={loading}>
                    {loading ? <Spinner size="sm" /> : (
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                d="M6.75 12a.75.75 0 1 1-1.5 0
                                   .75.75 0 0 1 1.5 0ZM12.75 12
                                   a.75.75 0 1 1-1.5 0
                                   .75.75 0 0 1 1.5 0ZM18.75 12
                                   a.75.75 0 1 1-1.5 0
                                   .75.75 0 0 1 1.5 0Z" />
                        </svg>
                    )}
                </button>
            </DropdownTrigger>

            <DropdownMenu>
                {isComment && setIsUpdating && (
                    <DropdownItem onClick={() => setIsUpdating(true)}>
                        Edit
                    </DropdownItem>
                )}
                <DropdownItem onClick={handleDelete} color="danger" className="text-danger">
                    Delete
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
    );
}
