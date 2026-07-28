import styles from '@/components/ChatAreaSection/ChatAreaSection.module.scss';
import SafeHtml from '@/components/common/SafeHtml';
import { ChatMessage } from '@/store/slices/chatSlice';
import { ICONS } from '@/utils/globalSvg';
import React from 'react';

type StatusInfo = {
  userInput: string;
  status: 'pending' | 'success';
};

type MessageProps = {
  data?: ChatMessage;
  statusInfo: StatusInfo;
};

const Message = ({ data, statusInfo }: MessageProps) => {
  const isPending = !data && statusInfo.status === 'pending';

  const question = isPending ? statusInfo.userInput : data?.question;
  const answer = data?.answer;
  const sources = data?.sources ?? [];

  return (
    <>
      {/* USER MESSAGE */}
      <div className={`${styles.messageRow} ${styles.user}`}>
        <div className={styles.messageBubble}>{question}</div>
        <div className={styles.icon}>{ICONS.USER_ICON}</div>
      </div>

      {/* LLM RESPONSE */}
      <div className={`${styles.messageRow} ${styles.llm}`}>
        <div className={styles.icon}>{ICONS.LLM_ICON}</div>

        <div className={styles.messageBubble}>
          {isPending
            ? '...'
            : answer && (
                <>
                  <SafeHtml html={answer} />
                  {sources.length > 0 && (
                    <span className={styles.metadata}>
                      {sources.length} source{sources.length > 1 ? 's' : ''}
                    </span>
                  )}
                </>
              )}
        </div>
      </div>
    </>
  );
};

export default React.memo(Message);
