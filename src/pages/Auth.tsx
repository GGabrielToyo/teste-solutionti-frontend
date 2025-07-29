import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useDocumentTitle } from "@/hooks/use-document-title";

export default function Auth() {
    useDocumentTitle("App - Auth")
    
    return (
        <div className="flex items-center justify-center min-h-screen p-4 bg-background text-foreground">
            <div className="flex w-full max-w-lg flex-col">
                <div className="text-center mb-6">
                    <h1 className="text-3xl font-bold mb-2 text-foreground">Sistema de Endereços</h1>
                    <p className="text-muted-foreground">Gerencie seus endereços de forma simples e eficiente.</p>
                </div>
                <Tabs defaultValue="account">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="account">Entrar</TabsTrigger>
                        <TabsTrigger value="password">Cadastrar</TabsTrigger>
                    </TabsList>
                    <TabsContent value="account">
                        <Card>
                            <CardHeader>
                                <CardTitle>Entrar</CardTitle>
                                <CardDescription>
                                    Entre com seus dados de acesso para continuar.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="grid gap-6">
                                <div className="grid gap-3">
                                    <Label htmlFor="tabs-demo-name">Email</Label>
                                    <Input id="tabs-demo-name" defaultValue="" placeholder="Entre com seu email" />
                                </div>
                                <div className="grid gap-3">
                                    <Label htmlFor="tabs-demo-username">Senha</Label>
                                    <Input id="tabs-demo-username" defaultValue="" placeholder="Entre com sua senha" />
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button>Entrar</Button>
                            </CardFooter>
                        </Card>
                    </TabsContent>
                    <TabsContent value="password">
                        <Card>
                            <CardHeader>
                                <CardTitle>Cadastrar</CardTitle>
                                <CardDescription>
                                    Cadastre-se para acessar o sistema.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="grid gap-6">
                                <div className="grid gap-3">
                                    <Label htmlFor="tabs-demo-current">Nome</Label>
                                    <Input id="tabs-demo-current" type="text" />
                                </div>
                                <div className="grid gap-3">
                                    <Label htmlFor="tabs-demo-new">Email</Label>
                                    <Input id="tabs-demo-new" type="text" />
                                </div>
                                <div className="grid gap-3">
                                    <Label htmlFor="tabs-demo-new">CPF</Label>
                                    <Input id="tabs-demo-new" type="text" />
                                </div>
                                <div className="grid gap-3">
                                    <Label htmlFor="tabs-demo-new">Senha</Label>
                                    <Input id="tabs-demo-new" type="password" />
                                </div>
                                <div className="grid gap-3">
                                    <Label htmlFor="tabs-demo-new">Confirmar Senha</Label>
                                    <Input id="tabs-demo-new" type="password" />
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button>Cadastrar</Button>
                            </CardFooter>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}