import Image from 'next/image';
import React from 'react';
import tw from 'tailwind-styled-components';
import { useRouter } from 'next/router';

interface SuccessBidItemProps {
  biddingItem: SuccessfulBidArtwork;
  [key: string]: any;
  handleOption?: () => void;
}

const SuccessBidItemTag = tw.section<SuccessBidItemProps>`
flex mt-6 border-b last:border-none border-[#EDEDED] pb-6 relative cursor-pointer
`;

export default function SuccessBidItem({
  biddingItem,
  handleOption,
  ...rest
}: SuccessBidItemProps) {
  const router = useRouter();

  return (
    <SuccessBidItemTag
      {...rest}
      onClick={() => {
        router.push('/auction/' + biddingItem.id);
      }}
    >
      <article className="relative h-[6.25rem] w-[5.125rem] overflow-hidden rounded">
        <Image
          alt="example"
          src={biddingItem?.mainImage || '/svg/example/example_picture_col.svg'}
          fill
          className="object-cover"
        />
      </article>
      <article className="ml-3 pt-1">
        <p className="text-12 font-semibold text-[#767676]">
          제 {biddingItem?.turn}회 아띠즈 경매
        </p>
        <p className="mt-1">
          <span className="text-14">{biddingItem?.title}</span>
          <span className="text-12"> | {biddingItem?.artistName}</span>
        </p>
        <div className="mt-[0.0938rem]">
          <p className="text-16 font-semibold text-brand">
            {biddingItem?.finalBiddingPrice}원
          </p>
        </div>
      </article>
    </SuccessBidItemTag>
  );
}
