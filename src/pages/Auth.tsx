import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useDocumentTitle } from "@/hooks/use-document-title";
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import type { AuthDto, CreateUserDto } from "@/interfaces/user-interface";
import { AuthService } from "@/services/auth-service";
import { useNavigate } from 'react-router-dom'
import { useAuth } from "@/hooks/use-auth";
import { useState } from "react";
import { UserService } from "@/services/user-service";

const signinSchema = z.object({
    email: z
        .string()
        .min(1, "Email é obrigatório")
        .email("Email inválido"),
    password: z
        .string()
        .min(1, "Senha é obrigatória")
        .min(6, "Senha deve ter pelo menos 6 caracteres")
})
type SigninForm = z.infer<typeof signinSchema>

const signupSchema = z.object({
    name: z
        .string()
        .min(1, "Nome é obrigatório")
        .min(2, "Nome deve ter pelo menos 2 caracteres"),
    email: z
        .string()
        .min(1, "Email é obrigatório")
        .email("Email inválido"),
    cpf: z
        .string()
        .min(1, "CPF é obrigatório")
        .regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, "CPF deve estar no formato XXX.XXX.XXX-XX"),
    password: z
        .string()
        .min(1, "Senha é obrigatória")
        .min(6, "Senha deve ter pelo menos 6 caracteres"),
    confirmPassword: z
        .string()
        .min(1, "Confirmação de senha é obrigatória")
}).refine((data) => data.password === data.confirmPassword, {
    message: "Senhas não coincidem",
    path: ["confirmPassword"]
})

type SignupForm = z.infer<typeof signupSchema>


