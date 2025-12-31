import { Button, Input, Spinner } from '@heroui/react'
import staticImage from '../assets/Portrait_Placeholder.png'
import React, { useState } from 'react'
import { createPostApi } from '../Services/PostServices'
import { div } from 'framer-motion/client'

export default function CreatePost({ callback }) {

    const [postBody, setPostBody] = useState('')
    const [image, setImage] = useState(null)
    const [imageUrl, setImageUrl] = useState()
    const [loading, setLoading] = useState(false)

    function handleImage(e) {
        setImage(e.target.files[0])
        setImageUrl(URL.createObjectURL(e.target.files[0]))
    }

    async function CreatePost(e) {
        e.preventDefault();
        setLoading(true)
        const formData = new FormData()
        if (postBody) {
            formData.append('body', postBody)
        }
        if (image) {
            formData.append('image', image)
        }
        const res = await createPostApi(formData)
        if (res.message) {
            await callback()
            setPostBody('')
            setImage(null)
            setImageUrl('')
        }
        setLoading(false)
    }
    
    return <>
        <div className='bg-white w-full relative rounded-md h-auto shadow-md p-3 my-5'>
            <form onSubmit={CreatePost}>
                <textarea name="" value={postBody} onChange={(e) => setPostBody(e.target.value)} id="" placeholder='What is in your mind?'
                    className='w-full p-4 border rounde-md bg-gray-100 resize-none' rows={4}></textarea>
                {imageUrl && <div className='relative'>
                    <img src={imageUrl} className='w-full' alt="" />
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        onClick={() => setImageUrl('')}
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-6 absolute right-4 cursor-pointer top-4"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18 18 6M6 6l12 12"
                        />
                    </svg>
                </div>}
                <div className='flex justify-between items-center'>
                    <label className='cursor-pointer hover:text-blue-400 flex items-center gap-2'>
                        <Input type='file' onChange={handleImage} className='border hidden' />
                        <svg xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="size-6">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Z"
                            />
                        </svg>
                    </label>
                    <Button type='submit' color='primary'>Post</Button>
                </div>

            </form>
            {loading && <div className='absolute flex justify-center items-center inset-0 bg-gray-300 opacity-50'>
                <Spinner />
            </div>}
        </div>

    </>
}
