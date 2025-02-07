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
export function formatarDataGrafico(dataStr: string): string {
    const ano = dataStr.slice(0, 4);
    const mes = dataStr.slice(4, 6);
    const dia = dataStr.slice(6, 8);

    const data = `${ano}-${mes}-${dia}`

    console.log(data, dataStr)

    return data;
}


