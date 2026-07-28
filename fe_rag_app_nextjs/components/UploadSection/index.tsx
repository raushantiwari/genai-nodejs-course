'use client';

import type { DocumentResponse } from '@/types/api';
import { deleteDocument, listDocuments, uploadDocument } from '@/utils/apiClient';
import Link from 'next/link';
import { FormEvent, useCallback, useEffect, useState } from 'react';
import styles from './UploadSection.module.scss';

const UploadSection = () => {
  const [file, setFile] = useState<File | null>(null);
  const [documents, setDocuments] = useState<DocumentResponse[]>([]);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const fetchDocuments = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await listDocuments();
      setDocuments(res.items);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load documents');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDocuments();
  }, [fetchDocuments]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!file) {
      setError('Please select a file to upload');
      return;
    }

    setUploading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const uploaded = await uploadDocument(file);
      setSuccessMessage(
        `Uploaded "${uploaded.filename}" — status: ${uploaded.status}`,
      );
      setFile(null);
      await fetchDocuments();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (documentId: string) => {
    setError(null);
    try {
      await deleteDocument(documentId);
      setDocuments((prev) => prev.filter((doc) => doc.id !== documentId));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Delete failed');
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Documents</h1>
          <p className={styles.subtitle}>Upload files for RAG retrieval</p>
        </div>
        <Link href="/" className={styles.backLink}>
          ← Back to chat
        </Link>
      </div>

      <form className={styles.uploadCard} onSubmit={handleSubmit}>
        <label className={styles.fileLabel} htmlFor="document-upload">
          Choose file
        </label>
        <input
          id="document-upload"
          type="file"
          className={styles.fileInput}
          onChange={(e) => setFile(e.target.files?.[0] ?? null)}
        />
        {file && <p className={styles.selectedFile}>Selected: {file.name}</p>}

        <button type="submit" className={styles.uploadButton} disabled={uploading || !file}>
          {uploading ? 'Uploading...' : 'Upload document'}
        </button>
      </form>

      {error && <p className={styles.error}>{error}</p>}
      {successMessage && <p className={styles.success}>{successMessage}</p>}

      <section className={styles.listSection}>
        <div className={styles.listHeader}>
          <h2>Uploaded documents</h2>
          <button type="button" className={styles.refreshButton} onClick={fetchDocuments}>
            Refresh
          </button>
        </div>

        {loading && <p className={styles.muted}>Loading...</p>}
        {!loading && documents.length === 0 && (
          <p className={styles.muted}>No documents yet. Upload one above.</p>
        )}

        <ul className={styles.docList}>
          {documents.map((doc) => (
            <li key={doc.id} className={styles.docItem}>
              <div className={styles.docInfo}>
                <span className={styles.docName}>{doc.filename}</span>
                <span className={styles.docMeta}>
                  {doc.status} · {doc.extension}
                  {doc.chunk_count > 0 ? ` · ${doc.chunk_count} chunks` : ''}
                </span>
                {doc.error_message && (
                  <span className={styles.docError}>{doc.error_message}</span>
                )}
              </div>
              <button
                type="button"
                className={styles.deleteButton}
                onClick={() => handleDelete(doc.id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default UploadSection;
