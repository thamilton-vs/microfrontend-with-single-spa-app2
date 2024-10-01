import React, { useEffect, useState } from 'react';
import { sendMessage, getMessage } from '@verint/utility';

export default function Root(props) {
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    const subscription = getMessage().subscribe(({ source, message }) => {
      if (source === 'app1') {
        setMessages(prevMessages => [...prevMessages, message]);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleClick = () => {
    const timestamp = new Date().toISOString();
    sendMessage('app2', `Message from app2: ${timestamp}`);
  };

  return (
    <div>
      <section>{props.name} is mounted!</section>
      <button onClick={handleClick}>Send message to app1</button>
      {messages.length > 0 && messages.map((message, idx) => (
        <p key={idx}>{message}</p>
      ))}
    </div>
  );
}