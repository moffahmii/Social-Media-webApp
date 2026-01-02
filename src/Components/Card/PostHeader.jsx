import React from 'react'
import { Avatar } from '@heroui/react'
import userImage from '../../assets/Portrait_Placeholder.png'

export default function PostHeader({ photo, name, date }) {
    const formattedDate = date ? date.split('T')[0] + ' • ' + date.split('T')[1].split('.')[0] : '';

    return (
        <div className="flex items-center gap-3">
            <Avatar
                src={photo}
                name={name}
                fallback={<img src={userImage} alt="placeholder" />}
                className="w-10 h-10 shrink-0"
                isBordered
                color="primary"
                size="sm"
            />

            <div className="flex flex-col">
                <h3 className="text-sm font-bold text-slate-800 leading-none mb-1 hover:text-primary cursor-pointer transition-colors">
                    {name}
                </h3>
                <p className="text-[11px] font-medium text-slate-400">
                    {formattedDate}
                </p>
            </div>
        </div>
    )
}