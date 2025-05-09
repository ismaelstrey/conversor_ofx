'use client';

import LinkHome from '@/components/ui/LinkHome';
import { motion } from 'framer-motion';
import { FaShieldAlt, FaLock, FaUserLock } from 'react-icons/fa';
import { MdSecurity, MdPrivacyTip } from 'react-icons/md';

const PrivacyPage = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  const privacyPoints = [
    {
      icon: <FaShieldAlt className="text-[#F3F821] text-4xl mb-4" />,
      title: 'Processamento Local',
      description: 'Todos os dados são processados diretamente no seu navegador, sem envio para servidores externos.'
    },
    {
      icon: <FaLock className="text-[#F3F821] text-4xl mb-4" />,
      title: 'Sem Armazenamento',
      description: 'Não armazenamos nenhuma informação dos seus arquivos OFX em nossos servidores.'
    },
    {
      icon: <FaUserLock className="text-[#F3F821] text-4xl mb-4" />,
      title: 'Privacidade Garantida',
      description: 'Seus dados bancários permanecem seguros e privados, pois todo o processamento acontece offline.'
    },
    {
      icon: <MdSecurity className="text-[#F3F821] text-4xl mb-4" />,
      title: 'Segurança Total',
      description: 'Utilizamos as mais modernas tecnologias de processamento client-side para garantir a segurança dos seus dados.'
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
            Política de Privacidade
          </motion.h1>
          <motion.p 
            className="text-xl text-gray-300 max-w-3xl mx-auto"
            {...fadeInUp}
          >
            Entenda como garantimos a segurança e privacidade dos seus dados durante o processamento de arquivos OFX.
          </motion.p>
        </div>

        {/* Sobre nossa Política */}
        <motion.section 
          className="mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold mb-6 text-center">Como Funciona</h2>
          <p className="text-gray-300 text-lg text-center max-w-4xl mx-auto">
            Nossa ferramenta foi desenvolvida com foco total em privacidade e segurança. 
            Todo o processamento dos arquivos OFX é realizado localmente no seu navegador, 
            sem necessidade de envio ou armazenamento em servidores externos.
          </p>
        </motion.section>

        {/* Pontos de Privacidade */}
        <motion.section 
          className="mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold mb-12 text-center">Garantias de Privacidade</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {privacyPoints.map((point, index) => (
              <motion.div
                key={index}
                className="bg-gray-900 p-6 rounded-lg text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                {point.icon}
                <h3 className="text-xl font-semibold mb-3">{point.title}</h3>
                <p className="text-gray-400">{point.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Detalhes Técnicos */}
        <motion.section
          className="mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold mb-6 text-center">Detalhes Técnicos</h2>
          <div className="bg-gray-900 p-8 rounded-lg max-w-4xl mx-auto">
            <div className="space-y-6 text-gray-300">
              <p>
                <strong className="text-[#F3F821]">Processamento Client-Side:</strong> Todo o processamento 
                dos arquivos OFX é realizado diretamente no seu navegador usando JavaScript moderno.
              </p>
              <p>
                <strong className="text-[#F3F821]">Sem Cookies:</strong> Não utilizamos cookies 
                ou qualquer forma de rastreamento.
              </p>
              <p>
                <strong className="text-[#F3F821]">Sem Banco de Dados:</strong> Não mantemos 
                nenhum banco de dados com informações dos usuários ou arquivos processados.
              </p>
              <p>
                <strong className="text-[#F3F821]">Código Aberto:</strong> Nosso código é aberto 
                e pode ser auditado por qualquer pessoa.
              </p>
            </div>
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
          <h2 className="text-3xl font-bold mb-6">Comece a Usar com Confiança</h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Experimente nossa ferramenta sabendo que seus dados estão protegidos e seguros.
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

export default PrivacyPage;