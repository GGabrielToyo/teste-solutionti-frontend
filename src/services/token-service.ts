import Cookies from 'js-cookie'

const TOKEN_KEY = 'auth_token'
const cookieOptions = {
    expires: 1,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict" as const,
};

export const TokenService = {
    setToken(token: string) {
        Cookies.set("TOKEN_KEY", token, cookieOptions);
    },

    getToken(): string | undefined {
        return Cookies.get(TOKEN_KEY)
    },

    removeToken() {
        Cookies.remove(TOKEN_KEY)
    },

    isAuthenticated(): boolean {
        const token = this.getToken()
        if (!token) return false

        try {
            const payload = JSON.parse(atob(token.split('.')[1]))
            return payload.exp * 1000 > Date.now()
        } catch {
            return false
        }
    },

}