<div align="center">

# 🔄 Conversor OFX para Excel

[![Next.js](https://img.shields.io/badge/Next.js-13.5-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.2-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.0-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-10.16-ff69b4?style=for-the-badge&logo=framer)](https://www.framer.com/motion/)

<p align="center">
Converta seus extratos bancários OFX para planilhas Excel de forma rápida, segura e totalmente offline!
</p>

</div>

## 🌟 Características

- ✨ Interface moderna e responsiva
- 🔒 Processamento 100% local e seguro
- 📊 Conversão precisa para Excel
- 💾 Sem armazenamento em nuvem
- 🚀 Rápido e eficiente

## 🔄 Fluxo de Conversão

```mermaid
graph LR
    A[Upload OFX] --> B[Processamento Local]
    B --> C[Parsing XML]
    C --> D[Extração de Dados]
    D --> E[Geração Excel]
    E --> F[Download]
    style A fill:#F3F821,stroke:#333,stroke-width:2px
    style B fill:#0F0F0F,stroke:#333,stroke-width:2px,color:#fff
    style C fill:#0F0F0F,stroke:#333,stroke-width:2px,color:#fff
    style D fill:#0F0F0F,stroke:#333,stroke-width:2px,color:#fff
    style E fill:#0F0F0F,stroke:#333,stroke-width:2px,color:#fff
    style F fill:#F3F821,stroke:#333,stroke-width:2px
```

## 🛡️ Segurança e Privacidade

- **Processamento Local**: Todos os dados são processados diretamente no seu navegador
- **Sem Armazenamento**: Nenhuma informação é enviada para servidores externos
- **Privacidade Garantida**: Processamento totalmente offline
- **Segurança Total**: Tecnologias modernas de processamento client-side

## 🚀 Como Usar

1. Acesse a aplicação
2. Faça upload do seu arquivo OFX
3. Aguarde o processamento automático
4. Baixe sua planilha Excel convertida

## 💻 Desenvolvimento Local

```bash
# Clone o repositório
git clone https://github.com/ismaelstrey/conversor_ofx.git

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000) no seu navegador.

## 🛠️ Tecnologias

- **Next.js**: Framework React para produção
- **TypeScript**: Tipagem estática para JavaScript
- **TailwindCSS**: Framework CSS utilitário
- **Framer Motion**: Biblioteca de animações
- **xml2js**: Parser XML para processamento OFX
- **ExcelJS**: Geração de arquivos Excel

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

<p align="center">
Feito com 💛 para simplificar sua vida financeira
</p>
