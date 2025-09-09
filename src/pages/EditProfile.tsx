import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, Save, ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import { dbHelpers, supabase } from '../utils/supabase';

interface ProfileData {
  id: string;
  name: string;
  email: string;
  phone_number: string;
  address: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
  profile_image?: string;
}

export default function EditProfile() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [profileData, setProfileData] = useState<ProfileData>({
    id: '',
    name: '',
    email: '',
    phone_number: '',
    address: '',
    city: '',
    state: '',
    postal_code: '',
    country: ''
  });

  useEffect(() => {
    if (user) {
      fetchProfileData();
    }
  }, [user]);

  const fetchProfileData = async () => {
    try {
      if (!user) return;
      
      // Get profile (will create one if it doesn't exist)
      const profile = await dbHelpers.getProfile(user.id);
      
      setProfileData({
        id: profile.id,
        name: profile.name || '',
        email: profile.email || user.email || '',
        phone_number: profile.phone_number || '',
        address: profile.address || '',
        city: profile.city || '',
        state: profile.state || '',
        postal_code: profile.postal_code || '',
        country: profile.country || '',
        profile_image: profile.profile_image
      });
    } catch (error) {
      console.error('Error loading profile:', error);
      toast.error('Failed to load profile data: ' + error.message);
      
      // Set fallback data
      setProfileData({
        id: user.id,
        name: user.user_metadata?.name || user.email?.split('@')[0] || '',
        email: user.email || '',
        phone_number: '',
        address: '',
        city: '',
        state: '',
        postal_code: '',
        country: ''
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (!user) return;

      // Update profile in database
      await dbHelpers.updateProfile(user.id, {
        name: profileData.name,
        email: profileData.email,
        phone_number: profileData.phone_number,
        address: profileData.address,
        city: profileData.city,
        state: profileData.state,
        postal_code: profileData.postal_code,
        country: profileData.country,
        updated_at: new Date().toISOString()
      });

      // Update auth user email if changed
      if (profileData.email !== user.email) {
        const { error } = await supabase.auth.updateUser({
          email: profileData.email
        });
        
        if (error) {
          toast.error('Failed to update email: ' + error.message);
        } else {
          toast.success('Profile updated successfully! Please check your email to confirm the new email address.');
        }
      } else {
        toast.success('Profile updated successfully!');
      }
      
      navigate('/profile');
    } catch (error: any) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 to-blue-500 px-6 py-8">
            <button
              onClick={() => navigate('/profile')}
              className="flex items-center text-white mb-6 hover:opacity-80 transition-opacity"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Profile
            </button>
            <div className="flex items-center">
              <div className="relative">
                <div className="h-24 w-24 rounded-full bg-white flex items-center justify-center">
                  {profileData.profile_image ? (
                    <img
                      src={profileData.profile_image}
                      alt="Profile"
                      className="h-24 w-24 rounded-full object-cover"
                    />
                  ) : (
                    <Camera className="h-12 w-12 text-purple-600" />
                  )}
                </div>
                <button className="absolute bottom-0 right-0 bg-purple-600 rounded-full p-2 text-white hover:bg-purple-700 transition-colors">
                  <Camera className="h-4 w-4" />
                </button>
              </div>
              <div className="ml-6">
                <h1 className="text-2xl font-bold text-white">Edit Profile</h1>
                <p className="text-purple-100">Update your personal information</p>
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={profileData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={profileData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">
                  Changing your email will require verification
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone_number"
                  value={profileData.phone_number}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                />
              </div>
            </div>

            <div className="border-t border-gray-200 pt-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Address Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Street Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={profileData.address}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={profileData.city}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    State
                  </label>
                  <input
                    type="text"
                    name="state"
                    value={profileData.state}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Postal Code
                  </label>
                  <input
                    type="text"
                    name="postal_code"
                    value={profileData.postal_code}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Country
                  </label>
                  <input
                    type="text"
                    name="country"
                    value={profileData.country}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={() => navigate('/profile')}
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="flex items-center px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}