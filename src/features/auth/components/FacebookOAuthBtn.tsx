import OAuthBtn from './OAuthButton';
import facebookIcon from '@/assets/img/facebook.png';

export type FacebookOAuthBtnProps = {
  disabled?: boolean;
};

export default function FacebookOAuthBtn({ disabled }: FacebookOAuthBtnProps) {
  return (
    <OAuthBtn disabled={disabled} iconProps={{ src: facebookIcon, alt: 'Facebook' }}>
      Continuer avec Facebook
    </OAuthBtn>
  );
}
