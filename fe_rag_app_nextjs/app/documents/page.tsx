import styles from '@/components/ChatAreaSection/ChatAreaSection.module.scss';
import LeftSideSection from '@/components/LeftSideSection';
import UploadSection from '@/components/UploadSection';

const DocumentsPage = () => {
  return (
    <div className={styles.app}>
      <LeftSideSection />
      <main className={styles.chat}>
        <UploadSection />
      </main>
    </div>
  );
};

export default DocumentsPage;
