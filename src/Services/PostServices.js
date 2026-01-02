import axios from "axios";

export async function getAllPosts() {
    try {
        const { data } = await axios.get('https://linked-posts.routemisr.com/posts', {
            headers: {
                token: localStorage.getItem('token')
            }, params: {
                sort: '-createdAt'
            }
        })
        return data
    }
    catch (err) {
        console.log(err)
    }

}
export async function getSinglePost(postId) {
    try {
        const { data } = await axios.get('https://linked-posts.routemisr.com/posts/' + postId, {
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
export async function createPostApi(formData) {
    try {
        const { data } = await axios.post('https://linked-posts.routemisr.com/posts', formData, {
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

export async function getPostCommentsApi(postId) {
    try {
        const { data } = await axios.get('https://linked-posts.routemisr.com/posts/' + postId + '/comments', {
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