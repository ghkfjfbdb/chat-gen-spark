
import React from 'react';

const TypingIndicator = () => {
  return (
    <div className="flex items-center space-x-1 p-4 max-w-[100px] bg-muted rounded-xl rounded-tl-none mb-4">
      <div className="w-2 h-2 bg-muted-foreground/70 rounded-full animate-pulse" style={{ animationDelay: "0ms" }}></div>
      <div className="w-2 h-2 bg-muted-foreground/70 rounded-full animate-pulse" style={{ animationDelay: "300ms" }}></div>
      <div className="w-2 h-2 bg-muted-foreground/70 rounded-full animate-pulse" style={{ animationDelay: "600ms" }}></div>
    </div>
  );
};

export default TypingIndicator;
