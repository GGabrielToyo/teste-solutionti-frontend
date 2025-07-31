export const RolePipe = (role: string | undefined): string => {
    if (!role) return 'Desconhecido';
    
    const roleNames: Record<string, string> = {
        'USER': 'Usuário',
        'ADMIN': 'Administrador'
    }

    return roleNames[role] || role
}