type TSearchQueries = {
 checkinDate: string | null;
 checkoutDate: string | null;
 channelID: string | null;
 providerID: string | null;
 hotelID: string | null;
 arzID: string | null;
};

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

function getRequestData(searchQueries: TSearchQueries): TRequestData {
 const defaultRequest = getDefaultsRequestData();
 const requestData: TRequestData = {
  arzID: Number(searchQueries.arzID) || defaultRequest.arzID || 1,
  providerID:
   Number(searchQueries.providerID) || defaultRequest.providerID || 1,
  channelID: Number(searchQueries.channelID) || defaultRequest.channelID || 1,
  hotelID: Number(searchQueries.hotelID) || defaultRequest.hotelID || 1,
 };
 return requestData;
}

export {
 type TDefaultRequestData,
 type TRequestData,
 type TSearchQueries,
 getDefaultsRequestData,
 getRequestData,
};
