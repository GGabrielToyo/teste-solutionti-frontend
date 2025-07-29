import { useDocumentTitle } from "@/hooks/use-document-title";

export default function Profile() {
    useDocumentTitle("App - Profile");

    return (
        <div className="container mx-auto py-10">
            <div className="text-center mb-6">
                <h1 className="text-3xl font-bold mb-2">Seus Dados</h1>
                <p className="text-muted-foreground">Gerencie seus dados de forma simples e eficiente.</p>
            </div>
        </div>
    );
}