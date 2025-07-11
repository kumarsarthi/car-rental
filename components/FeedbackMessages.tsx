'use client';

import { useFeedback } from '@/contexts/FeedbackContext';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle, XCircle, Info, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function FeedbackMessages() {
  const { messages, removeMessage } = useFeedback();

  if (messages.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {messages.map((message) => (
        <Alert
          key={message.id}
          className={`w-96 ${
            message.type === 'success' ? 'border-green-500 bg-green-50' :
            message.type === 'error' ? 'border-red-500 bg-red-50' :
            'border-blue-500 bg-blue-50'
          }`}
        >
          {message.type === 'success' && <CheckCircle className="h-4 w-4 text-green-500" />}
          {message.type === 'error' && <XCircle className="h-4 w-4 text-red-500" />}
          {message.type === 'info' && <Info className="h-4 w-4 text-blue-500" />}
          <AlertDescription className="flex items-center justify-between">
            {message.message}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => removeMessage(message.id)}
              className="h-auto p-1 hover:bg-transparent"
            >
              <X className="h-3 w-3" />
            </Button>
          </AlertDescription>
        </Alert>
      ))}
    </div>
  );
}