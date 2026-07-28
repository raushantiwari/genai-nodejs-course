'use client';

import { toggleDocumentId } from '@/store/slices/documentsSlice';
import { RootState } from '@/store/store';
import type { DocumentResponse } from '@/types/api';
import { listDocuments } from '@/utils/apiClient';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './AssetsSection.module.scss';

const AssetsSection = () => {
  const [open, setOpen] = useState(false);
  const [documents, setDocuments] = useState<DocumentResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasFetched, setHasFetched] = useState(false);

  const dispatch = useDispatch();
  const selectedDocumentIds = useSelector(
    (state: RootState) => state.documents.selectedDocumentIds,
  );

  const fetchDocuments = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await listDocuments();
      setDocuments(res.items);
      setHasFetched(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load documents');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (open && !hasFetched) {
      fetchDocuments();
    }
  }, [open, hasFetched]);

  const handleToggle = (id: string) => {
    dispatch(toggleDocumentId(id));
  };

  const handleOpen = () => {
    const next = !open;
    setOpen(next);
    if (next && hasFetched) {
      fetchDocuments();
    }
  };

  return (
    <div className={styles.modelWrapper}>
      <button className={styles.modelButton} onClick={handleOpen} type="button">
        Show Assets
        {selectedDocumentIds.length > 0 && (
          <span className={styles.badge}>{selectedDocumentIds.length}</span>
        )}
        <span className={styles.arrow}>▼</span>
      </button>

      {open && (
        <ul className={styles.dropdown}>
          {loading && <li className={styles.empty}>Loading...</li>}
          {error && <li className={styles.empty}>{error}</li>}
          {!loading && !error && documents.length === 0 && (
            <li className={styles.empty}>No documents uploaded</li>
          )}
          {!loading &&
            !error &&
            documents.map((doc) => {
              const isSelected = selectedDocumentIds.includes(doc.id);
              return (
                <li
                  key={doc.id}
                  className={`${styles.option} ${isSelected ? styles.active : ''}`}
                  onClick={() => handleToggle(doc.id)}
                >
                  <input type="checkbox" checked={isSelected} readOnly />
                  <div className={styles.optionLabel}>
                    <span className={styles.filename}>{doc.filename}</span>
                    <span className={styles.status}>
                      {doc.status}
                      {doc.chunk_count > 0 ? ` · ${doc.chunk_count} chunks` : ''}
                    </span>
                  </div>
                </li>
              );
            })}
        </ul>
      )}
    </div>
  );
};

export default AssetsSection;
