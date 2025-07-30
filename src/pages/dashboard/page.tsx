import { useEffect, useState } from "react"
import { columns } from "./columns"
import { DataTable } from "./data-table"
import { useDocumentTitle } from "@/hooks/use-document-title"
import { AddressService } from "@/services/address-service"
import type { AddressDto, AddressDtoList } from "@/interfaces/address-interface"
import { Skeleton } from "@/components/ui/skeleton"


export default function Page() {
    useDocumentTitle(" App - Dashboard")
    const [addresses, setAddresses] = useState<AddressDto[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchAddresses = async () => {
            try {
                setLoading(true)
                setError(null)
                const response: AddressDtoList = await AddressService.getAddress()

                setAddresses(response.content)
                setTimeout(() => {
                    setLoading(false)
                }, 2000)

            } catch (error) {
                console.error("Erro ao buscar endereços:", error)
                setError("Failed to fetch addresses: " + error)
                setLoading(false)
            }
        }
        fetchAddresses()
    }, [])

    return (
        <div className="container mx-auto py-10 bg-background text-foreground">
            {loading && (
                <div>
                    Carregando...
                    <Skeleton className="w-full h-25 rounded-md bg-gray-300 mt-5" />
                </div>
            )}

            {error && (
                <div className="flex justify-center items-center py-8">
                    <p className="text-red-500">{error}</p>
                </div>
            )}

            {!loading && !error && (
                <DataTable columns={columns} data={addresses} />
            )}
        </div>
    )
}