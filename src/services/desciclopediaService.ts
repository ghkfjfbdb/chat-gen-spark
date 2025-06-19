
export interface DesciclopediaResult {
  title: string;
  extract: string;
  url: string;
}

export class DesciclopediaService {
  private static readonly BASE_URL = 'https://desciclopedia.org/wiki/';

  static async searchDesciclopedia(query: string): Promise<DesciclopediaResult | null> {
    try {
      // Para demonstração, vamos simular o comportamento da Desciclopédia
      // Em um ambiente real, você usaria web scraping ou proxy server
      const mockResponses: { [key: string]: DesciclopediaResult } = {
        'brasil': {
          title: 'Brasil',
          extract: 'O Brasil é um país tropical localizado na América do Sul que foi descoberto por acidente quando Pedro Álvares Cabral estava procurando as Índias e acabou se perdendo. É famoso por ter inventado o futebol (segundo os brasileiros), a caipirinha e por ser o único país onde é normal comer pizza com garfo e faca.',
          url: 'https://desciclopedia.org/wiki/Brasil'
        },
        'napoleão': {
          title: 'Napoleão Bonaparte',
          extract: 'Napoleão Bonaparte foi um general francês baixinho que decidiu compensar sua altura conquistando meio mundo. Famoso por colocar a mão no peito (provavelmente porque estava com azia) e por ter perdido para o inverno russo, que até hoje é considerado o melhor general da história.',
          url: 'https://desciclopedia.org/wiki/Napoleão_Bonaparte'
        },
        'einstein': {
          title: 'Albert Einstein',
          extract: 'Albert Einstein foi um físico alemão com cabelo de maluco que descobriu que E=mc² (embora ninguém saiba direito o que isso significa). Ficou famoso por mostrar a língua em fotos e por provar que o tempo é relativo - especialmente na segunda-feira de manhã.',
          url: 'https://desciclopedia.org/wiki/Albert_Einstein'
        }
      };

      const searchTerm = query.toLowerCase();
      const foundKey = Object.keys(mockResponses).find(key => 
        searchTerm.includes(key) || key.includes(searchTerm)
      );

      if (foundKey) {
        return mockResponses[foundKey];
      }

      return null;
    } catch (error) {
      console.error('Erro ao buscar na Desciclopédia:', error);
      return null;
    }
  }

  static shouldSearchDesciclopedia(message: string): boolean {
    const humorKeywords = [
      'engraçado', 'zoeira', 'humor', 'piada', 'zoando', 'gozação',
      'me faz rir', 'conte uma piada', 'seja engraçado', 'modo zoeira',
      'desciclopédia', 'desinciclopédia'
    ];

    const messageWords = message.toLowerCase();
    return humorKeywords.some(keyword => messageWords.includes(keyword));
  }
}
