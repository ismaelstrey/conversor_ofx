'use client';

import { motion } from 'framer-motion';
import { FiShield, FiCpu, FiDownload } from 'react-icons/fi';

const About = () => {
  const features = [
    {
      icon: <FiShield className="text-[#F3F821] text-4xl mb-4" />,
      title: 'Privacidade Garantida',
      description: 'Seus dados financeiros permanecem seguros. Não armazenamos nenhuma informação em bancos de dados externos.'
    },
    {
      icon: <FiCpu className="text-[#F3F821] text-4xl mb-4" />,
      title: 'Processamento Local',
      description: 'Toda a conversão acontece diretamente no seu navegador, garantindo rapidez e segurança no processamento.'
    },
    {
      icon: <FiDownload className="text-[#F3F821] text-4xl mb-4" />,
      title: 'Download Imediato',
      description: 'Após a conversão, baixe instantaneamente seu arquivo Excel, sem necessidade de espera ou armazenamento.'
    }
  ];

  return (
    <section className="w-full max-w-6xl mx-auto px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl font-bold mb-4 text-white">
          Conversor OFX para Excel
        </h2>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Uma ferramenta segura e eficiente para converter seus extratos bancários
          do formato OFX para planilhas Excel organizadas e fáceis de usar.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
        className="mt-12 text-center"
      >
        <p className="text-gray-400 text-sm">
          Desenvolvido com foco em segurança e privacidade.
          <br />
          Nenhum dado é armazenado em nossos servidores.
        </p>
      </motion.div>
    </section>
  );
};

export default About;