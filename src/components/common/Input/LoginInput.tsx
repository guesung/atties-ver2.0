import tw from 'tailwind-styled-components';

interface InputProps {
  type: string;
}

const TYPELIST = {
  id: { type: 'text', content: '아이디 입력' },
  pw: { type: 'password', content: '비밀번호 입력' },
};

export default function LoginInput({ type }: InputProps) {
  return (
    <input
      type={TYPELIST[type]?.type}
      placeholder={TYPELIST[type]?.content}
      className="w-[314px] border-x-0 border-t-0 text-[#AEAEAE] text-[14px]"
    />
  );
}
