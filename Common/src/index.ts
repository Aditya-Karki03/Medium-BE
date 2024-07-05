import zod, { z } from 'zod'


export const signUpSchema=zod.object({
    firstname:zod.string(),
    lastname:zod.string().optional(),
    email:zod.string().email({message:'Invalid Email address'}),
    password:zod.string().min(7,{message:'Minimum length should be 7 with special characters'})
})

export const signInSchema=zod.object({
    email:zod.string().email(),
    password:zod.string().min(7)
})

export const blogCreationSchema=zod.object({
    title:zod.string(),
    content:zod.string()
})

export const blogUpdationSchema=zod.object({
    title:zod.string(),
    content:zod.string(),
    id:zod.string()
})

export type SignUpSchema = zod.infer<typeof signUpSchema>
export type SignInSchema=zod.infer<typeof signInSchema>
export type BlogCreationSchema=zod.infer<typeof blogCreationSchema>
export type BlogUpdationSchema=zod.infer<typeof blogUpdationSchema>