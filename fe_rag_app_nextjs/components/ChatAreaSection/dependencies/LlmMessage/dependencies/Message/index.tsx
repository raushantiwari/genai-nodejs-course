import styles from '@/components/ChatAreaSection/ChatAreaSection.module.scss';
import { ChatMessage } from '@/store/slices/chatSlice';
import { ICONS } from '@/utils/globalSvg';
import React from 'react';

type MessageProps = {
  data: ChatMessage;
};

const Message = ({ data }: MessageProps) => {
  const { question, answer, provider, model } = data;

  return (
    <>
      <div className={`${styles.messageRow} ${styles.user}`}>
        <div className={styles.messageBubble}>{question}</div>
        <div className={styles.icon}>{ICONS.USER_ICON}</div>
      </div>

      <div className={`${styles.messageRow} ${styles.llm}`}>
        <div className={styles.icon}>{ICONS.LLM_ICON}</div>
        <div className={styles.messageBubble}>
          <p>{answer}</p>

          <span className={styles.metadata}>
            {provider} - {model}
          </span>
        </div>
      </div>
    </>
  );
};

export default React.memo(Message);
