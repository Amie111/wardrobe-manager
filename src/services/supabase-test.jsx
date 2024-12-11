import { supabase } from "../config/supabase";

export const testSupabaseConnection = async () => {
  try {
    // Test basic connection
    const { data: connectionTest, error: connectionError } = await supabase
      .from('outfits')
      .select('*')
      .limit(1);
    
    if (connectionError) {
      console.error('Connection test failed:', connectionError);
      return {
        success: false,
        error: connectionError,
        details: 'Failed to connect to Supabase or access outfits table'
      };
    }

    // Test insert permission
    const testData = {
      name: 'Test Outfit',
      image_urls: [],
      tags: []
    };

    const { data: insertTest, error: insertError } = await supabase
      .from('outfits')
      .insert([testData])
      .select();

    if (insertError) {
      console.error('Insert test failed:', insertError);
      return {
        success: false,
        error: insertError,
        details: 'Failed to insert into outfits table'
      };
    }

    // If we got here, clean up the test data
    if (insertTest && insertTest[0]?.id) {
      await supabase
        .from('outfits')
        .delete()
        .eq('id', insertTest[0].id);
    }

    return {
      success: true,
      details: 'Successfully connected and tested outfits table'
    };
  } catch (error) {
    console.error('Test failed:', error);
    return {
      success: false,
      error,
      details: 'Unexpected error during test'
    };
  }
};
