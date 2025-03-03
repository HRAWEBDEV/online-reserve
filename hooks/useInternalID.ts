import { type TRowWithInternalID } from '@/utils/getGridInternalID';
import { useRef } from 'react';

export const useInternalID = () => {
 const counter = useRef(0);
 const getID = (row: TRowWithInternalID) => {
  if (!row.internalID) {
   row.internalID = Date.now() + counter.current;
   ++counter.current;
  }
  return row.internalID;
 };
 return { getID };
};
