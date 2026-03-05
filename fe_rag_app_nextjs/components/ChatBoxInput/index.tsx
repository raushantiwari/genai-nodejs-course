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

  const { ref, ...rest } = register('message');

  const onSubmit = (data: FormValues) => {
    if (!data.message.trim()) return;

    console.log(data.message);

    reset();

    // reset textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  const autoResize = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(onSubmit)();
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(onSubmit)();
      }}
      className={styles['chat-input']}
    >
      <button type="button" className={styles.plus}>
        {ICONS.PLUS_ICON}
      </button>

      <textarea
        {...rest}
        ref={(e) => {
          ref(e);
          textareaRef.current = e;
        }}
        rows={1}
        placeholder="Ask anything"
        className={styles.textarea}
        onInput={autoResize}
        onKeyDown={handleKeyDown}
      />

      <button type="submit" className={styles.voice}>
        {ICONS.TOP_ARROW}
      </button>
    </form>
  );
};

export default ChatBoxInput;
