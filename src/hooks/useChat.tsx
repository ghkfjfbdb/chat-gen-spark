
import { useState, useCallback } from 'react';
import { WikipediaService } from '@/services/wikipediaService';
import { DesciclopediaService } from '@/services/desciclopediaService';
import { ElaboratedResponseService } from '@/services/elaboratedResponseService';
import { ContextualResponseService } from '@/services/contextualResponseService';
import { ResponseFormatter } from '@/utils/responseFormatter';

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

  const sendMessage = useCallback(async (messageContent: string) => {
    // Add the user message to the chat
    addMessage(messageContent, 'user');
    
    // Set loading state
    setIsLoading(true);
    
    try {
      // Simulate thinking time
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      let response: string;
      
      // Check if user wants humor mode or Desciclopédia
      if (DesciclopediaService.shouldSearchDesciclopedia(messageContent)) {
        // Extract search terms from the message
        const searchTerms = messageContent
          .replace(/^(o que é|quem é|quando foi|onde fica|como funciona|história de|biografia de|definição de|explicar|me fale sobre|conte sobre|informações sobre)\s*/i, '')
          .replace(/\?$/, '')
          .trim();
        
        if (searchTerms.length > 2) {
          console.log('Buscando na Desciclopédia:', searchTerms);
          const desciclopediaResult = await DesciclopediaService.searchDesciclopedia(searchTerms);
          
          if (desciclopediaResult) {
            response = ResponseFormatter.generateDesciclopediaResponse(desciclopediaResult, messageContent);
          } else {
            response = "Poxa, nem na Desciclopédia eu achei essa maluquice! 😅 Que tal tentar algo mais conhecido ou reformular a pergunta?";
          }
        } else {
          response = ContextualResponseService.generateContextualResponse(messageContent);
        }
      }
      // Check if we should search Wikipedia
      else if (WikipediaService.shouldSearchWikipedia(messageContent)) {
        // Extract search terms from the message
        const searchTerms = messageContent
          .replace(/^(o que é|quem é|quando foi|onde fica|como funciona|história de|biografia de|definição de|explicar|me fale sobre|conte sobre|informações sobre)\s*/i, '')
          .replace(/\?$/, '')
          .trim();
        
        if (searchTerms.length > 2) {
          console.log('Buscando na Wikipedia:', searchTerms);
          const wikipediaResults = await WikipediaService.searchWikipedia(searchTerms);
          response = ResponseFormatter.generateWikipediaResponse(wikipediaResults, messageContent);
        } else {
          response = ContextualResponseService.generateContextualResponse(messageContent);
        }
      } else {
        response = ElaboratedResponseService.generateElaboratedResponse(messageContent);
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
