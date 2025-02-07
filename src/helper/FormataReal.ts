export function formatarParaReal(valor: number): string {
    return valor.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    });
}

export function formatarData(dataStr: string): string {
    const ano = dataStr.slice(0, 4);
    const mes = dataStr.slice(4, 6);
    const dia = dataStr.slice(6, 8);

    return `${dia}/${mes}/${ano} `;
}

const valor = 39857.28;
console.log(formatarParaReal(valor)); // "R$ 39.857,28"
