import { parse } from "ofx-js";

export async function POST(req: Request) {
  try {
    const data = await req.text(); // Lê o conteúdo do OFX enviado no body
    const json = await parse(data);

    return Response.json({ success: true, data: json });
  } catch (error) {
    console.log(error);
    return Response.json(
      { success: false, error: "Erro ao fazer uoload" },
      { status: 500 }
    );
  }
}
