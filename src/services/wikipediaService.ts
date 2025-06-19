
export interface WikipediaSearchResult {
  title: string;
  extract: string;
  url: string;
}

export class WikipediaService {
  private static readonly BASE_URL = 'https://pt.wikipedia.org/api/rest_v1/page/summary/';
  private static readonly SEARCH_URL = 'https://pt.wikipedia.org/w/api.php';

  static async searchWikipedia(query: string): Promise<WikipediaSearchResult[]> {
    try {
      const searchParams = new URLSearchParams({
        action: 'opensearch',
        search: query,
        limit: '3',
        namespace: '0',
        format: 'json',
        origin: '*'
      });

      const searchResponse = await fetch(`${this.SEARCH_URL}?${searchParams}`);
      const searchData = await searchResponse.json();
      
      if (!searchData[1] || searchData[1].length === 0) {
        return [];
      }

      const results: WikipediaSearchResult[] = [];
      
      for (let i = 0; i < Math.min(2, searchData[1].length); i++) {
        const title = searchData[1][i];
        const summary = await this.getPageSummary(title);
        if (summary) {
          results.push(summary);
        }
      }

      return results;
    } catch (error) {
      console.error('Erro ao buscar na Wikipedia:', error);
      return [];
    }
  }

  static async getPageSummary(title: string): Promise<WikipediaSearchResult | null> {
    try {
      const encodedTitle = encodeURIComponent(title);
      const response = await fetch(`${this.BASE_URL}${encodedTitle}`);
      
      if (!response.ok) {
        return null;
      }

      const data = await response.json();
      
      return {
        title: data.title,
        extract: data.extract || 'Resumo não disponível',
        url: data.content_urls?.desktop?.page || ''
      };
    } catch (error) {
      console.error('Erro ao obter resumo da Wikipedia:', error);
      return null;
    }
  }

  static shouldSearchWikipedia(message: string): boolean {
    const searchKeywords = [
      'o que é', 'quem é', 'quando foi', 'onde fica', 'como funciona',
      'história de', 'biografia de', 'definição de', 'explicar',
      'me fale sobre', 'conte sobre', 'informações sobre'
    ];

    const messageWords = message.toLowerCase();
    return searchKeywords.some(keyword => messageWords.includes(keyword)) ||
           (messageWords.includes('?') && messageWords.length > 10);
  }
}
