import type { AuthDto, CreateUserDto } from "@/interfaces/user-interface"

import { TokenService } from "./token-service";

const API_URL = import.meta.env.VITE_API_URL;

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

        TokenService.setToken(token);
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