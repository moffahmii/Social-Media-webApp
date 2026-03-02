import axios from "axios";

export async function signUp(userData) {
    try {
        let { data } = await axios.post('/api/users/signup', userData);
        return data;
    } catch (err) {
        return err.response?.data || { message: 'error', error: 'Something went wrong' };
    }
}

export async function signIn(userData) {
    try {
        let { data } = await axios.post('/api/users/signin', userData);
        return data;
    } catch (err) {
        return err.response?.data || { message: 'error', error: 'Something went wrong' };
    }
}

export async function getUserDataApi() {
    try {
        const { data } = await axios.get('/api/users/profile-data', {
            headers: {
                token: localStorage.getItem('token')
            }
        });
        return data;
    } catch (err) {
        console.log(err);
    }
}

export async function changePassword(data) {
    try {
        const res = await axios.patch(
            "/api/users/change-password",
            { password: data.password, newPassword: data.newPassword },
            { headers: { token: localStorage.getItem("token") } }
        );
        return res.data;
    } catch (err) {
        return err.response?.data;
    }
}