import { useState, useEffect, useCallback } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useDocumentTitle } from "@/hooks/use-document-title"
import { UserService } from "@/services/user-service"
import type { UpdateUserDto, UserDto } from "@/interfaces/user-interface"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Eye, EyeOff, Loader2 } from "lucide-react"
import { RolePipe } from "@/utils/pipes/role-pipe"

const profileSchema = z.object({
    name: z.string().min(1, "Nome é obrigatório"),
    email: z.string().email("Email inválido"),
    cpf: z.string().min(11, "CPF deve ter 11 dígitos").optional(),
    password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres").or(z.literal("")),
    passwordConfirmation: z.string().min(6, "Confirmação de senha deve ter pelo menos 6 caracteres").or(z.literal(""))
})

type ProfileFormData = z.infer<typeof profileSchema>

export default function Profile() {
    useDocumentTitle("App - Profile")

    const [user, setUser] = useState<UserDto | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitError, setSubmitError] = useState<string | null>(null)
    const [successMessage, setSuccessMessage] = useState<string | null>(null)
    const [showPassword, setShowPassword] = useState(false)
    const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false)

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        watch,
    } = useForm<ProfileFormData>({
        resolver: zodResolver(profileSchema)
    })

    const password = watch("password")

    const fetchUserData = useCallback(async () => {
        try {
            setLoading(true)
            setError(null)

            const userData = await UserService.getUser()

            if (userData) {
                setUser(userData)
                setValue('name', userData.name || '')
                setValue('email', userData.email || '')
                setValue('cpf', userData.cpf || '')
                setValue('password', '')
                setValue('passwordConfirmation', '')
            } else {
                setError("Usuário não encontrado")
            }
        } catch (err) {
            console.error("Erro ao buscar dados do usuário:", err)
            setError("Erro ao carregar dados do usuário")
        } finally {
            setLoading(false)
        }
    }, [setValue])

    useEffect(() => {
        fetchUserData()
    }, [fetchUserData])

    const onSubmitProfile = async (data: ProfileFormData) => {
        try {
            setIsSubmitting(true)
            setSubmitError(null)
            setSuccessMessage(null)

            const updateUser: UpdateUserDto = {
                id: user?.id || "",
                name: data.name,
                email: data.email,
                cpf: data.cpf,
                ...(data.password && data.password.length > 0 && {
                    password: data.password,
                    passwordConfirmation: data.passwordConfirmation
                })
            }
            await UserService.update(updateUser)

            setSuccessMessage("Perfil atualizado com sucesso!")

            setValue('password', '')
            setValue('passwordConfirmation', '')

            await fetchUserData()
        } catch (error) {
            console.error("Erro ao atualizar perfil:", error)
            setSubmitError(error instanceof Error ? error.message : 'Erro ao atualizar perfil')
        } finally {
            setIsSubmitting(false)
        }
    }

    const formatDate = (dateValue: string | Date | undefined) => {
        if (!dateValue) return 'Data não disponível'
        const date = dateValue instanceof Date ? dateValue : new Date(dateValue)
        return date.toLocaleDateString('pt-BR')
    }

    return (
        <div className="container mx-auto py-10">
            <div className="text-center mb-6">
                <h1 className="text-3xl font-bold mb-2">Seus Dados</h1>
                <p className="text-xl">Gerencie seus dados de forma simples e eficiente.</p>
                <div className="border-t border-gray-200 dark:border-gray-700 my-4 mx-auto w-1/2"></div>
                <p className="text-muted-foreground">Suas permissões no sistema são de {RolePipe(user?.role)}</p>
                <p className="text-muted-foreground">Sua conta foi criada em: {formatDate(user?.createdAt)}</p>
            </div>

            {loading && (
                <div className="max-w-2xl mx-auto space-y-6">
                    <Card className="border-none">
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-[80px]" />
                                <Skeleton className="h-10 w-full" />
                            </div>
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-[80px]" />
                                <Skeleton className="h-10 w-full" />
                            </div>
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-[80px]" />
                                <Skeleton className="h-10 w-full" />
                            </div>
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-[80px]" />
                                <Skeleton className="h-10 w-full" />
                            </div>
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-[80px]" />
                                <Skeleton className="h-10 w-full" />
                            </div>
                            <Skeleton className="h-10 w-full" />
                        </CardContent>
                    </Card>
                </div>
            )}

            {error && (
                <div className="max-w-2xl mx-auto">
                    <Alert variant="destructive">
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                </div>
            )}

            {!loading && !error && user && (
                <div className="max-w-2xl mx-auto">
                    <Card className="border-none">
                        <CardContent>
                            <form onSubmit={handleSubmit(onSubmitProfile)} className="space-y-4">
                                {/* Nome */}
                                <div className="space-y-2">
                                    <Label htmlFor="name">Nome *</Label>
                                    <Input
                                        id="name"
                                        placeholder="Seu nome completo"
                                        {...register("name")}
                                    />
                                    {errors.name && (
                                        <p className="text-sm text-red-500">{errors.name.message}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="email">Email *</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="seu@email.com"
                                        {...register("email")}
                                    />
                                    {errors.email && (
                                        <p className="text-sm text-red-500">{errors.email.message}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="cpf">CPF</Label>
                                    <Input
                                        id="cpf"
                                        placeholder="000.000.000-00"
                                        maxLength={14}
                                        {...register("cpf")}
                                    />
                                    {errors.cpf && (
                                        <p className="text-sm text-red-500">{errors.cpf.message}</p>
                                    )}
                                </div>

                                <div className="border-t pt-4">
                                    <h3 className="text-lg font-medium mb-4">Alterar Senha (Opcional)</h3>

                                    <div className="space-y-2">
                                        <Label htmlFor="password">Nova Senha</Label>
                                        <div className="relative">
                                            <Input
                                                id="password"
                                                type={showPassword ? "text" : "password"}
                                                placeholder="Deixe em branco para manter a atual"
                                                {...register("password")}
                                            />
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="sm"
                                                className="absolute right-0 top-0 h-full px-3"
                                                onClick={() => setShowPassword(!showPassword)}
                                            >
                                                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                            </Button>
                                        </div>
                                        {errors.password && (
                                            <p className="text-sm text-red-500">{errors.password.message}</p>
                                        )}
                                    </div>

                                    {password && password.length > 0 && (
                                        <div className="space-y-2 mt-4">
                                            <Label htmlFor="passwordConfirmation">Confirmar Nova Senha</Label>
                                            <div className="relative">
                                                <Input
                                                    id="passwordConfirmation"
                                                    type={showPasswordConfirmation ? "text" : "password"}
                                                    placeholder="Confirme a nova senha"
                                                    {...register("passwordConfirmation")}
                                                />
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    size="sm"
                                                    className="absolute right-0 top-0 h-full px-3"
                                                    onClick={() => setShowPasswordConfirmation(!showPasswordConfirmation)}
                                                >
                                                    {showPasswordConfirmation ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                                </Button>
                                            </div>
                                            {errors.passwordConfirmation && (
                                                <p className="text-sm text-red-500">{errors.passwordConfirmation.message}</p>
                                            )}
                                        </div>
                                    )}
                                </div>

                                {submitError && (
                                    <Alert variant="destructive">
                                        <AlertDescription>{submitError}</AlertDescription>
                                    </Alert>
                                )}

                                {successMessage && (
                                    <Alert>
                                        <AlertDescription className="text-green-600">
                                            {successMessage}
                                        </AlertDescription>
                                    </Alert>
                                )}

                                <Button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full"
                                >
                                    {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                    {isSubmitting ? 'Salvando...' : 'Salvar Alterações'}
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            )}
        </div>
    )
}