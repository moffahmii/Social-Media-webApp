import React, { useState } from 'react';
import {
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
    Spinner,
    Button
} from '@heroui/react';
import { MoreHorizontal, Trash2, Edit3 } from 'lucide-react';

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
        <Dropdown placement="bottom-end" className="min-w-30]">
            <DropdownTrigger>
                <Button
                    isIconOnly
                    size="sm"
                    variant="light"
                    radius="full"
                    disabled={loading}
                    className="text-slate-400 hover:text-slate-600"
                >
                    {loading ? (
                        <Spinner size="sm" color="current" />
                    ) : (
                        <MoreHorizontal size={20} />
                    )}
                </Button>
            </DropdownTrigger>

            <DropdownMenu
                aria-label="Actions"
                variant="flat"
                disabledKeys={loading ? ["edit", "delete"] : []}
            >
                {setIsUpdating && (
                    <DropdownItem
                        key="edit"
                        startContent={<Edit3 size={16} />}
                        onClick={() => setIsUpdating(true)}
                    >
                        Edit
                    </DropdownItem>
                )}

                <DropdownItem
                    key="delete"
                    color="danger"
                    className="text-danger"
                    startContent={<Trash2 size={16} />}
                    onClick={handleDelete}
                >
                    Delete
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
    );
}