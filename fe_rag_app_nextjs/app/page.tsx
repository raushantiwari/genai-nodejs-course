import ChatArea from '@/components/ChatAreaSection';
import styles from '@/components/ChatAreaSection/ChatAreaSection.module.scss';
import LeftSideSection from '@/components/LeftSideSection';

const HomePage = () => {
  return (
    <div className={styles.app}>
      <LeftSideSection />
      <main className={styles.chat}>
        <header className={styles['chat-header']}>
          <div className={styles.model}>ChatGPT 5.2 ▼</div>
          <div className={styles.actions}>Share ⋯</div>
        </header>
        <ChatArea />
      </main>
    </div>
  );
};

export default HomePage;
