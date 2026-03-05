import { ICONS } from '@/utils/globalSvg';
import styles from '../../ChatAreaSection.module.scss';

const UserInput = () => {
  return (
    <div className={`${styles.messageRow} ${styles.user}`}>
      <div className={styles.messageBubble}>
        Hey who are you? Can you tell me a joke? I am in a mood for some humor! 😂
      </div>

      <div className={styles.icon}>{ICONS.USER_ICON}</div>
    </div>
  );
};

export default UserInput;
