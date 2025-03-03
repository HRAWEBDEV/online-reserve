type TDefaultRequestData = {
 channelID: number | null;
 providerID: number | null;
 hotelID: number | null;
 arzID: number | null;
};

type TRequestData = {
 [key in keyof TDefaultRequestData]: NonNullable<TDefaultRequestData[key]>;
};

function getDefaultsRequestData(): TDefaultRequestData {
 return {
  channelID: Number(process.env.NEXT_PUBLIC_CHANNELID) || null,
  providerID: Number(process.env.NEXT_PUBLIC_PROVIDERID) || null,
  hotelID: Number(process.env.NEXT_PUBLIC_HOTELID) || null,
  arzID: Number(process.env.NEXT_PUBLIC_ARZID) || null,
 };
}

export { type TDefaultRequestData, type TRequestData, getDefaultsRequestData };
