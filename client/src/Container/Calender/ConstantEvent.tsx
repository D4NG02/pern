import { z } from "zod";

export const inputSchema = z.object({
    title: z.string().min(4, { message: 'Must 4 or more characters' }),
    note: z.string().min(4, { message: 'Must 4 or more characters' }),
    // date: z.string().min(4, { message: 'Must 4 or more characters' }),
    // priority: z.string().min(4, { message: 'Must 4 or more characters' }),
});
export type inputSchemaType = z.infer<typeof inputSchema>;