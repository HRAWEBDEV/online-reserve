"use client";
import Button from "@mui/material/Button";
import {
  type HotelInfo,
  type Facilities,
} from "../../../../../../services/HotelApiActions";
import HotelFacilities from "./HotelFacilities";
import RoomFacilities from "./RoomFacilities";
import { useState } from "react";

type Props = {
  facilities: Facilities[];
  roomFacilities: Facilities[];
  hotelInfo: HotelInfo | null;
};

const descriptionMaxLength = 100;

export default function Description({
  facilities,
  roomFacilities,
  hotelInfo,
}: Props) {
  const [showMore, setShowMore] = useState(false);
  return (
    <section className="container grid md:grid-cols-2 gap-4 mb-6">
      <article>
        <div className="grid gap-4  lg:text-base justify-items-center grid-cols-4 mb-4">
          <div className="text-center text-primary-dark font-medium">
            <p className="mb-2">ساعت ورود</p>
            <div>{hotelInfo?.checkin}</div>
          </div>
          <div className="text-center text-primary-dark font-medium">
            <p className="mb-2">ساعت خروج</p>
            <div>{hotelInfo?.checkin}</div>
          </div>
          <div className="text-center text-primary-dark font-medium">
            <p className="mb-2">تعداد اتاق</p>
            <div>23</div>
          </div>
          <div className="text-center text-primary-dark font-medium">
            <p className="mb-2">تعداد طبقه</p>
            <div>25</div>
          </div>
        </div>
        <p className="leading-7 text-neutral-500 text-justify">
          {showMore
            ? hotelInfo?.description || ""
            : hotelInfo?.description?.slice(0, descriptionMaxLength) ||
              "" + "..."}
          {hotelInfo?.description?.length &&
            hotelInfo?.description?.length > descriptionMaxLength && (
              <Button
                color="secondary"
                className="!font-medium"
                onClick={() => setShowMore(!showMore)}
              >
                {showMore ? "موارد کمتر" : "موارد بیشتر"}
              </Button>
            )}
        </p>
      </article>
      <article className="grid gap-4 md:grid-cols-2 ">
        <HotelFacilities facilities={facilities} />
        <RoomFacilities facilities={roomFacilities} />
      </article>
    </section>
  );
}
