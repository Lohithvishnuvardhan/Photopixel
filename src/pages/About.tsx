import { useLanguage } from '../context/LanguageContext';

const About = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">{t('about.title')}</h1>
          
          <div className="prose lg:prose-xl">
            <p className="text-lg mb-6">
              {t('about.intro')}
            </p>
            
            <div className="my-8">
              <img
                src="https://images.unsplash.com/photo-1452696193712-6cabf5103b63?auto=format&fit=crop&q=80"
                alt="Camera store"
                className="w-full h-[400px] object-cover rounded-lg"
              />
            </div>

            <h2 className="text-2xl font-bold mb-4">{t('about.mission.title')}</h2>
            <p className="mb-6">
              {t('about.mission.desc')}
            </p>

            <h2 className="text-2xl font-bold mb-4">{t('about.why.title')}</h2>
            <ul className="list-disc pl-6 mb-6">
              <li>{t('about.why.expert')}</li>
              <li>{t('about.why.curated')}</li>
              <li>{t('about.why.prices')}</li>
              <li>{t('about.why.warranty')}</li>
              <li>{t('about.why.shipping')}</li>
            </ul>

            <h2 className="text-2xl font-bold mb-4">{t('about.guarantee.title')}</h2>
            <p className="mb-6">
              {t('about.guarantee.desc')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;