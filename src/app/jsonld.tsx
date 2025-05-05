import { Metadata } from 'next';

export default function JsonLd() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    'name': 'Conversor OFX - Gerador de Relatórios Financeiros',
    'description': 'Ferramenta online gratuita para converter arquivos OFX em relatórios financeiros detalhados. Processe extratos bancários e gere análises de transações facilmente.',
    'applicationCategory': 'FinanceApplication',
    'operatingSystem': 'All',
    'offers': {
      '@type': 'Offer',
      'price': '0',
      'priceCurrency': 'BRL'
    },
    'featureList': [
      'Processamento de arquivos OFX',
      'Geração de relatórios financeiros',
      'Análise de transações bancárias',
      'Interface intuitiva',
      'Processamento local seguro'
    ],
    'author': {
      '@type': 'Organization',
      'name': 'Conversor OFX'
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}