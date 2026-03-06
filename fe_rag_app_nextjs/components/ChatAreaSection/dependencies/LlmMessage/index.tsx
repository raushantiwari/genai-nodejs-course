'use client';

import { RootState } from '@/store/store';
import { useSelector } from 'react-redux';
import Message from './dependencies/Message';

const LlmMessage = () => {
  const chatMessages = useSelector((state: RootState) => state.chat.messages);

  return (
    <>
      {chatMessages.map((msg) => (
        <Message key={msg.id} data={msg} />
      ))}
    </>
  );
};

export default LlmMessage;
