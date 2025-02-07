export function formatarParaReal(valor: number): string {
    return valor.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    });
}

const valor = 39857.28;
console.log(formatarParaReal(valor)); // "R$ 39.857,28"
