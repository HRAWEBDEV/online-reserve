type TRowWithInternalID = {
 internalID?: number;
};

const generateInternalRow = () => {
 let counter = 0;
 return (row: TRowWithInternalID) => {
  if (!row.internalID) {
   row.internalID = Date.now() + counter;
   ++counter;
  }
  return row.internalID;
 };
};

export { type TRowWithInternalID, generateInternalRow };
