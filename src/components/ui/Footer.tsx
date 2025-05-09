'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaGithub } from 'react-icons/fa';

const Footer = () => {
  const links = [
    { href: '/', label: 'Home' },
    { href: '/page/ofx', label: 'Sobre OFX' },
    { href: '/page/ofx/mei', label: 'MEI' },
    { href: '/page/privacidade', label: 'Privacidade' },
    { href: '/page/download', label: 'Download' },
  ];

  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full py-6 bg-gradient-to-b from-transparent to-black/30 backdrop-blur-sm mt-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center space-y-4">
          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {links.map((link) => (
              <motion.div
                key={link.href}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href={link.href}
                  className="text-gray-400 hover:text-[#F3F821] transition-colors duration-200 text-sm"
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
          </nav>
          
          <div className="flex items-center space-x-2 text-gray-400 text-sm">
            <span>© {new Date().getFullYear()} Conversor OFX</span>
            <span>•</span>
            <motion.a
              href="https://github.com/ismaelstrey/conversor_ofx"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#F3F821] transition-colors duration-200"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <FaGithub className="w-4 h-4" />
            </motion.a>
          </div>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;