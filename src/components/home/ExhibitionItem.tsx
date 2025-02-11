import useDeletePrefer from '@hooks/mutations/useDeletePrefer';
import usePostPrefer from '@hooks/mutations/usePostPrefer';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';

export default React.memo(function ExhibitionItem({
  image,
  education,
  title,
  id,
  pick,
}: KeywordArtwork) {
  const router = useRouter();

  const { mutate: deletePrefer } = useDeletePrefer(+id, router.asPath);
  const { mutate: postPrefer } = usePostPrefer(+id, router.asPath);

  const handlePrefer = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (pick) {
      deletePrefer();
    } else {
      postPrefer();
    }
  };

  return (
    <div
      className="max-[25rem]:h-[10.9375rem] max-[25rem]:w-[9.0625rem] relative h-[12.3125rem] w-[9.875rem] rounded"
      onClick={() => {
        router.push(`/exhibition/${id}`);
      }}
    >
      <Image
        src={image}
        alt="notification"
        fill
        priority
        className="rounded object-cover"
      />

      <div className="h-full w-full rounded bg-gradient-to-b from-[rgba(0,0,0,0)] via-[rgba(0,0,0,0)] to-[rgba(0,0,0,0.5)]">
        <div className="absolute bottom-1 left-2 flex flex-col text-[#FFFFFF]">
          <div className="text-12">{education}</div>
          <div className="text-14 font-bold">{title}</div>
        </div>
      </div>
      <Image
        src={`/svg/icons/heart${pick ? '_filled' : ''}.svg`}
        alt="heart"
        width={30}
        height={30}
        className="absolute right-2 top-2.5 cursor-pointer"
        onClick={handlePrefer}
      />
    </div>
  );
});
