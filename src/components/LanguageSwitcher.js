// import { useState } from 'react';
// import { Globe } from 'lucide-react';

// const LanguageSwitcher = () => {
//   const [currentLocale, setCurrentLocale] = useState('uk'); // Default to Ukrainian

//   const toggleLocale = () => {
//     const newLocale = currentLocale === 'uk' ? 'en' : 'uk';
//     setCurrentLocale(newLocale);
    
//     // Get current path and replace locale
//     const currentPath = window.location.pathname;
//     const newPath = currentPath.replace(/^\/[a-z]{2}/, `/${newLocale}`);
    
//     // Use window.location for navigation
//     window.location.href = newPath;
//   };

//   return (
//     <button
//       onClick={toggleLocale}
//       className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
//       aria-label={currentLocale === 'uk' ? 'Змінити мову' : 'Switch language'}
//     >
//       <Globe className="w-5 h-5" />
//       <span className="uppercase">{currentLocale}</span>
//     </button>
//   );
// };

// export default LanguageSwitcher;

'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { Globe } from 'lucide-react';

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = (newLocale) => {
    const newPath = pathname.replace(`/${locale}`, `/${newLocale}`);
    router.push(newPath);
  };

  return (
    <div className="relative inline-block">
      <button
        className="flex items-center space-x-2 px-4 py-2 rounded-md hover:bg-gray-100"
        onClick={() => switchLocale(locale === 'en' ? 'uk' : 'en')}
      >
        <Globe className="w-5 h-5" />
        <span>{locale === 'en' ? 'UK' : 'EN'}</span>
      </button>
    </div>
  );
}