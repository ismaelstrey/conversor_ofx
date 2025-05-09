'use client';

import LinkHome from '@/components/ui/LinkHome';
import { motion } from 'framer-motion';
import { FiCpu, FiDownload, FiFileText, FiZap } from 'react-icons/fi';

const DownloadPage = () => {
  const features = [
    {
      icon: <FiCpu className="text-[#F3F821] text-4xl mb-4" />,
      title: 'Processamento Local',
      description: 'Conversão instantânea diretamente no seu navegador, sem necessidade de upload para servidores externos.'
    },
    {
      icon: <FiZap className="text-[#F3F821] text-4xl mb-4" />,
      title: 'Alta Performance',
      description: 'Sistema otimizado para processar seus arquivos com rapidez e eficiência, sem comprometer a qualidade.'
    },
    {
      icon: <FiDownload className="text-[#F3F821] text-4xl mb-4" />,
      title: 'Download Imediato',
      description: 'Após a conversão, faça o download instantâneo dos seus arquivos em Excel ou PDF.'
    },
    {
      icon: <FiFileText className="text-[#F3F821] text-4xl mb-4" />,
      title: 'Múltiplos Formatos',
      description: 'Flexibilidade para exportar seus dados financeiros em Excel (.xlsx) ou PDF, conforme sua necessidade.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#0F0F0F] py-16 px-4">
        
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto text-center"
      >
    <LinkHome/>
        <h1 className="text-4xl font-bold text-white mb-6">
          Exportação Simplificada
        </h1>
        <p className="text-gray-400 text-lg mb-12">
          Converta seus arquivos OFX para Excel ou PDF com apenas alguns cliques.
          Processamento 100% online e seguro.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-[#1A1A1A] p-6 rounded-lg text-center hover:bg-[#242424] transition-colors"
            >
              <div className="flex justify-center">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-3 text-white">
                {feature.title}
              </h3>
              <p className="text-gray-400">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <p className="text-gray-400 text-sm">
            Processamento 100% local e seguro.
            <br />
            Nenhum dado é enviado ou armazenado em servidores externos.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default DownloadPage;