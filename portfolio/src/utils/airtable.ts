import Airtable from "airtable";

export const base = new Airtable({
  apiKey: process.env.AIRTABLE_API_KEY as string,
}).base(process.env.AIRTABLE_BASE_ID as string);
