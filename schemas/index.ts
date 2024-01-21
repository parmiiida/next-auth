import * as z from'zod';

export const LoginSchema = z.object({
    email:z.string().email({
        message : 'message is reqired'
    }),
    password: z.string().min(1 , {
        message: 'Password is required'
    })
})


export const RegisterSchema = z.object({
    email:z.string().email({
        message : 'message is reqired'
    }),
    password: z.string().min(6 , {
        message: 'Minimum 6 charactors required'
    }),
    name: z.string().min(6 , {
        message: 'Name is required'
    })

})