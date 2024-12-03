import { supabase } from '../config/supabase.js';

const testSupabaseConnection = async () => {
  try {
    console.log('Testing Supabase connection...');
    const { data, error } = await supabase
      .from('clothing')
      .select('*')
      .limit(1);
    
    if (error) {
      console.error('Supabase connection test failed:', error.message);
      return false;
    }
    
    console.log('Supabase connection successful!');
    console.log('Test data:', data);
    return true;
  } catch (err) {
    console.error('Supabase connection test failed:', err.message);
    return false;
  }
};

// Run the test
testSupabaseConnection();

export default testSupabaseConnection;
