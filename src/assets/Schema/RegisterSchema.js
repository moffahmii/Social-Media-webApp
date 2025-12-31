import * as zod from 'zod'


export const schema = zod.object({

    name: zod.string().min(3, 'At least 3 chars').max(20, 'Name at most 20'),
    email: zod.string().email('Invalid email.'),

    password: zod.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, 'Weak Password'),
    rePassword: zod.string().nonempty('Repassword Is Required'),

    dateOfBirth: zod.string().nonempty('DOB is required').refine((dateStr) => {
        const birthDate = new Date(dateStr);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        return age >= 18;
    }, 'Must be older than 18'),

    gender: zod.string().nonempty('Gender Is Required')

}).refine((data) => data.password === data.rePassword, { path: ['rePassword'], message: 'Passwords do not match' });
