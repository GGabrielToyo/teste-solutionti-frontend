import type { AuthDto, CreateUserDto } from "@/interfaces/user-interface"
import { api } from "@/lib/axios";

import { TokenService } from "./token-service";

export const AuthService = {

    async signin(data: AuthDto) {
        const response = await api.post("/auth/signin", data);

        const token = response.data.token;

        if (!token) {
            throw new Error("Token não recebido");
        }

        TokenService.setToken(token);

        return response.data;
    },

    async signup(data: CreateUserDto) {
        const response = await api.post("/auth/signup", data);

        if (!response.data) {
            throw new Error("Erro ao registrar usuário");
        }

        return response.data;
    },
}