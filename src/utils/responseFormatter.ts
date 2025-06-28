
import { WikipediaSearchResult } from '@/services/wikipediaService';
import { DesciclopediaResult } from '@/services/desciclopediaService';

export class ResponseFormatter {
  static generateWikipediaResponse(results: WikipediaSearchResult[], userMessage: string): string {
    if (results.length === 0) {
      return "Desculpe, não encontrei informações relevantes na Wikipedia sobre esse assunto. Posso tentar ajudar de outra forma ou você pode reformular sua pergunta.";
    }

    let response = "Com base nas informações da Wikipedia:\n\n";
    
    results.forEach((result, index) => {
      if (index > 0) response += "\n---\n\n";
      response += `**${result.title}**\n${result.extract}`;
      if (result.url) {
        response += `\n\n[Leia mais na Wikipedia](${result.url})`;
      }
    });

    response += "\n\nEspero ter ajudado! Se tiver mais dúvidas, fique à vontade para perguntar.";
    
    return response;
  }

  static generateDesciclopediaResponse(result: DesciclopediaResult, userMessage: string): string {
    let response = "Modo zoeira ativado! 😄 Aqui vai uma versão mais descontraída:\n\n";
    
    response += `**${result.title}** (versão Desciclopédia)\n${result.extract}`;
    
    if (result.url) {
      response += `\n\n[Veja mais besteiras na Desciclopédia](${result.url})`;
    }

    response += "\n\n😂 Lembre-se: isso é só humor! Para informações sérias, é melhor consultar a Wikipedia tradicional.";
    
    return response;
  }
}
