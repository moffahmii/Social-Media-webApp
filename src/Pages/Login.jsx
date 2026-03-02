import React, { useContext, useState } from 'react';
import { Input, Button, Card, CardBody, CardHeader, Divider } from '@heroui/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from '../Services/AuthServices';
import { useNavigate, Link } from 'react-router-dom';
import { schema } from '../assets/Schema/LoginSchema';
import { AuthContext } from '../Context/AuthContext';
import { Mail, Lock, Eye, EyeOff, LogIn } from 'lucide-react';

export default function Login() {
    const [loading, setloading] = useState(false);
    const [apiError, setapiError] = useState(null);
    const [isVisible, setIsVisible] = useState(false);
    const { setIsLoggedIn } = useContext(AuthContext);
    const navigate = useNavigate();
    const toggleVisibility = () => setIsVisible(!isVisible);
    const { handleSubmit, register, formState: { errors, touchedFields } } = useForm({
        resolver: zodResolver(schema),
        mode: 'onTouched'
    });
    async function sendData(userData) {
        setloading(true);
        setapiError(null);
        const res = await signIn(userData);
        setloading(false);
        if (res?.message === 'success') {
            localStorage.setItem('token', res.token);
            setIsLoggedIn(res.token);
            navigate('/');
        } else {
            setapiError(res?.error || res?.message || "Invalid email or password");
        }
    }
    return <>
        <div className="min-h-screen w-full flex items-center justify-center bg-linear-to-br from-slate-50 to-blue-100 p-4">
            <Card className="max-w-md w-full shadow-xl bg-white/90 backdrop-blur-md border-none rounded-2xl">
                <CardHeader className="flex flex-col gap-1 items-center py-6">
                    <div className="bg-primary/10 p-3 rounded-full mb-2">
                        <LogIn className="text-primary" size={28} />
                    </div>
                    <h1 className="text-2xl font-bold text-slate-800">Welcome Back</h1>
                    <p className="text-small text-default-500">Log in to your account to continue</p>
                </CardHeader>
                <Divider />
                <CardBody className="py-6 px-8">
                    <form onSubmit={handleSubmit(sendData)} className="flex flex-col gap-5">
                        <Input
                            label="Email Address"
                            placeholder="Enter your email"
                            labelPlacement="outside"
                            startContent={<Mail size={18} className="text-default-400" />}
                            {...register('email')}
                            isInvalid={!!errors.email && touchedFields.email}
                            errorMessage={errors.email?.message}
                            autoComplete="email"
                            variant="bordered"
                        />
                        <Input
                            label="Password"
                            placeholder="Enter your password"
                            labelPlacement="outside"
                            startContent={<Lock size={18} className="text-default-400" />}
                            endContent={
                                <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                                    {isVisible ? (
                                        <EyeOff size={18} className="text-default-400" />
                                    ) : (
                                        <Eye size={18} className="text-default-400" />
                                    )}
                                </button>
                            }
                            type={isVisible ? "text" : "password"}
                            variant="bordered"
                            {...register('password')}
                            isInvalid={!!errors.password && touchedFields.password}
                            errorMessage={errors.password?.message}
                        />
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
                            Log In
                        </Button>
                        <div className="text-center text-small mt-1">
                            Don't have an account?{" "}
                            <Link to="/register" className="text-primary font-bold hover:underline">
                                Register now
                            </Link>
                        </div>
                    </form>
                </CardBody>
            </Card>
        </div>
    </>
}