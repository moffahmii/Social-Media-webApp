import * as zod from "zod";

export const schema = zod.object({
    password: zod
        .string()
        .min(1, "Old password is required"),

    newPassword: zod
        .string()
        .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            "Password must be 8+ chars, include upper, lower, number and special char"
        ),

    rePassword: zod
        .string()
        .min(1, "Confirm password is required"),
}).refine(
    (data) => data.newPassword === data.rePassword,
    {
        path: ["rePassword"],
        message: "Passwords do not match",
    }
);