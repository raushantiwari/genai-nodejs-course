import { ICONS } from '@/utils/globalSvg';
import styles from '../../ChatAreaSection.module.scss';

const LlmMessage = () => {
  return (
    <div className={`${styles.messageRow} ${styles.llm}`}>
      <div className={styles.icon}>{ICONS.LLM_ICON}</div>

      <div className={styles.messageBubble}>
        Hi there! Im your AI assistant, here to help you with anything you need. Whether its coding,
        debugging, or just some fun conversation, Im ready to assist! 😊
      </div>
    </div>
  );
};

export default LlmMessage;
