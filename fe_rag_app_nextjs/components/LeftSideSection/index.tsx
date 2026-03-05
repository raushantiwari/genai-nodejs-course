import styles from './LeftSideSection.module.scss';
const LeftSideSection = () => {
  return (
    <aside className={styles.sidebar}>
      <div className={styles['sidebar-header']}>
        <div className={styles.logo}>◎</div>
        <div className={styles.collapse}>☰</div>
      </div>

      <button className={styles['new-chat']}>+ New chat</button>

      <nav className={styles.menu}>
        <div className={`${styles['menu-item']} ${styles.active}`}>Building or Debugging Today</div>
        <div className={styles['menu-item']}>LLM Content Search Tips</div>
        <div className={styles['menu-item']}>Figma Context MCP Setup</div>
        <div className={styles['menu-item']}>Vector DB with PostgreSQL</div>
        <div className={styles['menu-item']}>Data Ingestion Architecture</div>
      </nav>

      <div className={styles.profile}>
        <div className={styles.avatar}></div>
        <div>
          <div className={styles.name}>Raushan Tiwari</div>
          <div className={styles.plan}>Go</div>
        </div>
      </div>
    </aside>
  );
};

export default LeftSideSection;
