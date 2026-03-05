'use server';

import { setOrUpdateCookie } from '@/utils/cookies.helper';

export async function setModelCookie(model: string) {
  await setOrUpdateCookie('selected-model', model, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 3600, // 1 hour in seconds
    sameSite: 'lax',
  });
}
