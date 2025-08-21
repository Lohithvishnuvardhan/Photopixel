import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft, Camera, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import { supabase } from '../utils/supabase';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) {
        toast.error(error.message);
        return;
      }

      setEmailSent(true);
      toast.success('Password reset email sent! Please check your inbox.');
    } catch (error: any) {
      toast.error('An unexpected error occurred');
      console.error('Password reset error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (emailSent) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <Link to="/" className="flex items-center justify-center space-x-3 mb-8">
              <Camera className="h-12 w-12 text-amber-500" strokeWidth={1.5} />
              <span className="text-4xl font-extrabold italic bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-transparent bg-clip-text">
                Photo Pixel
              </span>
            </Link>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-white/20 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-500" />
            </div>
            
            <h2 className="text-2xl font-bold text-white mb-4">Check your email</h2>
            <p className="text-gray-300 mb-6">
              We've sent a password reset link to <strong>{email}</strong>
            </p>
            <p className="text-sm text-gray-400 mb-8">
              Didn't receive the email? Check your spam folder or try again.
            </p>

            <div className="space-y-4">
              <button
                onClick={() => setEmailSent(false)}
                className="w-full py-3 px-4 border border-white/20 rounded-lg text-white bg-white/10 hover:bg-white/20 transition-all duration-300"
              >
                Try different email
              </button>
              
              <Link
                to="/login"
                className="w-full flex justify-center py-3 px-4 bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white rounded-lg transition-all duration-300"
              >
                Back to login
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <Link to="/" className="flex items-center justify-center space-x-3 mb-8">
            <Camera className="h-12 w-12 text-amber-500" strokeWidth={1.5} />
            <span className="text-4xl font-extrabold italic bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-transparent bg-clip-text">
              Photo Pixel
            </span>
          </Link>
          <h2 className="text-3xl font-bold text-white">Forgot your password?</h2>
          <p className="mt-2 text-gray-300">
            Enter your email address and we'll send you a link to reset your password.
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-white/20">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-200 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Enter your email address"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
            >
              {isLoading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
              ) : (
                'Send reset link'
              )}
            </button>
          </form>

          <div className="mt-6">
            <Link
              to="/login"
              className="flex items-center justify-center text-sm text-purple-400 hover:text-purple-300 transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}