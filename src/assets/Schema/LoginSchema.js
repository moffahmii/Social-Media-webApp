import * as zod from 'zod'


export const schema = zod.object({
    email: zod.string().email('Invalid email.'),
    password: zod.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, 'Weak Password'),
})
