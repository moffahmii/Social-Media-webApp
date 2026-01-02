import React, { useState } from 'react';
import { Input, Button, Select, SelectItem, Card, CardBody, CardHeader, Divider } from '@heroui/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signUp } from '../Services/AuthServices';
import { useNavigate, Link } from 'react-router-dom';
import { schema } from '../assets/Schema/RegisterSchema';
import { User, Mail, Lock, Eye, EyeOff, Calendar, UserPlus, Users } from 'lucide-react';

export default function Register() {
    const navigate = useNavigate();
    const [loading, setloading] = useState(false);
    const [apiError, setapiError] = useState(null);
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => setIsVisible(!isVisible);

    const { handleSubmit, register, formState: { errors, touchedFields } } = useForm({
        resolver: zodResolver(schema),
        mode: 'onTouched'
    });

    async function sendData(userData) {
        setloading(true);
        setapiError(null);
        const res = await signUp(userData);
        setloading(false);

        if (res?.message === 'success') {
            navigate('/login');
        } else {
            setapiError(res?.error || res?.message || "Something went wrong");
        }
    }

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-linear-to-br from-slate-50 to-blue-100 p-4">

            <Card className="max-w-md w-full shadow-xl bg-white/90 backdrop-blur-md border-none rounded-2xl">
                <CardHeader className="flex flex-col gap-1 items-center py-6">
                    <div className="bg-primary/10 p-3 rounded-full mb-2">
                        <UserPlus className="text-primary" size={28} />
                    </div>
                    <h1 className="text-2xl font-bold text-slate-800">Create Account</h1>
                    <p className="text-small text-default-500">Join our community today</p>
                </CardHeader>

                <Divider />

                <CardBody className="py-6 px-8">
                    <form onSubmit={handleSubmit(sendData)} className="flex flex-col gap-5">

                        <Input
                            label="Full Name"
                            placeholder="John Doe"
                            labelPlacement="outside"
                            startContent={<User size={18} className="text-default-400" />}
                            {...register('name')}
                            isInvalid={!!errors.name && touchedFields.name}
                            errorMessage={errors.name?.message}
                            variant="bordered"
                        />

                        <Input
                            label="Email Address"
                            placeholder="example@mail.com"
                            labelPlacement="outside"
                            startContent={<Mail size={18} className="text-default-400" />}
                            {...register('email')}
                            isInvalid={!!errors.email && touchedFields.email}
                            errorMessage={errors.email?.message}
                            variant="bordered"
                        />

                        <Input
                            label="Password"
                            placeholder="••••••••"
                            labelPlacement="outside"
                            type={isVisible ? "text" : "password"}
                            startContent={<Lock size={18} className="text-default-400" />}
                            endContent={
                                <button type="button" onClick={toggleVisibility} className="focus:outline-none">
                                    {isVisible ? <EyeOff size={18} className="text-default-400" /> : <Eye size={18} className="text-default-400" />}
                                </button>
                            }
                            variant="bordered"
                            {...register('password')}
                            isInvalid={!!errors.password && touchedFields.password}
                            errorMessage={errors.password?.message}
                        />

                        <Input
                            label="Confirm Password"
                            placeholder="••••••••"
                            labelPlacement="outside"
                            type={isVisible ? "text" : "password"}
                            startContent={<Lock size={18} className="text-default-400" />}
                            variant="bordered"
                            {...register('rePassword')}
                            isInvalid={!!errors.rePassword && touchedFields.rePassword}
                            errorMessage={errors.rePassword?.message}
                        />

                        <div className="grid grid-cols-2 gap-3">
                            <Input
                                label="Birth Date"
                                type="date"
                                labelPlacement="outside"
                                {...register('dateOfBirth')}
                                isInvalid={!!errors.dateOfBirth && touchedFields.dateOfBirth}
                                errorMessage={errors.dateOfBirth?.message}
                                variant="bordered"
                            />

                            <Select
                                variant="bordered"
                                label="Gender"
                                labelPlacement="outside"
                                placeholder="Select"
                                {...register('gender')}
                                isInvalid={!!errors.gender && touchedFields.gender}
                                errorMessage={errors.gender?.message}
                            >
                                <SelectItem key="male" value="male" textValue="Male">Male</SelectItem>
                                <SelectItem key="female" value="female" textValue="Female">Female</SelectItem>
                            </Select>
                        </div>

                        {apiError && (
                            <div className="bg-red-50 border border-red-100 p-2 rounded-lg">
                                <p className="text-center text-red-500 text-xs font-bold">{apiError}</p>
                            </div>
                        )}

                        <Button
                            isLoading={loading}
                            color="primary"
                            type="submit"
                            className="w-full font-bold shadow-md h-12 mt-2 rounded-xl"
                        >
                            Create Account
                        </Button>

                        <div className="text-center text-small mt-1">
                            Already have an account?{" "}
                            <Link to="/login" className="text-primary font-bold hover:underline">
                                Login here
                            </Link>
                        </div>
                    </form>
                </CardBody>
            </Card>
        </div>
    );
}