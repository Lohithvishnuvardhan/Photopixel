import { supabase, dbHelpers } from './supabase';

/**
 * Utility function to create an admin user for testing
 * This should only be used in development
 */
export const createAdminUser = async (email: string, password: string, name: string) => {
  try {
    // First, sign up the user
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
        }
      }
    });

    if (error) {
      console.error('Error creating user:', error);
      return { success: false, error: error.message };
    }

    if (data.user) {
      // Wait a moment for the profile to be created by the trigger
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update the user's role to admin
      await dbHelpers.updateProfile(data.user.id, {
        role: 'admin'
      });

      console.log('Admin user created successfully:', email);
      return { success: true, user: data.user };
    }

    return { success: false, error: 'User creation failed' };
  } catch (error: any) {
    console.error('Error creating admin user:', error);
    return { success: false, error: error.message };
  }
};

// Helper function to make existing user admin
export const makeExistingUserAdmin = async (userEmail: string) => {
  try {
    // Find the user by email using getProfile (since getUserByEmail does not exist)
    // Assume userEmail is unique and stored as 'email' in the profile
    const profile = await dbHelpers.getProfile(userEmail);
    
    if (!profile) {
      throw new Error('User not found');
    }

    await dbHelpers.updateProfile(profile.id, {
      role: 'admin'
    });

    console.log('User made admin successfully:', userEmail);
    return { success: true };
  } catch (error: any) {
    console.error('Error making user admin:', error);
    return { success: false, error: error.message };
  }
};