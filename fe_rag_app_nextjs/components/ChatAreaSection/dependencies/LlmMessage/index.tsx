'use client';

import { RootState } from '@/store/store';
import { useSelector } from 'react-redux';
import Message from './dependencies/Message';

type StatusInfo = {
  userInput: string;
  status: 'pending' | 'success';
};

type LlmMessageProps = {
  statusInfo: StatusInfo;
};

const LlmMessage = ({ statusInfo }: LlmMessageProps) => {
  const chatMessages = useSelector((state: RootState) => state.chat.messages);

  return (
    <>
      {/* Existing chat messages */}
      {chatMessages.map((msg) => (
        <Message key={msg.id} data={msg} statusInfo={{ userInput: '', status: 'success' }} />
      ))}

      {/* Pending message */}
      {statusInfo.status === 'pending' && <Message statusInfo={statusInfo} />}
    </>
  );
};

export default LlmMessage;
