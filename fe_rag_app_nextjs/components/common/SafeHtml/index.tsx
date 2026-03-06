'use client';

import DOMPurify from 'dompurify';

type SafeHtmlProps = {
  html: string;
  className?: string;
};

const SafeHtml = ({ html, className }: SafeHtmlProps) => {
  const sanitizedHtml = DOMPurify.sanitize(html);

  return <div className={className} dangerouslySetInnerHTML={{ __html: sanitizedHtml }} />;
};

export default SafeHtml;
