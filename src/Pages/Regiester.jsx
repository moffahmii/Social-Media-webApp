import React, { useState } from 'react'
import { Input, Button, Select, SelectItem } from '@heroui/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signUp } from '../Services/AuthServices';
import { useNavigate } from 'react-router-dom';
import { schema } from '../assets/Schema/RegisterSchema';
import { Link } from "react-router-dom";



export default function Register() {
    const navigate = useNavigate();
    const [loading, setloading] = useState(false)
    const [apiError, setapiError] = useState(null)

    const { handleSubmit, register, formState: { errors, touchedFields } } = useForm({
        resolver: zodResolver(schema),
        mode: 'all'
    });

    async function sendData(userData) {
        setloading(true);
        setapiError(null);
        const res = await signUp(userData);
        setloading(false);

        if (res?.message === 'success') {
            console.log("Success Registration");
            navigate('/login')
        } else {
            setapiError(res?.error || res?.message || "Something went wrong");
        }
    }

    return (
        <div className='bg-white rounded-2xl shadow-2xl py-10 px-6 min-w-md'>
            <h1 className='text-center text-2xl mb-4'>Register Now</h1>
            <form onSubmit={handleSubmit(sendData)} className='flex flex-col gap-4'>

                <Input
                    label="Name"
                    autoComplete="username"
                    {...register('name')}
                    isInvalid={!!errors.name && touchedFields.name}
                    errorMessage={errors.name?.message}
                    variant='bordered'
                />

                <Input
                    label="Email"
                    autoComplete="email"
                    {...register('email')}
                    isInvalid={!!errors.email && touchedFields.email}
                    errorMessage={errors.email?.message}
                    variant='bordered'
                />

                <Input
                    label="Password"
                    type="password"
                    autoComplete="new-password"
                    {...register('password')}
                    isInvalid={!!errors.password && touchedFields.password}
                    errorMessage={errors.password?.message}
                    variant='bordered'
                />

                <Input
                    label="Repassword"
                    type="password"
                    autoComplete="new-password"
                    {...register('rePassword')}
                    isInvalid={!!errors.rePassword && touchedFields.rePassword}
                    errorMessage={errors.rePassword?.message}
                    variant='bordered'
                />

                <div className="flex gap-3">
                    <Input
                        label="Date Of Birth"
                        type="date"
                        {...register('dateOfBirth')}
                        isInvalid={!!errors.dateOfBirth && touchedFields.dateOfBirth}
                        errorMessage={errors.dateOfBirth?.message}
                        variant='bordered'
                    />

                    <Select
                        variant='bordered'
                        {...register('gender')}
                        isInvalid={!!errors.gender && touchedFields.gender}
                        errorMessage={errors.gender?.message}
                        label='Select Your Gender'
                    >
                        <SelectItem key='male' value='male'>Male</SelectItem>
                        <SelectItem key='female' value='female'>Female</SelectItem>
                    </Select>
                </div>

                <Button isLoading={loading} color="primary" type='submit'>Register</Button>
                <div className='text-blue-600 text-center'>Already have account? <Link to="/login">Login</Link> </div>
                {apiError && <span className='text-center text-red-500 font-bold'>{apiError}</span>}
            </form>
        </div>
    );
}