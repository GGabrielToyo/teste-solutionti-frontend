import type { AuthDto, CreateUserDto } from "@/interfaces/user-interface"
import Cookies from "js-cookie";

const API_URL = import.meta.env.VITE_API_URL;

const cookieOptions = {
    expires: 1,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict" as const,
};

export const AuthService = {
    async signin(data: AuthDto) {
        const response = await fetch(`${API_URL}/auth/signin`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })

        if (!response.ok) {
            throw new Error("Erro ao fazer login")
        }

        const token: string = (await response.json()).token;

        Cookies.set("token", token, cookieOptions);
        return await response.json()
    },

    async signup(data: CreateUserDto) {
        const response = await fetch(`${API_URL}/auth/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })

        if (!response.ok) {
            throw new Error("Erro ao registrar usuário")
        }

        return await response.json()
    },
}