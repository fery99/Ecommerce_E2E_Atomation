import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';
import usersJson from '../test-data/users.json';
import productsJson from '../test-data/products.json';

export const users = usersJson.valid;
export const invalidLogins = usersJson.invalid;
export const products = productsJson;

export interface CheckoutRow {
  id: string;
  firstName: string;
  lastName: string;
  postalCode: string;
  expectedError: string;
}

export function loadCheckoutData(): CheckoutRow[] {
  const file = path.join(__dirname, '..', 'test-data', 'checkout.csv');
  return parse(fs.readFileSync(file), { columns: true, skip_empty_lines: true });
}
