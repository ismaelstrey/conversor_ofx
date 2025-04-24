"use client";
import { OFXResponse } from "@/app/types/TransactionType";
import React, { useCallback, useEffect, useState } from "react";
import Transactions from "../home/Transactions";
import { salvaLocalStorage, ofx } from "@/services/indexDb";
import { useDropzone } from 'react-dropzone';
import { motion } from 'framer-motion';
import { FiUpload } from 'react-icons/fi';

const FileInputForm = () => {
  const parseOfx = ofx && JSON.parse(ofx) || null;
  // const [file, setFile] = useState<File | null>(null);
  const [dataOfx, setDataOfx] = useState<OFXResponse | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setDataOfx(parseOfx);
  }, [parseOfx]);

  const handleSubmit = async (selectedFile: File) => {
    setIsProcessing(true);
    setError(null);
    setDataOfx(null); // Limpa os dados anteriores
    const formData = new FormData();
    formData.append("ofx", selectedFile);

    try {
      const response = await fetch("/api/conversor/ofx", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const ofx = await response.json();
        // const nomeDoArquivo = ofx.data?.header["Content-Disposition"].split(";")[2].split("=")[1];
        salvaLocalStorage(ofx.data, 'ofx');
        setDataOfx(ofx.data);
      } else {
        setError("Erro ao processar o arquivo. Por favor, tente novamente.");
      }
    } catch (error) {
      console.log(error);
      setError("Erro de conexão. Verifique sua internet e tente novamente.");
    } finally {
      setIsProcessing(false);
    }
  };

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      // setFile(file);
      await handleSubmit(file);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'application/ofx': ['.ofx'] },
    maxFiles: 1
  });

  const tansections = dataOfx?.OFX.BANKMSGSRSV1.STMTTRNRS.STMTRS.BANKTRANLIST.STMTTRN;
  const instiruicao = dataOfx?.OFX.SIGNONMSGSRSV1.SONRS.FI;

  return (
    <div className="flex w-full flex-col gap-6 mt-4 items-center">
      <div className="w-full max-w-2xl mx-auto">
        {/* @ts-expect-error - Spread props from react-dropzone getRootProps() causes type conflicts with motion.div props */}
        <motion.div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
            ${isDragActive ? 'border-[#F3F821] bg-[#F3F821]/10' : 'border-gray-600 hover:border-[#F3F821]'}
            ${isProcessing ? 'opacity-50 pointer-events-none' : ''}`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <input {...getInputProps()} />
          <FiUpload className="mx-auto text-4xl mb-4 text-[#F3F821]" />
          <p className="text-lg mb-2 text-white">
            {isDragActive ? 'Solte o arquivo aqui' : 'Arraste e solte o arquivo OFX aqui'}
          </p>
          <p className="text-sm text-gray-400">
            ou clique para selecionar
          </p>
          {isProcessing && (
            <motion.div
              className="mt-4 text-[#F3F821]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              Processando arquivo...
            </motion.div>
          )}
          {error && (
            <motion.div
              className="mt-4 text-red-500"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {error}
            </motion.div>
          )}
        </motion.div>
      </div>
      <div className="flex justify-center w-full">
        {dataOfx && (
          <Transactions
            transactions={tansections}
            FI={instiruicao}
          />
        )}
      </div>
    </div>
  );
}

export default FileInputForm
