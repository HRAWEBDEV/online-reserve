import { z } from 'zod';

const defaultValues: Partial<ReserveInfoSchema> = {
 reserveFirstName: '',
 reserveLastName: '',
 reserveEmail: '',
 reserveNationalCode: '',
 reservePhoneNumber: '',
};

const reserveInfoSchema = z.object({
 reserveFirstName: z.string().min(1, 'این فیلد الزامی است'),
 reserveLastName: z.string().min(1, 'این فیلد الزامی است'),
 reserveNationalCode: z.string(),
 reservePhoneNumber: z.string(),
 reserveEmail: z.string().email('ایمیل معتبر نیست').or(z.literal('')),
 guestInfo: z.array(
  z.object({
   sameAsReserveInfo: z.boolean().default(false),
   halfCheckin: z.boolean().default(false),
   halfCheckout: z.boolean().default(false),
   guestFirstName: z.string().min(1, 'این فیلد الزامی است'),
   guestLastName: z.string().min(1, 'این فیلد الزامی است'),
   guestNationalCode: z.string(),
   guestType: z.enum(['normal', 'foreign']),
   adultCount: z.literal('').or(z.coerce.number()).default(''),
   childCount: z.literal('').or(z.coerce.number()).default(''),
   babyCount: z.literal('').or(z.coerce.number()).default(''),
  })
 ),
});

type ReserveInfoSchema = z.infer<typeof reserveInfoSchema>;

export default reserveInfoSchema;

export { type ReserveInfoSchema, defaultValues, reserveInfoSchema };
