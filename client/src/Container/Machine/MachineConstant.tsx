import readXlsxFile from 'read-excel-file'
import Excel from "../../Asset/DataTask3.xlsx";

export const inputSchema = {
  Name: String,
  Index: Number
};
export type inputSchemaType = typeof inputSchema;