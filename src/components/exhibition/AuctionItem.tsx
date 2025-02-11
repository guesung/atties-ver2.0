import moment from 'moment';
import Image from 'next/image';
import { useRouter } from 'next/router';

interface AuctionListProps {
  auctionList: ExhibitionList;
}

export default function AuctionItem({ auctionList }: AuctionListProps) {
  const router = useRouter();

  const remainedDay = () => {
    const currentDate = moment().unix() * 1000;
    const endDate = moment(auctionList.endDate, 'YYYY-MM-DD').unix() * 1000;
    const diff = moment.duration(endDate - currentDate);
    return diff.days();
  };

  return (
    <div
      className="mb-5 flex cursor-pointer border-b-[0.0625rem] pb-6 last:mb-0"
      onClick={() =>
        router.push(
          `/exhibition/${auctionList.id}`,
        )
      }
    >
      <div className="relative mr-2 h-[6.1875rem] w-[5.125rem] rounded">
        {auctionList.image ? (
          <Image
            src={auctionList.image}
            alt="auction"
            fill
            className="rounded object-cover"
            quality={100}
          />
        ) : (
          <Image
            src="/svg/icons/logo_main.svg"
            alt="auction"
            width={100}
            height={100}
            className="rounded object-cover"
            quality={100}
          />
        )}
      </div>
      <div className="relative flex flex-col justify-center">
        {auctionList.status === 'processing' ? (
          <span className="absolute top-0 flex h-[1.0625rem] w-[2.625rem] items-center justify-center bg-[#FC6554] text-center text-10 text-[#FFFFFF]">
            D-{remainedDay()}
          </span>
        ) : (
          <span className="absolute top-0  flex h-[1.0625rem] w-[2.625rem] items-center justify-center bg-[#191919] text-center text-10 text-[#FFFFFF]">
            종료
          </span>
        )}
        <span className="mt-4 text-16 font-semibold text-[#191919]">
          제 {auctionList.turn}회 아띠즈 경매
        </span>
        <span className="text-14 text-[#767676]">
          작품 수 : {auctionList.artWorkCount}
        </span>
        <span className="text-11 text-[#767676]">
          {auctionList.startDate}~{auctionList.endDate}
        </span>
      </div>
    </div>
  );
}
