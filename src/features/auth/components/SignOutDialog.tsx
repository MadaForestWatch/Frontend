import LogoutIcon from '@mui/icons-material/Logout';

import { useAuthStore } from '../auth.store';
import ConfirmationDialog from '@/components/ConfirmationDialog';

export default function SignOutDialog() {
  const { signOutModalOpen, toggleSignOutModal, signOut } = useAuthStore();

  async function handleSignOut() {
    signOut();
    toggleSignOutModal(false);
  }

  return (
    <ConfirmationDialog
      open={signOutModalOpen}
      title="Log out"
      titleIcon={<LogoutIcon />}
      confirmBtnLabel="Déconnexion"
      onClose={() => toggleSignOutModal(false)}
      onConfirm={handleSignOut}
    >
      Voulez-vous vraiment vous déconnecter?
    </ConfirmationDialog>
  );
}
