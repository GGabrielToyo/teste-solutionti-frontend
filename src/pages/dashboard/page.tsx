import { useCallback, useEffect, useState } from "react"
import { columns } from "./columns"
import { DataTable } from "./data-table"
import { useDocumentTitle } from "@/hooks/use-document-title"
import { AddressService } from "@/services/address-service"
import type { AddressDto, AddressDtoList, CreateAddressDto, UpdateAddressDto } from "@/interfaces/address-interface"
import { Skeleton } from "@/components/ui/skeleton"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ChevronsUpDown, RefreshCcw } from "lucide-react"
import { AddressForm } from "./addressForm"
import { UserService } from "@/services/user-service"
import type { UserDto } from "@/interfaces/user-interface"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Button } from "@/components/ui/button"


export default function Page() {
    useDocumentTitle(" App - Dashboard")
    const [addresses, setAddresses] = useState<AddressDto[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [isCollapsibleOpen, setIsCollapsibleOpen] = useState(false)

    const [user, setUser] = useState<UserDto | null>(null)
    const [userLoading, setUserLoading] = useState(true)

    useEffect(() => {
        const getUserData = async () => {
            try {
                await new Promise(resolve => setTimeout(resolve, 2000))

                const userData = UserService.getUserByCookies()
                if (userData) {
                    setUser(userData)
                } else {
                    setError("Usuário não encontrado nos cookies")
                }
            } catch (err) {
                console.error("Erro ao buscar dados do usuário:", err)
                setError("Erro ao carregar dados do usuário")
            } finally {
                setUserLoading(false)
            }
        }

        getUserData()
    }, [])

    useEffect(() => {
        const fetchAddresses = async () => {
            if (!user) return

            try {
                setLoading(true)
                setError(null)
                const response: AddressDtoList = await AddressService.getAddress()
                setAddresses(response.content)
            } catch (error) {
                console.error("Erro ao buscar endereços:", error)
                setError("Failed to fetch addresses: " + error)
            } finally {
                setLoading(false)
            }
        }

        if (user) {
            fetchAddresses()
        }
    }, [user])

    const refetchAddresses = useCallback(async () => {
        if (!user) return

        try {
            setLoading(true)
            setError(null)
            const response: AddressDtoList = await AddressService.getAddress()
            setAddresses(response.content)
        } catch (error) {
            console.error("Erro ao buscar endereços:", error)
            setError("Failed to fetch addresses: " + error)
        } finally {
            setLoading(false)
        }
    }, [user])

    // useEffect inicial
    useEffect(() => {
        if (user) {
            refetchAddresses()
        }
    }, [user, refetchAddresses])

    const handleDeleteAddress = async (addressId: string) => {
        try {
            await AddressService.delete(addressId)
            await refetchAddresses()

        } catch (error) {
            console.error('Erro ao deletar endereço:', error)
        }
    }

    const handleUpdateAddress = async (data: UpdateAddressDto) => {
        try {
            await AddressService.update(data)
            await refetchAddresses()
            console.log('Endereço atualizado com sucesso!')
        } catch (error) {
            console.error('Erro ao atualizar endereço:', error)
            throw error
        }
    }

    return (
        <>
            <Collapsible className="mt-4 text-left" open={isCollapsibleOpen} onOpenChange={setIsCollapsibleOpen}>
                <div className="flex items-center justify-between p-4 bg-muted text-muted-foreground rounded-md">
                    <CollapsibleTrigger className="flex">
                        Quer cadastrar um novo endereço?
                        <ChevronsUpDown />
                        <span className="sr-only">Toggle</span>
                    </CollapsibleTrigger>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button className="" variant="outline" size="icon" onClick={() => { refetchAddresses() }}>
                                    <RefreshCcw />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Atualizar lista de endereços.</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
                <CollapsibleContent>
                    <AddressForm
                        onSubmit={async (data: CreateAddressDto) => {
                            try {
                                await AddressService.createAddress(data)
                                await refetchAddresses()
                                setIsCollapsibleOpen(false)

                            } catch (error) {
                                console.error('Erro ao criar endereço:', error)
                            }
                        }}
                        defaultUserId={user?.id}
                    />
                </CollapsibleContent>
            </Collapsible>

            <div className="container mx-auto py-10 bg-background text-foreground">
                {(loading && userLoading) && (
                    <div>
                        Carregando endereços...
                        <Skeleton className="w-full h-25 rounded-md bg-gray-300 mt-5" />
                    </div>
                )}

                {error && (
                    <div className="flex justify-center items-center py-8">
                        <p className="text-red-500">{error}</p>
                    </div>
                )}

                {!loading && !error && (
                    <DataTable columns={columns(handleDeleteAddress, handleUpdateAddress)} data={addresses} />
                )}
            </div>
        </>

    )
}