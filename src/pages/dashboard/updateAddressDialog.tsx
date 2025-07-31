import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2 } from "lucide-react"
import type { AddressDto, UpdateAddressDto } from "@/interfaces/address-interface"

// Schema igual ao AddressForm, mas com campos opcionais
const updateAddressSchema = z.object({
    zipCode: z.string().min(8, "CEP deve ter 8 dígitos").max(9, "CEP inválido"),
    street: z.string().min(1, "Rua é obrigatória"),
    complement: z.string().optional(),
    unit: z.string().optional(),
    district: z.string().min(1, "Bairro é obrigatório"),
    city: z.string().min(1, "Cidade é obrigatória"),
    stateAbbr: z.string().min(2, "Estado é obrigatório").max(2, "Use a sigla do estado"),
    region: z.string().min(1, "Região é obrigatória"),
    ibgeCode: z.string().optional(),
    giaCode: z.string().optional(),
    areaCode: z.string().optional(),
    siafiCode: z.string().optional(),
})

type UpdateAddressFormData = z.infer<typeof updateAddressSchema>

interface UpdateAddressDialogProps {
    address: AddressDto
    onUpdate: (data: UpdateAddressDto) => Promise<void>
    children: React.ReactNode
}

export function UpdateAddressDialog({ address, onUpdate, children }: UpdateAddressDialogProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitError, setSubmitError] = useState<string | null>(null)

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue
    } = useForm<UpdateAddressFormData>({
        resolver: zodResolver(updateAddressSchema),
        defaultValues: {
            zipCode: address.zipCode || "",
            street: address.street || "",
            complement: address.complement || "",
            unit: address.unit || "",
            district: address.district || "",
            city: address.city || "",
            stateAbbr: address.stateAbbr || "",
            region: address.region || "",
            ibgeCode: address.ibgeCode || "",
            giaCode: address.giaCode || "",
            areaCode: address.areaCode || "",
            siafiCode: address.siafiCode || "",
        }
    })

    useEffect(() => {
        if (isOpen) {
            reset({
                zipCode: address.zipCode || "",
                street: address.street || "",
                complement: address.complement || "",
                unit: address.unit || "",
                district: address.district || "",
                city: address.city || "",
                stateAbbr: address.stateAbbr || "",
                region: address.region || "",
                ibgeCode: address.ibgeCode || "",
                giaCode: address.giaCode || "",
                areaCode: address.areaCode || "",
                siafiCode: address.siafiCode || "",
            })
        }
    }, [isOpen, address, reset])

    const handleZipCodeBlur = async (zipCode: string) => {
        if (zipCode.replace(/\D/g, '').length === 8) {
            try {
                const response = await fetch(`https://viacep.com.br/ws/${zipCode}/json/`)
                const data = await response.json()

                if (!data.erro) {
                    setValue('street', data.logradouro || '')
                    setValue('unit', data.unidade || '')
                    setValue('district', data.bairro || '')
                    setValue('city', data.localidade || '')
                    setValue('stateAbbr', data.uf || '')
                    setValue('region', data.regiao || '')
                    setValue('ibgeCode', data.ibge || '')
                    setValue('giaCode', data.gia || '')
                    setValue('areaCode', data.ddd || '')
                    setValue('siafiCode', data.siafi || '')
                }
            } catch (error) {
                console.error('Erro ao buscar CEP:', error)
            }
        }
    }

    const onSubmitForm = async (data: UpdateAddressFormData) => {
        try {
            setIsSubmitting(true)
            setSubmitError(null)

            const updateData: UpdateAddressDto = {
                id: address.id,
                zipCode: data.zipCode,
                street: data.street,
                complement: data.complement,
                unit: data.unit,
                district: data.district,
                city: data.city,
                stateAbbr: data.stateAbbr,
                region: data.region,
                ibgeCode: data.ibgeCode,
                giaCode: data.giaCode,
                areaCode: data.areaCode,
                siafiCode: data.siafiCode,
            }

            await onUpdate(updateData)
            setIsOpen(false)

        } catch (error) {
            setSubmitError(error instanceof Error ? error.message : 'Erro ao atualizar endereço')
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Atualizar Endereço</DialogTitle>
                    <DialogDescription>
                        Atualize os dados do endereço. Clique em salvar quando terminar.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="zipCode">CEP *</Label>
                        <Input
                            id="zipCode"
                            placeholder="00000-000"
                            {...register("zipCode")}
                            onBlur={(e) => handleZipCodeBlur(e.target.value)}
                            maxLength={9}
                        />
                        {errors.zipCode && (
                            <p className="text-sm text-red-500">{errors.zipCode.message}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="street">Rua *</Label>
                        <Input
                            id="street"
                            placeholder="Nome da rua"
                            {...register("street")}
                        />
                        {errors.street && (
                            <p className="text-sm text-red-500">{errors.street.message}</p>
                        )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="complement">Complemento</Label>
                            <Input
                                id="complement"
                                placeholder="Apt, Bloco, etc"
                                {...register("complement")}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="unit">Número</Label>
                            <Input
                                id="unit"
                                placeholder="123"
                                {...register("unit")}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="district">Bairro *</Label>
                        <Input
                            id="district"
                            placeholder="Nome do bairro"
                            {...register("district")}
                        />
                        {errors.district && (
                            <p className="text-sm text-red-500">{errors.district.message}</p>
                        )}
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                        <div className="col-span-2 space-y-2">
                            <Label htmlFor="city">Cidade *</Label>
                            <Input
                                id="city"
                                placeholder="Nome da cidade"
                                {...register("city")}
                            />
                            {errors.city && (
                                <p className="text-sm text-red-500">{errors.city.message}</p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="stateAbbr">Estado *</Label>
                            <Input
                                id="stateAbbr"
                                placeholder="SP"
                                maxLength={2}
                                {...register("stateAbbr")}
                            />
                            {errors.stateAbbr && (
                                <p className="text-sm text-red-500">{errors.stateAbbr.message}</p>
                            )}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="region">Região *</Label>
                        <Input
                            id="region"
                            placeholder="Sudeste, Nordeste, etc"
                            {...register("region")}
                        />
                        {errors.region && (
                            <p className="text-sm text-red-500">{errors.region.message}</p>
                        )}
                    </div>

                    <input type="hidden" {...register("ibgeCode")} />
                    <input type="hidden" {...register("giaCode")} />
                    <input type="hidden" {...register("areaCode")} />
                    <input type="hidden" {...register("siafiCode")} />

                    {submitError && (
                        <Alert variant="destructive">
                            <AlertDescription>{submitError}</AlertDescription>
                        </Alert>
                    )}

                    <div className="flex gap-4 pt-4">
                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="flex-1"
                        >
                            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            {isSubmitting ? 'Atualizando...' : 'Salvar Alterações'}
                        </Button>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setIsOpen(false)}
                            disabled={isSubmitting}
                        >
                            Cancelar
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}