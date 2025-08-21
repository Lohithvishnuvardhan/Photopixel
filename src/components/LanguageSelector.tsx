import { Globe } from 'lucide-react';
import { useLanguage, Language } from '../context/LanguageContext';

const languages = [
  { code: 'en' as Language, name: 'English', flag: '🇺🇸' },
  { code: 'hi' as Language, name: 'हिंदी', flag: '🇮🇳' },
  { code: 'te' as Language, name: 'తెలుగు', flag: '🇮🇳' },
];

export const LanguageSelector = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="relative group">
      <button className="flex items-center space-x-2 text-purple-400 hover:text-purple-300 transition-colors">
        <Globe className="h-5 w-5" />
        <span className="hidden md:block">
          {languages.find(lang => lang.code === language)?.flag}
        </span>
      </button>
      
      <div className="absolute right-0 top-full mt-2 w-48 bg-gray-800 rounded-lg shadow-lg border border-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => setLanguage(lang.code)}
            className={`w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-gray-700 transition-colors first:rounded-t-lg last:rounded-b-lg ${
              language === lang.code ? 'bg-gray-700 text-purple-400' : 'text-gray-300'
            }`}
          >
            <span className="text-lg">{lang.flag}</span>
            <span>{lang.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};