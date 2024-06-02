import supabase from './supabase';
import { v4 as uuidv4 } from 'uuid';
import { supabaseUrl } from './supabase';

export async function signUp(userData) {
    const { email, password, fullName } = userData;
    console.log('SIGNUP API');

    const { data: newUser, error } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
            data: {
                fullName: fullName,
                avatar: '',
            },
        },
    });

    if (error) throw new Error(error.message);

    console.log(newUser);
    return newUser;
}

export async function login({ email, password }) {
    let { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
    });

    if (error) {
        console.log(error);
        throw new Error(error.message);
    }

    return data;
}

export async function getCurrentUser() {
    const { data: currentSession } = await supabase.auth.getSession();
    // console.log('SESSION', currentSession);
    if (!currentSession.session) return null;

    // next line is heavily questionnable since user info is already in the session
    // can use currentUser = currentSession.user instead
    const { data: currentUser, error } = await supabase.auth.getUser();

    return currentUser?.user;
}

export async function logout() {
    const { error } = await supabase.auth.signOut();
    if (error) throw new Error(error.message);
}

export async function updateCurrentUser({ password, fullName, avatar }) {
    let updateData = {};
    if (password) updateData = { password };
    if (fullName) updateData = { data: { fullName: fullName } };
    // update password or fullName
    const { data: userData, error } = await supabase.auth.updateUser(
        updateData
    );

    if (error) {
        console.log(error);
        throw new Error(error.message);
    }

    // upload avatar to storage
    if (avatar) {
        let imageName = '';

        if (typeof avatar !== 'string') {
            imageName = `${uuidv4()}.jpg`;
        }

        const { error: storageError } = await supabase.storage
            .from('avatars')
            .upload(imageName, avatar);

        if (storageError) {
            console.log(storageError);
            throw new Error(storageError.message);
        }

        // update avatar info in user account
        const { data: userDataWithAvatar, error: updateAvatarError } =
            supabase.auth.updateUser({
                data: {
                    avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${imageName}`,
                },
            });

        if (updateAvatarError) {
            console.log(updateAvatarError);
            throw new Error(updateAvatarError.message);
        }
        return userDataWithAvatar;
    }

    return userData;
}
