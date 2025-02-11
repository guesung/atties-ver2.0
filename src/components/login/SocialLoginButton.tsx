import kakao from '@public/svg/social/kakao_logo.svg';
import naver from '@public/svg/social/naver_logo.svg';
import Image from 'next/image';
import Link from 'next/link';
import tw from 'tailwind-styled-components';
import { CONFIG } from '@config';
import { randomString } from '@utils/randomString';

export interface SocialLoginButtonProps {
  kind: 'kakao' | 'naver';
  [key: string]: any;
}

const STATESTRING = randomString(20);

const KaKaoButton = tw.div<SocialLoginButtonProps>`
w-full h-[3.25rem] flex items-center justify-center text-sm rounded-[0.25rem] hover:opacity-90 border border-transparent hover:brand-2 bg-[#F9E000] px-0 text-white leading-3 font-normal
`;

const NaverButton = tw.div<SocialLoginButtonProps>`
w-full h-[3.25rem] flex items-center justify-center text-sm rounded-[0.25rem] hover:opacity-90 border border-transparent text-[#38B1E1E] hover:brand-2 bg-[#02C75A] px-0 text-white leading-3 font-normal
`;

export default function SocialLoginButton({
  kind,
  ...rest
}: SocialLoginButtonProps) {
  return kind === 'kakao' ? (
    <Link
      href={`https://kauth.kakao.com/oauth/authorize?client_id=${CONFIG.API_KEYS.KAKAO}&redirect_uri=${CONFIG.DOMAIN}/auth/kakao/callback&response_type=code`}
    >
      <KaKaoButton {...rest}>
        <Image src={kakao} width={20} height={20} alt="kakao" />
        <span className="ml-2 text-[#3B1E1E]">카카오톡으로 로그인</span>
      </KaKaoButton>
    </Link>
  ) : (
    <Link
      href={`https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${CONFIG.API_KEYS.NAVER}&state=${STATESTRING}&redirect_uri=${CONFIG.DOMAIN}/auth/naver/callback`}
    >
      <NaverButton {...rest}>
        <Image src={naver} width={20} height={20} alt="kakao" />
        <span className="ml-2 text-white">네이버로 로그인</span>
      </NaverButton>
    </Link>
  );
}
