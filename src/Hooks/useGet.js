import axios from "axios";
import { useEffect, useState } from "react";

export default function useGet(apiUrl) {
    const [posts, setpPosts] = useState([])
    try {
        async function getData(apiUrl) {
            const { data } = await axios.get(apiUrl)
            setpPosts(data.data)
        }
    }
    catch (err) {
        console.log(err)
    }
    useEffect(() => {
        getData(apiUrl)
    })
    return posts;
}