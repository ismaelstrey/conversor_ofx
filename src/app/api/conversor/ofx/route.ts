import { parse } from "ofx-js";

export async function POST(req: Request) {
  try {
    let data = await req.text(); // Lê o conteúdo do OFX enviado no body

    // Limpa o conteúdo OFX antes do parsing
    data = data
      .replace(/[\u0000-\u001F\u007F-\u009F]/g, '') // Remove caracteres de controle
      .replace(/[^\x20-\x7E\n]/g, '') // Mantém apenas caracteres ASCII imprimíveis e quebras de linha
      .replace(/&(?![A-Za-z0-9#]+;)/g, '&amp;') // Corrige entidades XML mal formadas
      .replace(/[\r\n]+/g, '\n') // Normaliza quebras de linha
      .trim();

    // Remove o cabeçalho SGML (tudo antes de <OFX>)
    const ofxStartIndex = data.indexOf('<OFX>');
    if (ofxStartIndex === -1) {
      throw new Error('Formato de arquivo OFX inválido: tag <OFX> não encontrada');
    }
    data = data.substring(ofxStartIndex);

    const json = await parse(data);
    return Response.json({ success: true, data: json });
  } catch (error) {
    console.error('Erro ao processar arquivo OFX:', error);
    return Response.json(
      { success: false, error: "Erro ao processar o arquivo OFX. Verifique se o formato está correto." },
      { status: 500 }
    );
  }
}
