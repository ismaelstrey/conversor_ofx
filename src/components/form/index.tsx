"use client";
import { OFXResponse } from "@/app/types/TransactionType";
import React, { useEffect, useState } from "react";
import Transactions from "../home/Transactions";
import { salvaLocalStorage, ofx } from "@/services/indexDb";

const FileInputForm = () => {


  const parseOfx = ofx && JSON.parse(ofx) || null;
  const [file, setFile] = useState<File | null>(null);
  const [dataOfx, setDataOfx] = useState<OFXResponse | null>(null);

  useEffect(() => {
    setDataOfx(parseOfx);
  }, [parseOfx]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (file) {
      const formData = new FormData();
      formData.append("ofx", file);

      try {
        const response = await fetch("/api/conversor/ofx", {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          // Requisição bem-sucedida
          const ofx = await response.json();
          const nomeDoArquivo = ofx.data?.header["Content-Disposition"].split(";")[2].split("=")[1];
          console.log(nomeDoArquivo)
          salvaLocalStorage(ofx.data, 'ofx');
          setDataOfx(ofx.data);
        } else {
          // Tratar erro de requisição
          console.error(
            "Erro na requisição:",
            response.status,
            response.statusText
          );
        }
      } catch (error) {
        // Tratar erro de rede
        console.error("Erro de rede:", error);
      }
    }
  };
  const tansections = dataOfx?.OFX.BANKMSGSRSV1.STMTTRNRS.STMTRS.BANKTRANLIST.STMTTRN;
  const instiruicao = dataOfx?.OFX.SIGNONMSGSRSV1.SONRS.FI;
  return (
    <div className="flex w-full flex-col gap-4 mt-4">
      <div className="flex container m-auto w-full justify-center">
        <form className="flex w-full container gap-4" onSubmit={(e) => handleSubmit(e)}>
          <label htmlFor="fileInput" className="text-white">Selecione o arquivo OFX</label>
          <input id="fileInput" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" type="file" accept=".ofx" onChange={handleFileChange} />
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit">Enviar</button>
        </form>
      </div>
      <div className="flex justify-center">
        {dataOfx && (
          <Transactions
            transactions={
              tansections
            }
            FI={instiruicao}
          />
        )}
      </div>
    </div>
  );
};

export default FileInputForm;
