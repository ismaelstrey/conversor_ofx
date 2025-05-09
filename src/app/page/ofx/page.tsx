'use client';

import LinkHome from '@/components/ui/LinkHome';
import { motion } from 'framer-motion';
import { FiDatabase, FiPieChart, FiTrendingUp, FiUsers } from 'react-icons/fi';
import { MdAccountBalance, MdAutoGraph } from 'react-icons/md';

const OfxPage = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  const beneficios = [
    {
      icon: <FiDatabase className="text-[#F3F821] text-4xl mb-4" />,
      title: 'Importação Automática',
      description: 'Importe automaticamente dados bancários e financeiros, eliminando a digitação manual.'
    },
    {
      icon: <FiPieChart className="text-[#F3F821] text-4xl mb-4" />,
      title: 'Análise Detalhada',
      description: 'Visualize transações detalhadas e gere relatórios personalizados para melhor controle financeiro.'
    },
    {
      icon: <FiTrendingUp className="text-[#F3F821] text-4xl mb-4" />,
      title: 'Tomada de Decisão',
      description: 'Tome decisões estratégicas baseadas em dados financeiros precisos e atualizados.'
    },
    {
      icon: <FiUsers className="text-[#F3F821] text-4xl mb-4" />,
      title: 'Colaboração Eficiente',
      description: 'Facilite a comunicação entre contadores e gestores com dados padronizados.'
    }
  ];

  const casosDeUso = [
    {
      icon: <MdAccountBalance className="text-[#F3F821] text-4xl mb-4" />,
      title: 'Conciliação Bancária',
      description: 'Automatize o processo de conciliação bancária, reduzindo erros e economizando tempo.'
    },
    {
      icon: <MdAutoGraph className="text-[#F3F821] text-4xl mb-4" />,
      title: 'Gestão Financeira',
      description: 'Monitore fluxo de caixa, receitas e despesas com precisão e eficiência.'
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
        <LinkHome/>
        <div className="text-center mb-16">
          <motion.h1 
            className="text-4xl sm:text-5xl font-bold mb-6"
            {...fadeInUp}
          >
            Entenda o Poder do OFX
          </motion.h1>
          <motion.p 
            className="text-xl text-gray-300 max-w-3xl mx-auto"
            {...fadeInUp}
          >
            O formato OFX (Open Financial Exchange) revoluciona a forma como empresas e contadores gerenciam dados financeiros.
          </motion.p>
        </div>

        {/* O que é OFX */}
        <motion.section 
          className="mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold mb-6 text-center">O que é OFX?</h2>
          <p className="text-gray-300 text-lg text-center max-w-4xl mx-auto">
            OFX é um formato padronizado para troca de informações financeiras entre instituições bancárias, 
            softwares de contabilidade e sistemas de gestão empresarial. Ele permite a importação automática 
            de extratos bancários, facilitando a conciliação e análise financeira.
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
          <h2 className="text-3xl font-bold mb-12 text-center">Benefícios do OFX</h2>
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
          <h2 className="text-3xl font-bold mb-12 text-center">Casos de Uso</h2>
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
          <h2 className="text-3xl font-bold mb-6">Comece Agora</h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Simplifique sua gestão financeira com a importação automática de extratos bancários em formato OFX.
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

export default OfxPage;