import { z } from 'zod';

const defaultValues: Partial<ReserveInfoSchema> = {
 reserveFirstName: '',
 reserveLastName: '',
 reserveEmail: '',
 reserveNationalCode: '',
 reservePhoneNumber: '',
 guestInfo: [],
};

const reserveInfoSchema = z
 .object({
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
    guestFirstName: z.string(),
    guestLastName: z.string(),
    guestNationalCode: z.string(),
    guestType: z.enum(['normal', 'foreign']).default('normal'),
    adultCount: z.literal('').or(z.coerce.number()).default(''),
    childCount: z.literal('').or(z.coerce.number()).default(''),
    babyCount: z.literal('').or(z.coerce.number()).default(''),
   })
  ),
 })
 .superRefine(({ guestInfo }, ctx) => {
  console.log('here');
  guestInfo.forEach((guest, i) => {
   if (guest.sameAsReserveInfo) return;
   if (!guest.guestFirstName) {
    ctx.addIssue({
     code: z.ZodIssueCode.custom,
     message: 'این فیلد الزامی است',
     path: [`guestInfo[${i}].guestFirstName`],
    });
   }
   if (!guest.guestLastName) {
    ctx.addIssue({
     code: z.ZodIssueCode.custom,
     message: 'این فیلد الزامی است',
     path: [`guestInfo[${i}].guestLastName`],
    });
   }
  });
 });

type ReserveInfoSchema = z.infer<typeof reserveInfoSchema>;

export default reserveInfoSchema;

export { type ReserveInfoSchema, defaultValues, reserveInfoSchema };
