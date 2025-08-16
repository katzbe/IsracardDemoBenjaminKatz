import axios from 'axios';

import { Book } from '../types';
import { BASE_URL } from '../constants/api';

export async function fetchBooks() {
  const { data } = await axios.get<Book[]>(`${BASE_URL}/books`);
  return data;
}
