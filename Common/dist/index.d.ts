import zod from 'zod';
export declare const signUpSchema: zod.ZodObject<{
    firstname: zod.ZodString;
    lastname: zod.ZodOptional<zod.ZodString>;
    email: zod.ZodString;
    password: zod.ZodString;
}, "strip", zod.ZodTypeAny, {
    firstname: string;
    email: string;
    password: string;
    lastname?: string | undefined;
}, {
    firstname: string;
    email: string;
    password: string;
    lastname?: string | undefined;
}>;
export declare const signInSchema: zod.ZodObject<{
    email: zod.ZodString;
    password: zod.ZodString;
}, "strip", zod.ZodTypeAny, {
    email: string;
    password: string;
}, {
    email: string;
    password: string;
}>;
export declare const blogCreationSchema: zod.ZodObject<{
    title: zod.ZodString;
    content: zod.ZodString;
}, "strip", zod.ZodTypeAny, {
    title: string;
    content: string;
}, {
    title: string;
    content: string;
}>;
export declare const blogUpdationSchema: zod.ZodObject<{
    title: zod.ZodString;
    content: zod.ZodString;
    id: zod.ZodString;
}, "strip", zod.ZodTypeAny, {
    title: string;
    content: string;
    id: string;
}, {
    title: string;
    content: string;
    id: string;
}>;
export type SignUpSchema = zod.infer<typeof signUpSchema>;
export type SignInSchema = zod.infer<typeof signInSchema>;
export type BlogCreationSchema = zod.infer<typeof blogCreationSchema>;
export type BlogUpdationSchema = zod.infer<typeof blogUpdationSchema>;
