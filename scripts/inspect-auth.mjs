import 'dotenv/config';
import { auth } from '../lib/auth.js';

console.log('auth.api keys:', Object.keys(auth.api || {}));
console.log('auth.routes:', auth.api);
