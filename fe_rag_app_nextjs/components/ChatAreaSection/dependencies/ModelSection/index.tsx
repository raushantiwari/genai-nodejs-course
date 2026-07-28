'use client';

import { setModelCookie } from '@/actions/modelActions';
import type { ModelOption } from '@/types/api';
import { listModels } from '@/utils/apiClient';
import { useEffect, useState, useTransition } from 'react';
import styles from './ModelSection.module.scss';

type ModelChoice = {
  label: string;
  value: string;
};

const toModelChoice = (option: ModelOption): ModelChoice => ({
  label: `${option.model} (${option.provider})`,
  value: `${option.provider}|${option.model}`,
});

const ModelSection = () => {
  const [open, setOpen] = useState(false);
  const [models, setModels] = useState<ModelChoice[]>([]);
  const [selected, setSelected] = useState<ModelChoice | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    let cancelled = false;

    listModels()
      .then((res) => {
        if (cancelled) return;

        const available = res.models.filter((m) => m.available).map(toModelChoice);
        setModels(available);

        if (available.length > 0) {
          setSelected((prev) => prev ?? available[0]);
          void setModelCookie(available[0].value);
        }
      })
      .catch((err: Error) => {
        if (!cancelled) {
          setError(err.message || 'Failed to load models');
        }
      });

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSelect = (model: ModelChoice) => {
    startTransition(() => {
      setSelected(model);
      setModelCookie(model.value);
      setOpen(false);
    });
  };

  return (
    <div className={styles.modelWrapper}>
      <button
        disabled={isPending || models.length === 0}
        className={styles.modelButton}
        onClick={() => setOpen(!open)}
      >
        {error ? 'Models unavailable' : selected?.label || 'Loading models...'}
        <span className={styles.arrow}>▼</span>
      </button>

      {open && models.length > 0 && (
        <ul className={styles.dropdown}>
          {models.map((model) => (
            <li
              key={model.value}
              onClick={() => handleSelect(model)}
              className={`${styles.option} ${selected?.value === model.value ? styles.active : ''}`}
            >
              {model.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ModelSection;
