'use client';

import { ICONS } from '@/utils/globalSvg';
import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import styles from './ChatBoxInput.module.scss';

type FormValues = {
  message: string;
};

const ChatBoxInput = () => {
  const { register, handleSubmit, reset } = useForm<FormValues>();

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const onSubmit = (data: FormValues) => {
    console.log(data.message);
    reset();
  };

  const autoResize = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles['chat-input']}>
      <button type="button" className={styles.plus}>
        {ICONS.PLUS_ICON}
      </button>

      <textarea
        {...register('message')}
        ref={(e) => {
          register('message').ref(e);
          textareaRef.current = e;
        }}
        rows={1}
        placeholder="Ask anything"
        className={styles.textarea}
        onInput={autoResize}
      />

      <button type="submit" className={styles.voice}>
        {ICONS.TOP_ARROW}
      </button>
    </form>
  );
};

export default ChatBoxInput;
