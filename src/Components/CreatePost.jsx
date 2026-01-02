import { Button, Card, CardBody, Textarea, Spinner, Avatar, Divider } from '@heroui/react'
import React, { useState, useContext } from 'react'
import { createPostApi } from '../Services/PostServices'
import { AuthContext } from '../Context/AuthContext'
import { Image as ImageIcon, X, Send } from 'lucide-react'

export default function CreatePost({ callback }) {
    const [postBody, setPostBody] = useState('')
    const [image, setImage] = useState(null)
    const [imageUrl, setImageUrl] = useState('')
    const [loading, setLoading] = useState(false)
    const { userData } = useContext(AuthContext);

    function handleImage(e) {
        if (e.target.files[0]) {
            setImage(e.target.files[0])
            setImageUrl(URL.createObjectURL(e.target.files[0]))
        }
    }

    function removeImage() {
        setImage(null)
        setImageUrl('')
    }

    async function handleCreatePost(e) {
        e.preventDefault();
        if (!postBody.trim() && !image) return;

        setLoading(true)
        const formData = new FormData()
        if (postBody) formData.append('body', postBody)
        if (image) formData.append('image', image)

        try {
            const res = await createPostApi(formData)
            if (res.message === 'success') {
                await callback()
                setPostBody('')
                removeImage()
            }
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <Card className="max-w-xxl w-[95%] sm:w-full mx-auto my-6 shadow-sm border border-slate-100 rounded-2xl overflow-hidden relative">
            <CardBody className="p-4">
                <form onSubmit={handleCreatePost} className="flex flex-col gap-4">
                    <div className="flex gap-3">
                        <Avatar
                            src={userData?.photo}
                            size="sm"
                            isBordered
                            color="primary"
                            className="shrink-0"
                        />
                        <Textarea
                            variant="flat"
                            placeholder="What's on your mind?"
                            value={postBody}
                            onChange={(e) => setPostBody(e.target.value)}
                            className="w-full"
                            minRows={3}
                            cacheMeasurements
                            classNames={{
                                input: "text-base",
                                inputWrapper: "bg-slate-50 hover:bg-slate-100 focus-within:bg-white transition-all",
                            }}
                        />
                    </div>

                    {imageUrl && (
                        <div className="relative rounded-xl overflow-hidden border border-slate-200">
                            <img src={imageUrl} className="w-full h-auto object-cover max-h-60" alt="Preview" />
                            <Button
                                isIconOnly
                                size="sm"
                                color="danger"
                                variant="solid"
                                className="absolute top-2 right-2 rounded-full shadow-lg z-10"
                                onClick={removeImage}
                            >
                                <X size={16} />
                            </Button>
                        </div>
                    )}
                    <Divider className="opacity-50" />
                    <div className="flex justify-between items-center">
                        <label className="flex items-center gap-2 cursor-pointer group">
                            <div className="p-2 rounded-full group-hover:bg-blue-50 transition-colors">
                                <ImageIcon size={22} className="text-blue-500" />
                            </div>
                            <span className="text-xs font-semibold text-slate-500 group-hover:text-blue-500 transition-colors">
                                Photo
                            </span>
                            <input type="file" onChange={handleImage} className="hidden" accept="image/*" />
                        </label>

                        <Button
                            type="submit"
                            color="primary"
                            size="sm"
                            className="font-bold px-6 rounded-lg shadow-md"
                            isLoading={loading}
                            endContent={!loading && <Send size={16} />}
                            disabled={!postBody.trim() && !image}
                        >
                            Post
                        </Button>
                    </div>
                </form>
            </CardBody>

            {loading && (
                <div className="absolute inset-0 bg-white/60 backdrop-blur-[1px] z-50 flex justify-center items-center">
                    <Spinner color="primary" label="Posting..." size="lg" />
                </div>
            )}
        </Card>
    )
}