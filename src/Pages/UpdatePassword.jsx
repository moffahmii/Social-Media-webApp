import React, { useState, useContext } from "react";
import { Input, Button } from "@heroui/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { schema } from "../assets/Schema/UpdatePassword";
import { AuthContext } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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
                {
                    password: data.password,
                    newPassword: data.newPassword
                },
                { headers: { token } }
            );

            if (res.data?.message === "success") {
                setSuccess("Password updated successfully! Logging out...");
                setTimeout(() => {
                    localStorage.removeItem("token");
                    setIsLoggedIn(false);
                    navigate("/login");
                }, 2000);
            }
        } catch (err) {
            const errorMsg = err.response?.data?.message || "Invalid old password or connection error";
            setApiError(errorMsg);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="bg-white rounded-2xl shadow-2xl py-10 px-6 max-w-md mx-auto mt-10">
            <h1 className="text-center text-2xl font-bold mb-6">Change Password</h1>

            <form onSubmit={handleSubmit(sendData)} className="flex flex-col gap-4">

                <Input
                    label="Old Password"
                    type="password"
                    {...register("password")}
                    isInvalid={!!errors.password}
                    errorMessage={errors.password?.message}
                    variant="bordered"
                />

                <Input
                    label="New Password"
                    type="password"
                    {...register("newPassword")}
                    isInvalid={!!errors.newPassword}
                    errorMessage={errors.newPassword?.message}
                    variant="bordered"
                />

                <Input
                    label="Confirm New Password"
                    type="password"
                    {...register("rePassword")}
                    isInvalid={!!errors.rePassword}
                    errorMessage={errors.rePassword?.message}
                    variant="bordered"
                />

                {apiError && (
                    <div className="bg-red-50 p-3 rounded-lg">
                        <p className="text-red-500 text-sm font-medium text-center">{apiError}</p>
                    </div>
                )}

                {success && (
                    <div className="bg-green-50 p-3 rounded-lg">
                        <p className="text-green-600 text-sm font-medium text-center">{success}</p>
                    </div>
                )}

                <Button
                    type="submit"
                    isLoading={loading}
                    color="primary"
                    className="mt-2 font-bold"
                >
                    Update Password
                </Button>

            </form>
        </div>
    );
}