"use client";
import { OFXResponse } from "@/app/types/TransactionType";
import React, { useState } from "react";
import Transactions from "../home/Transactions";

const FileInputForm = () => {
  const [file, setFile] = useState<File | null>(null);
  const [dataOfx, setDataOfx] = useState<OFXResponse | null>();

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
  console.log(dataOfx)
  return (
    <div className="flex flex-col gap-4 mt-4">
      <div className="flex container m-auto w-full justify-center">
        <form className="flex gap-4" onSubmit={(e) => handleSubmit(e)}>
          <label>Selecione o arquivo OFX</label>
          <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" type="file" accept=".ofx" onChange={handleFileChange} />
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit">Enviar</button>
        </form>
      </div>
      <div>
        {instiruicao && (
          <div>
            <p>ID: {instiruicao.FID}</p>
            <p>Nome:{instiruicao.ORG}</p>
          </div>
        )}
      </div>
      {dataOfx && (
        <Transactions
          transactions={
            tansections
          }
        />
      )}
    </div>
  );
};

export default FileInputForm;
