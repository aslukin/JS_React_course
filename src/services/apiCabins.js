import supabase, { supabaseUrl } from './supabase';
import { v4 as uuidv4 } from 'uuid';

export async function getCabins() {
    const { data, error } = await supabase.from('cabins').select('*');
    if (error) {
        console.log(error);
        throw new Error(error);
    }
    return data;
}

export async function createCabin(newCabin) {
    // NOTE: should be fixed in case image is a string, not a file information
    let imageName = '';
    let imagePath = '';
    let shouldUploadImage = true;
    if (typeof newCabin.image !== 'string') {
        imageName = newCabin.image ? `${uuidv4()}.jpg` : '';
        imagePath = newCabin.image
            ? `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`
            : '';
    } else {
        imagePath = newCabin.image;
        shouldUploadImage = false;
    }

    // console.log('CREATE CABIN', newCabin);
    const { data, error } = await supabase
        .from('cabins')
        .insert([{ ...newCabin, image: imagePath }])
        .select()
        .single();

    if (error) {
        console.log(error);
        throw new Error(error);
    }

    if (imageName && shouldUploadImage) {
        const { error: errorImg } = await supabase.storage
            .from('cabin-images')
            .upload(imageName, newCabin.image);

        if (errorImg) {
            await supabase.from('cabins').delete().eq('id', data.id);
            console.log(errorImg);
            throw new Error(errorImg);
        }
    }

    return data;
}

export async function updateCabin({ updatedCabin, cabinId }) {
    const imageName = updatedCabin.image ? `${uuidv4()}.jpg` : '';
    const imagePath = updatedCabin.image
        ? `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`
        : '';

    // console.log('UPDATE CABIN', updatedCabin, cabinId);
    const { data, error } = await supabase
        .from('cabins')
        .update({ ...updatedCabin, image: imagePath })
        .eq('id', cabinId)
        .select()
        .single();

    if (error) {
        console.log(error);
        throw new Error(error);
    }
    // console.log('AFETR UPDATE', data);

    if (imageName) {
        const { error: errorImg } = await supabase.storage
            .from('cabin-images')
            .upload(imageName, updatedCabin.image);

        if (errorImg) {
            await supabase.from('cabins').delete().eq('id', data.id);
            console.log(errorImg);
            throw new Error(errorImg);
        }
    }
    return data;
}

export async function deleteCabin(id) {
    const { data, error } = await supabase.from('cabins').delete().eq('id', id);
    if (error) {
        console.log(error);
        throw new Error(error);
    }
    return data;
}
