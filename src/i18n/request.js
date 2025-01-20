// i18n/request.js
export default function getRequestConfig() {
    return {
      messages: async ({requestLocale}) => {
        const locale = await requestLocale;
        return (await import(`../messages/${locale}.json`)).default;
      }
    };
  }