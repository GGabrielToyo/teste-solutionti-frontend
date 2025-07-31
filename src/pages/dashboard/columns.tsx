import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import type { AddressDto, UpdateAddressDto } from "@/interfaces/address-interface"
import type { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import { UpdateAddressDialog } from "./updateAddressDialog"

export const columns = (
    onDelete?: (id: string) => Promise<void>,
    onUpdate?: (address: UpdateAddressDto) => Promise<void>
): ColumnDef<AddressDto>[] => [
        {
            id: "select",
            header: ({ table }) => (
                <Checkbox
                    checked={
                        table.getIsAllPageRowsSelected() ||
                        (table.getIsSomePageRowsSelected() && "indeterminate")
                    }
                    onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                    aria-label="Select all"
                />
            ),
            cell: ({ row }) => (
                <Checkbox
                    checked={row.getIsSelected()}
                    onCheckedChange={(value) => row.toggleSelected(!!value)}
                    aria-label="Select row"
                />
            ),
            enableSorting: false,
            enableHiding: false,
        },
        {
            accessorKey: "street",
            header: "Logradouro",
            cell: ({ row }) => (
                <div className="capitalize">{row.getValue("street")}</div>
            ),
        },
        {
            accessorKey: "city",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Localidade
                        <ArrowUpDown />
                    </Button>
                )
            },
            cell: ({ row }) => <div className="lowercase">{row.getValue("city")}</div>,
        },
        {
            accessorKey: "region",
            header: "Região",
            cell: ({ row }) => (
                <div className="capitalize">{row.getValue("region")}</div>
            ),
        },
        {
            accessorKey: "userName",
            header: "Nome",
            cell: ({ row }) => (
                <div className="capitalize">{row.original.user.name}</div>
            ),
        },
        {
            accessorKey: "userCPF",
            header: "CPF",
            cell: ({ row }) => (
                <div className="capitalize">{row.original.user.cpf}</div>
            ),
        },
        {
            id: "actions",
            enableHiding: false,
            cell: ({ row }) => {
                const address = row.original

                const handleDelete = async () => {
                    await onDelete?.(address.id)
                }

                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Abrir Menu</span>
                                <MoreHorizontal />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Ações</DropdownMenuLabel>
                            <DropdownMenuItem
                                onClick={() => navigator.clipboard.writeText(address.id)}
                            >
                                Copiar ID
                            </DropdownMenuItem>
                            <UpdateAddressDialog
                                address={address}
                                onUpdate={async (data) => {
                                    if (onUpdate) {
                                        await onUpdate(data)
                                    }
                                }}
                            >
                                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>Atualizar</DropdownMenuItem>
                            </UpdateAddressDialog>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={handleDelete} >Deletar</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                )
            },
        },
    ]