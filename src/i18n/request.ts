import { getRequestConfig } from "next-intl/server";
import { cookies } from "next/headers";

export default getRequestConfig(async () => {
  const store = await cookies();
  
  // Get locale from cookie (set by language-toggler component)
  const locale = store.get("locale")?.value || "en";
  
  // Validate locale (only accept 'en' or 'pt')
  const validLocale = ["en", "pt"].includes(locale) ? locale : "en";

  return {
    locale: validLocale,
    messages: (await import(`../../messages/${validLocale}.json`)).default,
  };
});
