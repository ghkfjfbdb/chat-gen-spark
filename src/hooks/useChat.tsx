import { useState, useCallback } from 'react';
import { WikipediaService, WikipediaSearchResult } from '@/services/wikipediaService';

export type MessageRole = 'user' | 'assistant';

export interface Message {
  id: string;
  content: string;
  role: MessageRole;
  timestamp: string;
}

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const addMessage = useCallback((content: string, role: MessageRole) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      content,
      role,
      timestamp: new Date().toLocaleTimeString(),
    };
    
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    return newMessage;
  }, []);

  const generateContextualResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    // Saudações
    if (message.includes('olá') || message.includes('oi') || message.includes('bom dia') || message.includes('boa tarde') || message.includes('boa noite')) {
      return "Olá! Sou o Alfredo IA e estou aqui para ajudar você. Posso responder perguntas, buscar informações na Wikipedia e muito mais. Como posso ser útil hoje?";
    }
    
    // Perguntas sobre identidade
    if (message.includes('quem é você') || message.includes('o que você é') || message.includes('seu nome')) {
      return "Eu sou o Alfredo IA, um assistente virtual inteligente criado para ajudar e conversar com você. Posso responder perguntas, buscar informações na Wikipedia, dar sugestões e ter conversas interessantes!";
    }
    
    // Perguntas sobre capacidades
    if (message.includes('o que você pode fazer') || message.includes('suas habilidades') || message.includes('capacidades')) {
      return "Posso ajudar com diversas tarefas: responder perguntas, buscar informações atualizadas na Wikipedia, explicar conceitos, dar sugestões, resolver problemas, ter conversas interessantes e muito mais. O que você gostaria de saber ou discutir?";
    }
    
    // Perguntas sobre programação
    if (message.includes('programação') || message.includes('código') || message.includes('javascript') || message.includes('react') || message.includes('html') || message.includes('css')) {
      return "Programação é uma área fascinante! Posso ajudar com explicações sobre linguagens como JavaScript, React, HTML, CSS e outras tecnologias. Tem alguma dúvida específica sobre desenvolvimento?";
    }
    
    // Perguntas sobre como está
    if (message.includes('como você está') || message.includes('tudo bem') || message.includes('como vai')) {
      return "Estou funcionando perfeitamente e pronto para ajudar! Como você está? Em que posso ser útil hoje?";
    }
    
    // Perguntas sobre tempo/clima
    if (message.includes('tempo') || message.includes('clima') || message.includes('chuva') || message.includes('sol')) {
      return "Infelizmente não tenho acesso a informações meteorológicas em tempo real, mas posso conversar sobre outros assuntos! Há algo específico que gostaria de saber?";
    }
    
    // Perguntas sobre matemática
    if (message.includes('matemática') || message.includes('cálculo') || message.includes('soma') || message.includes('divisão') || message.includes('multiplicação')) {
      return "Matemática é uma das minhas especialidades! Posso ajudar com cálculos, explicar conceitos matemáticos ou resolver problemas. Qual é sua dúvida?";
    }
    
    // Perguntas sobre ajuda
    if (message.includes('ajuda') || message.includes('socorro') || message.includes('não sei')) {
      return "Claro, estou aqui para ajudar! Pode me explicar melhor qual é sua dúvida ou problema? Vou fazer o meu melhor para encontrar uma solução.";
    }
    
    // Agradecimentos
    if (message.includes('obrigado') || message.includes('obrigada') || message.includes('valeu') || message.includes('muito obrigado')) {
      return "De nada! Fico feliz em poder ajudar. Se tiver mais alguma dúvida ou quiser conversar sobre outro assunto, estarei aqui!";
    }
    
    // Despedidas
    if (message.includes('tchau') || message.includes('até logo') || message.includes('adeus') || message.includes('bye')) {
      return "Até logo! Foi um prazer conversar com você. Volte sempre que precisar de ajuda ou quiser bater um papo!";
    }
    
    // Perguntas filosóficas ou complexas
    if (message.includes('sentido da vida') || message.includes('felicidade') || message.includes('amor') || message.includes('filosofia')) {
      return "Essa é uma pergunta profunda e interessante! Embora eu seja uma IA e tenha limitações para compreender completamente a experiência humana, posso dizer que muitas pessoas encontram sentido através de relacionamentos, propósito, crescimento pessoal e contribuição para o mundo. O que você pensa sobre isso?";
    }
    
    // Resposta padrão contextual
    const responses = [
      "Interessante pergunta! Embora eu não tenha uma resposta específica para isso, posso tentar buscar informações na Wikipedia. Pode me dar mais detalhes sobre o que você está procurando?",
      "Hmm, essa é uma questão que merece reflexão. Você poderia elaborar um pouco mais sobre o que você tem em mente?",
      "Entendo o que você está perguntando. Posso buscar informações na Wikipedia para te ajudar. Pode me contar mais sobre o contexto?",
      "Boa pergunta! Para te dar uma resposta mais precisa, posso consultar a Wikipedia. Seria útil se você pudesse fornecer mais informações sobre o que especificamente você gostaria de saber.",
      "Vou tentar ajudar da melhor forma possível. Posso buscar informações atualizadas na Wikipedia sobre esse assunto. Pode me explicar um pouco mais sobre o que você está buscando?"
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const generateWikipediaResponse = (results: WikipediaSearchResult[], userMessage: string): string => {
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
  };

  const sendMessage = useCallback(async (messageContent: string) => {
    // Add the user message to the chat
    addMessage(messageContent, 'user');
    
    // Set loading state
    setIsLoading(true);
    
    try {
      // Simulate thinking time
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      let response: string;
      
      // Check if we should search Wikipedia
      if (WikipediaService.shouldSearchWikipedia(messageContent)) {
        // Extract search terms from the message
        const searchTerms = messageContent
          .replace(/^(o que é|quem é|quando foi|onde fica|como funciona|história de|biografia de|definição de|explicar|me fale sobre|conte sobre|informações sobre)\s*/i, '')
          .replace(/\?$/, '')
          .trim();
        
        if (searchTerms.length > 2) {
          console.log('Buscando na Wikipedia:', searchTerms);
          const wikipediaResults = await WikipediaService.searchWikipedia(searchTerms);
          response = generateWikipediaResponse(wikipediaResults, messageContent);
        } else {
          response = generateContextualResponse(messageContent);
        }
      } else {
        response = generateContextualResponse(messageContent);
      }
      
      addMessage(response, 'assistant');
    } catch (error) {
      console.error("Error getting AI response:", error);
      addMessage("Desculpe, ocorreu um erro ao processar sua mensagem. Por favor, tente novamente.", 'assistant');
    } finally {
      setIsLoading(false);
    }
  }, [addMessage]);

  const clearMessages = useCallback(() => {
    setMessages([]);
  }, []);

  return {
    messages,
    isLoading,
    sendMessage,
    clearMessages
  };
}
