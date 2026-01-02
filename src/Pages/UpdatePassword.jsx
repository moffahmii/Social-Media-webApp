import React, { useState, useContext } from "react";
import { Input, Button, Card, CardBody, CardHeader, Divider } from "@heroui/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { schema } from "../assets/Schema/UpdatePassword";
import { AuthContext } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Lock, ShieldCheck, KeyRound, Save } from "lucide-react";
export default function UpdatePassword() {
    const [loading, setLoading] = useState(false);
    const [apiError, setApiError] = useState(null);
    const [success, setSuccess] = useState(null);
    const { setIsLoggedIn } = useContext(AuthContext);
    const navigate = useNavigate();
    const { handleSubmit, register, formState: { errors, touchedFields } } = useForm({
        resolver: zodResolver(schema),
        mode: "onTouched"
    });
    async function sendData(data) {
        setLoading(true);
        setApiError(null);
        setSuccess(null);
        try {
            const token = localStorage.getItem("token");
            const res = await axios.patch(
                "https://linked-posts.routemisr.com/users/change-password",
                { password: data.password, newPassword: data.newPassword },
                { headers: { token } }
            );
            if (res.data?.message === "success") {
                setSuccess("Password updated successfully! Redirecting...");
                setTimeout(() => {
                    localStorage.removeItem("token");
                    setIsLoggedIn(false);
                    navigate("/login");
                }, 2000);
            }
        } catch (err) {
            setApiError(err.response?.data?.message || "Error updating password");
        } finally {
            setLoading(false);
        }
    }
    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-linear-to-br from-slate-50 to-blue-100 px-4">
            <Card className="max-w-md w-full shadow-xl bg-white/90 backdrop-blur-md border-none rounded-2xl">
                <CardHeader className="flex flex-col gap-1 items-center py-6">
                    <div className="bg-primary/10 p-3 rounded-full mb-2">
                        <ShieldCheck className="text-primary" size={28} />
                    </div>
                    <h1 className="text-2xl font-bold text-slate-800">Security Setting</h1>
                    <p className="text-small text-default-500">Update your password to stay safe</p>
                </CardHeader>
                <Divider />
                <CardBody className="py-6 px-8">
                    <form onSubmit={handleSubmit(sendData)} className="flex flex-col gap-5">
                        <Input
                            label="Current Password"
                            placeholder="Enter old password"
                            labelPlacement="outside"
                            type="password"
                            startContent={<KeyRound size={18} className="text-default-400" />}
                            {...register("password")}
                            isInvalid={!!errors.password && touchedFields.password}
                            errorMessage={errors.password?.message}
                            variant="bordered"
                        />
                        <Input
                            label="New Password"
                            placeholder="Enter new password"
                            labelPlacement="outside"
                            type="password"
                            startContent={<Lock size={18} className="text-default-400" />}
                            {...register("newPassword")}
                            isInvalid={!!errors.newPassword && touchedFields.newPassword}
                            errorMessage={errors.newPassword?.message}
                            variant="bordered"
                        />
                        <Input
                            label="Confirm New Password"
                            placeholder="Repeat new password"
                            labelPlacement="outside"
                            type="password"
                            startContent={<Lock size={18} className="text-default-400" />}
                            {...register("rePassword")}
                            isInvalid={!!errors.rePassword && touchedFields.rePassword}
                            errorMessage={errors.rePassword?.message}
                            variant="bordered"
                        />
                        {apiError && (
                            <div className="bg-red-50 border border-red-100 p-2 rounded-lg">
                                <p className="text-center text-red-500 text-xs font-bold">{apiError}</p>
                            </div>
                        )}
                        {success && (
                            <div className="bg-green-50 border border-green-100 p-2 rounded-lg">
                                <p className="text-center text-green-600 text-xs font-bold">{success}</p>
                            </div>
                        )}
                        <Button
                            isLoading={loading}
                            color="primary"
                            type="submit"
                            startContent={!loading && <Save size={18} />}
                            className="w-full font-bold shadow-md h-12 mt-2 rounded-xl"
                        >
                            Update Password
                        </Button>
                    </form>
                </CardBody>
            </Card>
        </div>
    );
}