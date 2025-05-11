
import { useState, useCallback } from 'react';

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
      // In a real implementation, this is where you'd call your AI API
      // For now, let's simulate a response after a delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Example response - In a real app, this would come from the API
      const responseOptions = [
        "Olá! Como posso ajudar você hoje?",
        "Interessante pergunta! Vamos explorar esse assunto...",
        "Obrigado por compartilhar isso comigo. Tenho algumas ideias que podem ajudar.",
        "Estou aqui para auxiliar com suas perguntas. Pode me dizer mais?",
        "Entendo o que você está perguntando. Vamos analisar isso juntos."
      ];
      
      const randomResponse = responseOptions[Math.floor(Math.random() * responseOptions.length)];
      addMessage(randomResponse, 'assistant');
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
