'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface FeedbackMessage {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
}

interface FeedbackContextType {
  messages: FeedbackMessage[];
  addMessage: (type: FeedbackMessage['type'], message: string) => void;
  removeMessage: (id: string) => void;
}

const FeedbackContext = createContext<FeedbackContextType | undefined>(undefined);

export function FeedbackProvider({ children }: { children: ReactNode }) {
  const [messages, setMessages] = useState<FeedbackMessage[]>([]);

  const addMessage = (type: FeedbackMessage['type'], message: string) => {
    const id = Date.now().toString();
    const newMessage: FeedbackMessage = { id, type, message };
    setMessages(prev => [...prev, newMessage]);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
      removeMessage(id);
    }, 5000);
  };

  const removeMessage = (id: string) => {
    setMessages(prev => prev.filter(msg => msg.id !== id));
  };

  return (
    <FeedbackContext.Provider value={{ messages, addMessage, removeMessage }}>
      {children}
    </FeedbackContext.Provider>
  );
}

export function useFeedback() {
  const context = useContext(FeedbackContext);
  if (context === undefined) {
    throw new Error('useFeedback must be used within a FeedbackProvider');
  }
  return context;
}