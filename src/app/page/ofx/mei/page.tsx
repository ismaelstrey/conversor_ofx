'use client';

import { motion } from 'framer-motion';
import { FaCalculator } from "react-icons/fa";
import { FiClock, FiFileText, FiPieChart } from 'react-icons/fi';
import { MdAccountBalance, MdAutoGraph } from 'react-icons/md';

const MeiPage = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  const beneficios = [
    {
      icon: <FaCalculator className="text-[#F3F821] text-4xl mb-4" />,
      title: 'Adeus Calculadora',
      description: 'Elimine cálculos manuais e reduza erros com importação automática de extratos bancários.'
    },
    {
      icon: <FiClock className="text-[#F3F821] text-4xl mb-4" />,
      title: 'Economia de Tempo',
      description: 'Reduza em até 70% o tempo gasto com processamento manual de extratos bancários.'
    },
    {
      icon: <FiFileText className="text-[#F3F821] text-4xl mb-4" />,
      title: 'Organização Automática',
      description: 'Categorize automaticamente as transações para declarações mais precisas.'
    },
    {
      icon: <FiPieChart className="text-[#F3F821] text-4xl mb-4" />,
      title: 'Análise Simplificada',
      description: 'Visualize o fluxo financeiro do MEI de forma clara e objetiva.'
    }
  ];

  const casosDeUso = [
    {
      icon: <MdAccountBalance className="text-[#F3F821] text-4xl mb-4" />,
      title: 'Declaração Anual',
      description: 'Prepare a declaração anual do MEI com dados precisos e organizados, sem necessidade de digitação manual.'
    },
    {
      icon: <MdAutoGraph className="text-[#F3F821] text-4xl mb-4" />,
      title: 'Controle Financeiro',
      description: 'Acompanhe o faturamento mensal do MEI e garanta que está dentro dos limites permitidos.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#0F0F0F] text-white py-16 px-4 sm:px-6 lg:px-8">
      <motion.div 
        className="max-w-7xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Hero Section */}
        <div className="text-center mb-16">
          <motion.h1 
            className="text-4xl sm:text-5xl font-bold mb-6"
            {...fadeInUp}
          >
            Simplifique a Contabilidade do MEI
          </motion.h1>
          <motion.p 
            className="text-xl text-gray-300 max-w-3xl mx-auto"
            {...fadeInUp}
          >
            Automatize a análise de extratos bancários e dedique mais tempo ao que realmente importa: seus clientes MEI.
          </motion.p>
        </div>

        {/* Sobre o Serviço */}
        <motion.section 
          className="mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold mb-6 text-center">Por que Usar Nossa Ferramenta?</h2>
          <p className="text-gray-300 text-lg text-center max-w-4xl mx-auto">
            Como contador de MEIs, você sabe o quanto é trabalhoso processar manualmente os extratos bancários 
            de cada cliente. Nossa ferramenta automatiza esse processo, permitindo que você se concentre em 
            fornecer orientações estratégicas para o crescimento dos seus clientes.
          </p>
        </motion.section>

        {/* Benefícios */}
        <motion.section 
          className="mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold mb-12 text-center">Benefícios para Contadores de MEI</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {beneficios.map((beneficio, index) => (
              <motion.div
                key={index}
                className="bg-gray-900 p-6 rounded-lg text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                {beneficio.icon}
                <h3 className="text-xl font-semibold mb-3">{beneficio.title}</h3>
                <p className="text-gray-400">{beneficio.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Casos de Uso */}
        <motion.section
          className="mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold mb-12 text-center">Como Usar</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {casosDeUso.map((caso, index) => (
              <motion.div
                key={index}
                className="bg-gray-900 p-6 rounded-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                {caso.icon}
                <h3 className="text-xl font-semibold mb-3">{caso.title}</h3>
                <p className="text-gray-400">{caso.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* CTA */}
        <motion.section
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold mb-6">Comece a Economizar Tempo Agora</h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Experimente nossa ferramenta e veja como é fácil automatizar a análise de extratos bancários dos seus clientes MEI.
          </p>
          <motion.a
            href="/"
            className="inline-block bg-[#F3F821] text-black font-bold py-3 px-8 rounded-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Converter OFX Agora
          </motion.a>
        </motion.section>
      </motion.div>
    </div>
  );
};

export default MeiPage;