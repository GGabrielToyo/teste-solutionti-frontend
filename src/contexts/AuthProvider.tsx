import { useEffect, useState } from "react"
import { AuthContext } from "./AuthContext"
import { TokenService } from "@/services/token-service"

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        const token = TokenService.getToken()
        return !!token
    })

    useEffect(() => {
        const token = TokenService.getToken()
        setIsAuthenticated(!!token)
    }, [])

    const login = (token: string) => {
        TokenService.setToken(token)
        setIsAuthenticated(true)
    }

    const logout = () => {
        TokenService.removeToken()
        setIsAuthenticated(false)
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}
