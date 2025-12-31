import axios from "axios"

export async function getUserDataApi() {

    try {
        const { data } = await axios.get('https://linked-posts.routemisr.com/users/profile-data', {
            headers: {
                token: localStorage.getItem('token')
            }
        })
        return data
    }
    catch (err) {
        console.log(err)
    }
}
export async function getUserPostsApi(userId) {
    try {
        const { data } = await axios.get(`https://linked-posts.routemisr.com/users/${userId}/posts`, {
            headers: {
                token: localStorage.getItem('token')
            }
        });
        console.log(data)
        return data;
    } catch (err) {
        console.error("API Error Details:", err.response?.data);
        throw err;
    }
}

export async function deletePostApi(postId) {
    try {
        const { data } = await axios.delete(
            `https://linked-posts.routemisr.com/posts/${postId}`,
            {
                headers: {
                    token: localStorage.getItem('token')
                }
            }
        );
        return data;
    } catch (err) {
        console.error("Error deleting post:", err.response?.data || err);
        return null;
    }
}

export async function updatePostApi(postId, updatedContent) {
    try {
        const { data } = await axios.put(
            `https://linked-posts.routemisr.com/posts/${postId}`,
            { body: updatedContent },
            {
                headers: {
                    token: localStorage.getItem('token')
                }
            }
        );
        return data;
    } catch (err) {
        console.error("Error updating post:", err.response?.data || err);
        return null;
    }
}


export async function uploadUserPhotoApi(photoFile) {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("User is not logged in");

    try {
        const formData = new FormData();
        formData.append("photo", photoFile);

        const { data } = await axios.put(
            "https://linked-posts.routemisr.com/users/upload-photo",
            formData,
            {
                headers: {
                    token: localStorage.getItem('token')
                }
            }
        );

        return data;
    } catch (err) {
        console.log("Upload Error:", err.response?.data || err.message);
        throw err;
    }
}
