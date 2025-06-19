
import React from 'react';
import { cn } from "@/lib/utils";

type MessageRole = 'user' | 'assistant';

interface ChatMessageProps {
  content: string;
  role: MessageRole;
  timestamp?: string;
}

const ChatMessage = ({ content, role, timestamp }: ChatMessageProps) => {
  const isUser = role === 'user';

  // Simple markdown-like formatting for Wikipedia responses
  const formatContent = (text: string) => {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-blue-500 hover:text-blue-700 underline">$1</a>')
      .replace(/\n---\n/g, '<hr class="my-4 border-gray-300" />')
      .replace(/\n/g, '<br />');
  };

  return (
    <div className={cn(
      "flex w-full mb-4 animate-fade-in",
      isUser ? "justify-end" : "justify-start"
    )}>
      <div className={cn(
        "max-w-[85%] md:max-w-[75%] rounded-xl p-4",
        isUser 
          ? "bg-primary text-primary-foreground rounded-tr-none" 
          : "bg-muted rounded-tl-none"
      )}>
        <div 
          className="whitespace-pre-wrap break-words"
          dangerouslySetInnerHTML={{ __html: formatContent(content) }}
        />
        {timestamp && (
          <div className={cn(
            "text-xs mt-2 text-right",
            isUser ? "text-primary-foreground/80" : "text-muted-foreground"
          )}>
            {timestamp}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;
