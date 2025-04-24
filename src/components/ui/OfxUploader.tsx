'use client';

import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion } from 'framer-motion';
import { FiUpload, FiDownload } from 'react-icons/fi';
import * as xml2js from 'xml2js';
import ExcelJS from 'exceljs';

interface Transaction {
  TRNTYPE: string;
  DTPOSTED: string;
  TRNAMT: string;
  FITID: string;
  REFNUM: string;
  MEMO: string;
}

export default function OfxUploader() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [fileName, setFileName] = useState('');
  const [excelData, setExcelData] = useState<Uint8Array | null>(null);

  const processOfxFile = async (content: string) => {
    const parser = new xml2js.Parser();
    
    try {
      // Remove o cabeçalho SGML e prepara o conteúdo para parsing XML
      let cleanedContent = content
        .replace(/\r\n/g, '\n')
        .split('\n')
        .filter(line => line.trim() !== '')
        .join('\n');

      // Remove o cabeçalho SGML (tudo antes de <OFX>)
      const ofxStartIndex = cleanedContent.indexOf('<OFX>');
      if (ofxStartIndex === -1) {
        throw new Error('Formato de arquivo OFX inválido: tag <OFX> não encontrada');
      }
      cleanedContent = cleanedContent.substring(ofxStartIndex);

      // Remove caracteres especiais e espaços extras
      cleanedContent = cleanedContent
        .replace(/[\u0000-\u001F\u007F-\u009F]/g, '') // Remove caracteres de controle
        .replace(/\s+/g, ' ') // Normaliza espaços
        .trim();

      const result = await parser.parseStringPromise(cleanedContent);
      const transactions = result.OFX.BANKMSGSRSV1[0].STMTTRNRS[0].STMTRS[0].BANKTRANLIST[0].STMTTRN;
      
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet('Transações');
      
      worksheet.columns = [
        { header: 'Data', key: 'date', width: 15 },
        { header: 'Tipo', key: 'type', width: 15 },
        { header: 'Valor', key: 'amount', width: 15 },
        { header: 'Descrição', key: 'memo', width: 40 },
        { header: 'Referência', key: 'ref', width: 30 }
      ];

      transactions.forEach((trn: Transaction) => {
        const date = new Date(trn.DTPOSTED[0].slice(0, 8));
        worksheet.addRow({
          date: date.toLocaleDateString('pt-BR'),
          type: trn.TRNTYPE[0],
          amount: parseFloat(trn.TRNAMT[0]).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
          memo: trn.MEMO[0],
          ref: trn.REFNUM[0].trim()
        });
      });

      const buffer = await workbook.xlsx.writeBuffer();
      setExcelData(new Uint8Array(buffer));
    } catch (error) {
      console.error('Erro ao processar arquivo:', error);
    //   alert('Erro ao processar o arquivo OFX. Verifique se o formato está correto.');
    }
  };

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    setFileName(file.name);
    setIsProcessing(true);

    const reader = new FileReader();
    reader.onload = async (e) => {
      const content = e.target?.result as string;
      await processOfxFile(content);
      setIsProcessing(false);
    };
    reader.readAsText(file);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'application/ofx': ['.ofx'] },
    maxFiles: 1
  });

  const downloadExcel = () => {
    if (!excelData) return;

    const blob = new Blob([excelData], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${fileName.replace('.ofx', '')}_convertido.xlsx`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6">
        {/* @ts-expect-error */}
      <motion.div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
          ${isDragActive ? 'border-yellow-400 bg-yellow-50' : 'border-gray-300 hover:border-yellow-400'}
          ${isProcessing ? 'opacity-50 pointer-events-none' : ''}`}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <input {...getInputProps()} />
        <FiUpload className="mx-auto text-4xl mb-4 text-yellow-500" />
        <p className="text-lg mb-2">
          {isDragActive ? 'Solte o arquivo aqui' : 'Arraste e solte o arquivo OFX aqui'}
        </p>
        <p className="text-sm text-gray-500">
          ou clique para selecionar
        </p>
      </motion.div>

      {fileName && (
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600 mb-4">
            Arquivo carregado: {fileName}
          </p>
          <motion.button
            onClick={downloadExcel}
            disabled={!excelData || isProcessing}
            className={`flex items-center justify-center px-6 py-2 rounded-lg bg-yellow-500 text-white font-medium
              ${(!excelData || isProcessing) ? 'opacity-50 cursor-not-allowed' : 'hover:bg-yellow-600'}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FiDownload className="mr-2" />
            {isProcessing ? 'Processando...' : 'Baixar Excel'}
          </motion.button>
        </div>
      )}
    </div>
  );
}