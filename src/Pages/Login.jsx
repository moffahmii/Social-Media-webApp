import React, { useContext, useState } from 'react'
import { Input, Button, Select, SelectItem } from '@heroui/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from '../Services/AuthServices';
import { useNavigate } from 'react-router-dom';
import { schema } from '../assets/Schema/LoginSchema';
import { Link } from "react-router-dom";
import { AuthContext } from '../Context/AuthContext';

export default function Login() {

    const [loading, setloading] = useState(false)
    const [apiError, setapiError] = useState(null)
    const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext)
    const navigate = useNavigate();


    const { handleSubmit, register, formState: { errors, touchedFields } } = useForm({
        resolver: zodResolver(schema),
        mode: 'all'
    })

    async function sendData(userData) {
        setloading(true);
        setapiError(null);
        const res = await signIn(userData);
        setloading(false);
        if (res?.message === 'success') {
            localStorage.setItem('token', res.token)
            setIsLoggedIn(res.token)
            navigate('/')
        } else {
            setapiError(res?.error || res?.message || "Something went wrong");
        }
    }

    return <>

        <div className='bg-white rounded-2xl shadow-2xl py-10 px-6 min-w-md'>
            <h1 className='text-center text-2xl mb-4'>Login</h1>
            <form onSubmit={handleSubmit(sendData)} className='flex flex-col gap-4'>
                <Input
                    label="Email"
                    {...register('email')}
                    isInvalid={!!errors.email && touchedFields.email}
                    errorMessage={errors.email?.message} autoComplete="email"
                    variant='bordered'
                />
                <Input
                    label="Password"
                    type="password"
                    variant='bordered'
                    {...register('password')}
                    isInvalid={!!errors.password && touchedFields.password}
                    errorMessage={errors.password?.message}
                />
                <Button isLoading={loading} color="primary" type='submit'>Login</Button>
                {apiError && <span className='text-center text-red-500 font-bold'>{apiError}</span>}
                <div className='text-center'>Don't have account? <Link to="/register" className='text-blue-600 '>Register</Link> </div>
            </form>
        </div>
    </>
}
