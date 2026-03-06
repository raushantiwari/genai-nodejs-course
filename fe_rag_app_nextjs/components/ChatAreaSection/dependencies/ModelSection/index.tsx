'use client';

import { setModelCookie } from '@/actions/modelActions';
import { useState, useTransition } from 'react';
import styles from './ModelSection.module.scss';

const models = [
  { label: 'GPT-4o Mini (OpenAI)', value: 'openai|gpt-4o-mini' },
  { label: 'GPT-4.1 Nano (OpenAI)', value: 'openai|gpt-4.1-nano' },
  { label: 'GPT-5 Nano (OpenAI)', value: 'openai|gpt-5-nano' },
  { label: 'Gemma 3 (Ollama)', value: 'ollama|gemma3' },
  { label: 'Groq LLM', value: 'groq|llama-3.3-70b-versatile' },
];

const ModelSection = () => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(models[3]);

  const [isPending, startTransition] = useTransition();

  const handleSelect = (model: (typeof models)[0]) => {
    startTransition(() => {
      setSelected(model);
      setModelCookie(model.value);
      setOpen(false);
    });
  };
  return (
    <div className={styles.modelWrapper}>
      <button disabled={isPending} className={styles.modelButton} onClick={() => setOpen(!open)}>
        {selected.label}
        <span className={styles.arrow}>▼</span>
      </button>

      {open && (
        <ul className={styles.dropdown}>
          {models.map((model) => (
            <li
              key={model.value}
              onClick={() => handleSelect(model)}
              className={`${styles.option} ${selected.value === model.value ? styles.active : ''}`}
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
