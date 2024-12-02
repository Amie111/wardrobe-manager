import { supabase } from '../config/supabase';

// Clothing API
export const getClothing = async () => {
  const { data, error } = await supabase
    .from('clothing')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data;
};

export const getClothingById = async (id) => {
  const { data, error } = await supabase
    .from('clothing')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data;
};

export const addClothing = async (clothingData) => {
  const { data, error } = await supabase
    .from('clothing')
    .insert([clothingData])
    .select();
  
  if (error) throw error;
  return data[0];
};

export const updateClothing = async (id, clothingData) => {
  const { data, error } = await supabase
    .from('clothing')
    .update(clothingData)
    .eq('id', id)
    .select();
  
  if (error) throw error;
  return data[0];
};

export const deleteClothing = async (id) => {
  const { error } = await supabase
    .from('clothing')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
};

// Outfits API
export const getOutfits = async () => {
  const { data, error } = await supabase
    .from('outfits')
    .select(`
      *,
      outfit_clothing (
        clothing (*)
      )
    `)
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data;
};

export const getOutfitById = async (id) => {
  const { data, error } = await supabase
    .from('outfits')
    .select(`
      *,
      outfit_clothing (
        clothing (*)
      )
    `)
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data;
};

export const addOutfit = async (outfitData) => {
  // Start a transaction by using single batch
  const { data: outfit, error: outfitError } = await supabase
    .from('outfits')
    .insert([{
      name: outfitData.name,
      image_urls: outfitData.image_urls,
      tags: outfitData.tags
    }])
    .select();

  if (outfitError) throw outfitError;

  // Add outfit-clothing relationships
  if (outfitData.clothing_ids && outfitData.clothing_ids.length > 0) {
    const relationships = outfitData.clothing_ids.map(clothing_id => ({
      outfit_id: outfit[0].id,
      clothing_id
    }));

    const { error: relationError } = await supabase
      .from('outfit_clothing')
      .insert(relationships);

    if (relationError) throw relationError;
  }

  return outfit[0];
};

export const updateOutfit = async (id, outfitData) => {
  // Update outfit details
  const { data: outfit, error: outfitError } = await supabase
    .from('outfits')
    .update({
      name: outfitData.name,
      image_urls: outfitData.image_urls,
      tags: outfitData.tags
    })
    .eq('id', id)
    .select();

  if (outfitError) throw outfitError;

  // If clothing_ids are provided, update relationships
  if (outfitData.clothing_ids) {
    // Delete existing relationships
    const { error: deleteError } = await supabase
      .from('outfit_clothing')
      .delete()
      .eq('outfit_id', id);

    if (deleteError) throw deleteError;

    // Add new relationships
    if (outfitData.clothing_ids.length > 0) {
      const relationships = outfitData.clothing_ids.map(clothing_id => ({
        outfit_id: id,
        clothing_id
      }));

      const { error: relationError } = await supabase
        .from('outfit_clothing')
        .insert(relationships);

      if (relationError) throw relationError;
    }
  }

  return outfit[0];
};

export const deleteOutfit = async (id) => {
  // The outfit_clothing relationships will be automatically deleted due to ON DELETE CASCADE
  const { error } = await supabase
    .from('outfits')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
};

// Search and Filter Functions
export const searchClothingByTags = async (tags) => {
  const { data, error } = await supabase
    .from('clothing')
    .select('*')
    .contains('tags', tags);
  
  if (error) throw error;
  return data;
};

export const searchOutfitsByTags = async (tags) => {
  const { data, error } = await supabase
    .from('outfits')
    .select(`
      *,
      outfit_clothing (
        clothing (*)
      )
    `)
    .contains('tags', tags);
  
  if (error) throw error;
  return data;
};

export const getClothingByCategory = async (category) => {
  const { data, error } = await supabase
    .from('clothing')
    .select('*')
    .eq('category', category)
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data;
};
