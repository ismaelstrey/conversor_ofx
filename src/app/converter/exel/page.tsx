
import OfxUploader from "@/components/ui/OfxUploader";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0F0F0F] text-white py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">
            Conversor OFX para Excel
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Converta seus extratos bancários do formato OFX para planilhas Excel de forma rápida e segura.
          </p>
        </div>

        <div className="bg-gray-900 rounded-xl shadow-xl p-8 max-w-4xl mx-auto">
          <OfxUploader />
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl mx-auto">
          <div className="bg-gray-900 p-6 rounded-lg text-center">
            <div className="text-[#F3F821] text-2xl mb-3">🔒</div>
            <h3 className="text-lg font-semibold mb-2">Processamento Seguro</h3>
            <p className="text-gray-400">Seus dados são processados localmente, sem envio para servidores externos.</p>
          </div>

          <div className="bg-gray-900 p-6 rounded-lg text-center">
            <div className="text-[#F3F821] text-2xl mb-3">⚡</div>
            <h3 className="text-lg font-semibold mb-2">Conversão Rápida</h3>
            <p className="text-gray-400">Processo de conversão instantâneo e eficiente.</p>
          </div>

          <div className="bg-gray-900 p-6 rounded-lg text-center">
            <div className="text-[#F3F821] text-2xl mb-3">📊</div>
            <h3 className="text-lg font-semibold mb-2">Formato Organizado</h3>
            <p className="text-gray-400">Dados estruturados em planilhas de fácil leitura.</p>
          </div>

          <div className="bg-gray-900 p-6 rounded-lg text-center">
            <div className="text-[#F3F821] text-2xl mb-3">💾</div>
            <h3 className="text-lg font-semibold mb-2">Download Imediato</h3>
            <p className="text-gray-400">Baixe o arquivo Excel convertido instantaneamente.</p>
          </div>
        </div>
      </div>
    </main>
  );
}
