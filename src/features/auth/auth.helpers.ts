import { User } from '@supabase/supabase-js';

import { UserMetaData } from './auth';

export function getUserEmail(user: User): string | null {
  return user.email ?? (user.user_metadata as UserMetaData).email ?? null;
}
