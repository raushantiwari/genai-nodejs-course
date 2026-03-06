import ChatBoxInput from '../ChatBoxInput';
import styles from './ChatAreaSection.module.scss';
import LlmMessage from './dependencies/LlmMessage';

const ChatAreaSection = () => {
  return (
    <div className={styles['chat-wrapper']}>
      <div className={styles['messages']}>
        <LlmMessage />
      </div>
      <div className={styles['input-area']}>
        <ChatBoxInput />
      </div>
    </div>
  );
};

export default ChatAreaSection;
