import styles from './ChatBoxInput.module.scss';
const ChatBoxInput = () => {
  return (
    <div className={styles['chat-input']}>
      <div>
        <button className={styles.plus}>+</button>
      </div>
      <div className={styles.inputbox}>
        <input type="text" placeholder="Ask anything" />
      </div>
      <div>
        <button className={styles.voice}>🎤</button>
      </div>
    </div>
  );
};

export default ChatBoxInput;
