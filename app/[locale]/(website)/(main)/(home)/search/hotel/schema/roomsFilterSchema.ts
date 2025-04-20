import { z } from 'zod';

const defaultValues: Partial<RoomsFilterSchema> = {
 bedCount: 'all',
 noBreakfast: false,
 fullBoard: false,
 noPenalty: false,
 ratePlanType: null,
};

const roomsFilterSchema = z.object({
 fromDate: z.date(),
 untilDate: z.date(),
 bedCount: z.union([
  z.literal('all'),
  z.literal('one'),
  z.literal('two'),
  z.literal('more'),
 ]),
 noBreakfast: z.boolean(),
 fullBoard: z.boolean(),
 noPenalty: z.boolean(),
 ratePlanType: z
  .object({
   fName: z.string(),
   ratePlanID: z.number(),
   ratePlanTypeName: z.string(),
   noBreakfast: z.boolean(),
   nonRefundable: z.boolean(),
   minNights: z.number(),
   freeChargeMinibar: z.boolean(),
   withLunch: z.boolean(),
   withDinner: z.boolean(),
   limitedMenu: z.boolean(),
  })
  .nullable(),
});

type RoomsFilterSchema = z.infer<typeof roomsFilterSchema>;

export { type RoomsFilterSchema, roomsFilterSchema, defaultValues };
