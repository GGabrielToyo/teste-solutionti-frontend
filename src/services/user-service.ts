import type { UpdateUserDto, UserDto } from "@/interfaces/user-interface"
import { api } from "@/lib/axios"
import Cookies from 'js-cookie'
import { TokenService } from "./token-service";

const USER_KEY = 'user'

const cookieOptions = {
    expires: 1,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict" as const,
};

export const UserService = {

    getUser: async () => {
        const response = await api.get("user/me")

        if (!response) {
            throw new Error("User not found")
        }

        const user: UserDto = response.data
        Cookies.set(USER_KEY, JSON.stringify(user), cookieOptions);

        return user
    },

    getUserById: async (id: string) => {
        const response = await api.get(`/user/${id}`)

        if (!response.data) {
            throw new Error("User not found")
        }
        const user: UserDto = response.data
        console.log("User fetched:", user)

        return response.data
    },

    update: async (user: UpdateUserDto) => {
        const response = await api.put(`/user/${user.id}`, user)

        if (!response.data) {
            throw new Error("Failed to update user")
        }

        const updatedUser: UserDto = response.data
        Cookies.set(USER_KEY, JSON.stringify(updatedUser), cookieOptions);

        return updatedUser
    },

    getUserByCookies: () => {
        const user = Cookies.get("user");
        return user ? JSON.parse(user) : null;
    },

    logout: () => {
        Cookies.remove(USER_KEY);
        TokenService.removeToken();
    }

}