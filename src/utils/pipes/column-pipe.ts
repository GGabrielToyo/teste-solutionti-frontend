export const columnPipe = (columnId: string): string => {
    const columnNames: Record<string, string> = {
        'select': 'Selecionar',
        'street': 'Rua',
        'city': 'Cidade',
        'region': 'Região',
        'userName': 'Nome do Usuário',
        'userCPF': 'CPF',
        'actions': 'Ações'
    }

    return columnNames[columnId] || columnId
}
