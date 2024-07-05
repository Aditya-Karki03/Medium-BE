"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogUpdationSchema = exports.blogCreationSchema = exports.signInSchema = exports.signUpSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.signUpSchema = zod_1.default.object({
    firstname: zod_1.default.string(),
    lastname: zod_1.default.string().optional(),
    email: zod_1.default.string().email({ message: 'Invalid Email address' }),
    password: zod_1.default.string().min(7, { message: 'Minimum length should be 7 with special characters' })
});
exports.signInSchema = zod_1.default.object({
    email: zod_1.default.string().email(),
    password: zod_1.default.string().min(7)
});
exports.blogCreationSchema = zod_1.default.object({
    title: zod_1.default.string(),
    content: zod_1.default.string()
});
exports.blogUpdationSchema = zod_1.default.object({
    title: zod_1.default.string(),
    content: zod_1.default.string(),
    id: zod_1.default.string()
});
