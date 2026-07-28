'use client';

import { sendMessage } from '@/actions/chatActions';
import { addMessage } from '@/store/slices/chatSlice';
import { RootState } from '@/store/store';
import { ICONS } from '@/utils/globalSvg';
import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuid } from 'uuid';
import styles from './ChatBoxInput.module.scss';

type FormValues = {
  message: string;
};

type ChatBoxInputProps = {
  onLLMStatusChange?: (input: string, status: 'pending' | 'success') => void;
};

const ChatBoxInput = ({ onLLMStatusChange }: ChatBoxInputProps) => {
  const { register, handleSubmit, reset } = useForm<FormValues>();

  const dispatch = useDispatch();
  const selectedDocumentIds = useSelector(
    (state: RootState) => state.documents.selectedDocumentIds,
  );

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const { ref, ...rest } = register('message');

  const onSubmit = (data: FormValues) => {
    if (!data.message.trim()) return;

    if (onLLMStatusChange) {
      onLLMStatusChange(data.message, 'pending');
    }

    sendMessage(data.message, selectedDocumentIds)
      .then((res) => {
        if (res && res.answer) {
          if (onLLMStatusChange) {
            onLLMStatusChange(data.message, 'success');
          }
          dispatch(
            addMessage({
              id: uuid(),
              question: data.message,
              answer: res.answer,
              sources: res.sources ?? [],
              createdAt: Date.now(),
            }),
          );
        }
      })
      .catch((err: Error) => {
        if (onLLMStatusChange) {
          onLLMStatusChange(data.message, 'success');
        }
        dispatch(
          addMessage({
            id: uuid(),
            question: data.message,
            answer: `Error: ${err.message || 'Failed to get response'}`,
            sources: [],
            createdAt: Date.now(),
          }),
        );
      });

    reset();

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