export default function Auth() {
    useDocumentTitle("App - Auth")
    const navigate = useNavigate()
    const { login } = useAuth()
    const [activeTab, setActiveTab] = useState("signin")

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors, isSubmitting, isValid }
    } = useForm<SigninForm>({
        resolver: zodResolver(signinSchema),
        mode: "onChange",
        defaultValues: {
            email: "",
            password: ""
        }
    })

    const {
        register: registerSignup,
        handleSubmit: handleSubmitSignup,
        reset: resetSignup,
        formState: { errors: errorsSignup, isSubmitting: isSubmittingSignup, isValid: isValidSignup }
    } = useForm<SignupForm>({
        resolver: zodResolver(signupSchema),
        mode: "onChange",
        defaultValues: {
            name: "",
            email: "",
            cpf: "",
            password: "",
            confirmPassword: ""
        }
    })

    const onSubmit = async (data: SigninForm) => {
        try {
            const authDto: AuthDto = {
                email: data.email,
                password: data.password
            }

            const response = await AuthService.signin(authDto)
            login(response.data.token)
            UserService.getUser()
            navigate('/')
            reset()
        } catch (error) {
            console.error("Erro no login:", error)
        }
    }

    const onSubmitSignup = async (data: SignupForm) => {
        try {
            const signupDto: CreateUserDto = {
                name: data.name,
                email: data.email,
                cpf: data.cpf,
                password: data.password,
                passwordConfirmation: data.confirmPassword
            }

            await AuthService.signup(signupDto)
            resetSignup()
            setActiveTab("signin")
            setValue("email", signupDto.email)
            setTimeout(() => {
                document.getElementById("password")?.focus()
            }, 100)
        } catch (error) {
            console.error("Erro no cadastro:", error)
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen p-4 bg-background text-foreground">
            <div className="flex w-full max-w-lg flex-col">
                <div className="text-center mb-6">
                    <h1 className="text-3xl font-bold mb-2 text-foreground">Sistema de Endereços</h1>
                    <p className="text-muted-foreground">Gerencie seus endereços de forma simples e eficiente.</p>
                </div>
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="signin">Entrar</TabsTrigger>
                        <TabsTrigger value="signup">Cadastrar</TabsTrigger>
                    </TabsList>
                    <TabsContent value="signin">
                        <Card>
                            <CardHeader>
                                <CardTitle>Entrar</CardTitle>
                                <CardDescription>
                                    Entre com seus dados de acesso para continuar.
                                </CardDescription>
                            </CardHeader>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <CardContent className="grid gap-6">
                                    <div className="grid gap-3">
                                        <Label htmlFor="email">Email</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="Entre com seu email"
                                            {...register("email")}
                                            className={errors.email ? "border-red-500" : ""}
                                        />
                                        {errors.email && (
                                            <span className="text-red-500 text-sm text-left">{errors.email.message}</span>
                                        )}
                                    </div>

                                    <div className="grid gap-3">
                                        <Label htmlFor="password">Senha</Label>
                                        <Input
                                            id="password"
                                            type="password"
                                            placeholder="Entre com sua senha"
                                            {...register("password")}
                                            className={errors.password ? "border-red-500" : ""}
                                        />
                                        {errors.password && (
                                            <span className="text-red-500 text-sm text-left">{errors.password.message}</span>
                                        )}
                                    </div>
                                </CardContent>

                                <CardFooter>
                                    <Button type="submit" disabled={isSubmitting || !isValid}>
                                        {isSubmitting ? "Entrando..." : "Entrar"}
                                    </Button>
                                </CardFooter>
                            </form>
                        </Card>
                    </TabsContent>

                    <TabsContent value="signup">
                        <Card>
                            <CardHeader>
                                <CardTitle>Cadastrar</CardTitle>
                                <CardDescription>
                                    Cadastre-se para acessar o sistema.
                                </CardDescription>
                            </CardHeader>
                            <form onSubmit={handleSubmitSignup(onSubmitSignup)}>
                                <CardContent className="grid gap-6">
                                    <div className="grid gap-3">
                                        <Label htmlFor="name">Nome</Label>
                                        <Input
                                            id="name"
                                            type="text"
                                            placeholder="Digite seu nome completo"
                                            {...registerSignup("name")}
                                            className={errorsSignup.name ? "border-red-500" : ""}
                                        />
                                        {errorsSignup.name && (
                                            <span className="text-red-500 text-sm text-left">{errorsSignup.name.message}</span>
                                        )}
                                    </div>

                                    <div className="grid gap-3">
                                        <Label htmlFor="signup-email">Email</Label>
                                        <Input
                                            id="signup-email"
                                            type="email"
                                            placeholder="Digite seu email"
                                            {...registerSignup("email")}
                                            className={errorsSignup.email ? "border-red-500" : ""}
                                        />
                                        {errorsSignup.email && (
                                            <span className="text-red-500 text-sm text-left">{errorsSignup.email.message}</span>
                                        )}
                                    </div>

                                    <div className="grid gap-3">
                                        <Label htmlFor="cpf">CPF</Label>
                                        <Input
                                            id="cpf"
                                            type="text"
                                            placeholder="000.000.000-00"
                                            {...registerSignup("cpf")}
                                            className={errorsSignup.cpf ? "border-red-500" : ""}
                                        />
                                        {errorsSignup.cpf && (
                                            <span className="text-red-500 text-sm text-left">{errorsSignup.cpf.message}</span>
                                        )}
                                    </div>

                                    <div className="grid gap-3">
                                        <Label htmlFor="signup-password">Senha</Label>
                                        <Input
                                            id="signup-password"
                                            type="password"
                                            placeholder="Digite sua senha"
                                            {...registerSignup("password")}
                                            className={errorsSignup.password ? "border-red-500" : ""}
                                        />
                                        {errorsSignup.password && (
                                            <span className="text-red-500 text-sm text-left">{errorsSignup.password.message}</span>
                                        )}
                                    </div>

                                    <div className="grid gap-3">
                                        <Label htmlFor="confirm-password">Confirmar Senha</Label>
                                        <Input
                                            id="confirm-password"
                                            type="password"
                                            placeholder="Confirme sua senha"
                                            {...registerSignup("confirmPassword")}
                                            className={errorsSignup.confirmPassword ? "border-red-500" : ""}
                                        />
                                        {errorsSignup.confirmPassword && (
                                            <span className="text-red-500 text-sm text-left">{errorsSignup.confirmPassword.message}</span>
                                        )}
                                    </div>
                                </CardContent>

                                <CardFooter>
                                    <Button type="submit" disabled={isSubmittingSignup || !isValidSignup}>
                                        {isSubmittingSignup ? "Cadastrando..." : "Cadastrar"}
                                    </Button>
                                </CardFooter>
                            </form>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}