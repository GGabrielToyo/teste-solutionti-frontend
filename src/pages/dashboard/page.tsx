import { columns, type Address } from "./columns"
import { DataTable } from "./data-table"
import { useDocumentTitle } from "@/hooks/use-document-title"

const data: Address[] = [
    {
        id: "1",
        street: "123 Main St",
        city: "Springfield",
        region: "IL",
        userName: "John Doe",
        userCPF: "123.456.789-00"
    },
    {
        id: "2",
        street: "456 Elm St",
        city: "Shelbyville",
        region: "IL",
        userName: "Jane Smith",
        userCPF: "987.654.321-00"
    },
    {
        id: "3",
        street: "789 Oak St",
        city: "Capitol City",
        region: "IL",
        userName: "Alice Johnson",
        userCPF: "456.789.123-00"
    },
    {
        id: "4",
        street: "321 Pine St",
        city: "Ogdenville",
        region: "IL",
        userName: "Bob Brown",
        userCPF: "321.654.987-00"
    },
    {
        id: "5",
        street: "654 Maple St",
        city: "North Haverbrook",
        region: "IL",
        userName: "Charlie White",
        userCPF: "789.123.456-00"
    },
    {
        id: "6",
        street: "987 Cedar St",
        city: "Monorail City",
        region: "IL",
        userName: "Diana Green",
        userCPF: "654.321.789-00"
    },
    {
        id: "7",
        street: "159 Birch St",
        city: "Springfield",
        region: "IL",
        userName: "Ethan Blue",
        userCPF: "159.753.486-00"
    },
    {
        id: "8",
        street: "753 Willow St",
        city: "Shelbyville",
        region: "IL",
        userName: "Fiona Red",
        userCPF: "753.159.852-00"
    },
    {
        id: "9",
        street: "951 Cherry St",
        city: "Capitol City",
        region: "IL",
        userName: "George Yellow",
        userCPF: "951.852.753-00"
    },
    {
        id: "10",
        street: "852 Ash St",
        city: "Ogdenville",
        region: "IL",
        userName: "Hannah Purple",
        userCPF: "852.963.741-00"
    }
]


export default function Page() {
    useDocumentTitle(" App - Dashboard")

    return (
        <div className="container mx-auto py-10 bg-background text-foreground">
            <DataTable columns={columns} data={data} />
        </div>
    )
}