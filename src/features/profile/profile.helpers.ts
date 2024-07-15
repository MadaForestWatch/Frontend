import { Profile } from './profile';

export function getFullName(profile: Profile) {
  return profile.firstname + ' ' + profile.lastname;
}
