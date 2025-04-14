import { z } from 'zod';

const defaultValues: Partial<RoomsFilterSchema> = {
 bedCount: 'all',
 noBreakfast: false,
 fullBoard: false,
 noPenalty: false,
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
});

type RoomsFilterSchema = z.infer<typeof roomsFilterSchema>;

export { type RoomsFilterSchema, roomsFilterSchema, defaultValues };
