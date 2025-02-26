import { z } from 'zod';

const defaultValues: Partial<RoomsFilterSchema> = {};

const roomsFilterSchema = z.object({
 fromDate: z.date(),
 untilDate: z.date(),
});

type RoomsFilterSchema = z.infer<typeof roomsFilterSchema>;

export { type RoomsFilterSchema, roomsFilterSchema, defaultValues };
