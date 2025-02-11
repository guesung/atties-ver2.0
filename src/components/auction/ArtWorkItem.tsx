import { priceToString } from '@utils/priceToString';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import tw from 'tailwind-styled-components';

interface ArtWorkItemProps extends NowAuctionArtwork {
  [key: string]: any;
}
interface defaultProps {
  [key: string]: any;
}
const ArtWorkItemTag = tw.div<defaultProps>`
w-full h-[16.5rem] bg-[#FFFFFF] rounded-xl relative shadow-lg shadow-slate-100 mb-5 cursor-pointer
`;
export default function ArtWorkItem({
  id,
  mainImage,
  title,
  artWorkSize,
  productionYear,
  topPrice,
  material,
  ...rest
}: ArtWorkItemProps) {
  return (
    <Link href={`/auction/${id}`}>
      <ArtWorkItemTag {...rest}>
        <section className="relative h-[12.5rem] overflow-hidden">
          <Image
            alt="image"
            src={mainImage}
            quality={100}
            fill
            className="rounded-xl object-cover"
          />
        </section>
        <section className="absolute inset-x-0 bottom-0 m-auto rounded-b-xl bg-white px-3 py-4">
          <article className="text-16 font-medium">
            {title.length > 20 ? `${title.slice(0, 20)}...` : title}
          </article>
          <article className="my-1 flex gap-2 text-14 text-[#767676]">
            <span>{material}</span>|
            <span>
              {`${artWorkSize.width}x${artWorkSize.length}x${
                artWorkSize.height
              }cm ${artWorkSize.size && '(' + artWorkSize.size + ')'}`}
            </span>
            |<span>{productionYear}</span>
          </article>
          <article className="flex items-center gap-2">
            <span className="text-18 font-bold">{`${priceToString(
              topPrice,
            )}원`}</span>
            <span className="text-14">현재가</span>
          </article>
        </section>
      </ArtWorkItemTag>
    </Link>

  );
}
