export interface AuthDto {
    email: string,
    password: string
}

export interface CreateUserDto {
    name: string,
    email: string,
    cpf: string,
    password: string,
    passwordConfirmation: string
}

export interface UserDto {
    id: string,
    name: string,
    cpf: string,
    role: string,
    createdAt: Date
}