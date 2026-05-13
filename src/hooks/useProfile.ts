import { useState } from 'react';
import { MOCK_PROFILE, type Profile } from '../data/profile';

export function useProfile() {
  const [profile, setProfile] = useState<Profile | null>(null);

  const signIn = () => setProfile(MOCK_PROFILE);
  const signOut = () => setProfile(null);

  return { profile, signIn, signOut };
}
