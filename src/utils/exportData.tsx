import { ExportAsExcel, ExportAsPdf } from 'react-export-table';
import { TransactionType } from '@/app/types/TransactionType';
import { formatarData, formatarParaReal } from '@/helper/FormataReal';

interface ExportDataProps {
  data: TransactionType[];
  tipo: string;
}

export const formatarDadosParaExportacao = (transactions: TransactionType[]) => {
  return transactions.map(transaction => ({
    Tipo: transaction.TRNTYPE === 'CREDIT' ? 'Crédito' : 'Débito',
    Data: formatarData(transaction.DTPOSTED),
    Valor: formatarParaReal(parseFloat(transaction.TRNAMT)),
    Referência: transaction.REFNUM,
    Memorando: transaction.MEMO
  }));
};

export const ExportButtons = ({ data, tipo }: ExportDataProps) => {
  const formattedData = formatarDadosParaExportacao(data);
  const headers = ['Tipo', 'Data', 'Valor', 'Referência', 'Memorando'];
  const fileName = `extrato_${tipo.toLowerCase()}_${new Date().toISOString().split('T')[0]}`;

  return (
    <div className="flex gap-2">
      <ExportAsExcel
        data={formattedData}
        headers={headers}
        fileName={fileName}
      >
        {(props) => (
          <button
            {...props}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            Exportar Excel
          </button>
        )}
      </ExportAsExcel>

      <ExportAsPdf
        data={formattedData}
        headers={headers}
        fileName={fileName}
        headerStyles={{ fillColor: '#1F2937' }}
      >
        {(props) => (
          <button
            {...props}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Exportar PDF
          </button>
        )}
      </ExportAsPdf>
    </div>
  );
};