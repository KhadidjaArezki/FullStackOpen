import { z } from 'zod';
import {  Weather, Visibility } from './types';

/* The string method of Zod is used to define the required type (or schema in Zod terms).
 * After that the value (which is of the type unknown) is parsed with the method parse,
 * which returns the value in the required type or throws an exception.
 */

export const NewEntrySchema = z.object({
  weather: z.nativeEnum(Weather),
  visibility: z.nativeEnum(Visibility),
  date: z.string().date(),
  comment: z.string().optional()
});

//export const toNewDiaryEntry = (object: unknown): NewDiaryEntry => {
//  return newEntrySchema.parse(object);
//};


/* isString is a type guard.
 * 'text is string' is a type predicate. The general form of a type predicate is 'parameterName is Type'
 * The following are no longer needed
 
const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isWeather = (param: string): param is Weather => {
  return Object.values(Weather).map(v => v.toString()).includes(param);
};

const isVisibility = (param: string): param is Visibility => {
  return Object.values(Visibility).map(v => v.toString()).includes(param);
};
*/
export default NewEntrySchema;
