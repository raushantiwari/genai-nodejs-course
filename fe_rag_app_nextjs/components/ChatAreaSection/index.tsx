'use client';

import { useState } from 'react';
import ChatBoxInput from '../ChatBoxInput';
import styles from './ChatAreaSection.module.scss';
import LlmMessage from './dependencies/LlmMessage';

export type LLMStatus = 'pending' | 'success';

type LLMState = {
  userInput: string;
  status: LLMStatus;
};

const ChatAreaSection = () => {
  const [llmStatus, setLlmStatus] = useState<LLMState>({
    userInput: '',
    status: 'pending',
  });

  const handleLLMEvent = (input: string, status: LLMStatus) => {
    setLlmStatus({
      userInput: input,
      status,
    });
  };

  return (
    <div className={styles['chat-wrapper']}>
      <div className={styles['messages']}>
        <LlmMessage statusInfo={llmStatus} />
      </div>

      <div className={styles['input-area']}>
        <ChatBoxInput onLLMStatusChange={handleLLMEvent} />
      </div>
    </div>
  );
};

export default ChatAreaSection;
