import OAuthBtn from './OAuthButton';
import googleIcon from '@/assets/img/google.png';

export type GoogleOAuthBtnProps = {
  disabled?: boolean;
};

export default function GoogleOAuthBtn({ disabled }: GoogleOAuthBtnProps) {
  return (
    <OAuthBtn disabled={disabled} iconProps={{ src: googleIcon, alt: 'Google' }}>
      Continuer avec Google
    </OAuthBtn>
  );
}
