// Load environment variables
import dotenv from 'dotenv';
dotenv.config();

// Import and run test
import('./src/services/supabase-test.js').then(() => {
  // Keep process alive for a moment to see results
  setTimeout(() => process.exit(), 1000);
}).catch(err => {
  console.error('Failed to run test:', err);
  process.exit(1);
});
