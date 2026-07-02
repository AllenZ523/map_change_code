"use strict";

(() => {
  const I18N = Object.freeze({
    "zh-CN": window.SQUAD_I18N_ZH_CN,
    "en-US": window.SQUAD_I18N_EN_US
  });

  const DEFAULT_LOCALE = "zh-CN";
  const LOCALES = Object.freeze(Object.keys(I18N));
  const FALLBACK_LOCALE = LOCALES.includes(DEFAULT_LOCALE) ? DEFAULT_LOCALE : LOCALES[0];

  if (!FALLBACK_LOCALE) {
    throw new Error("配置错误：i18n 必须至少包含一种语言。");
  }

  function interpolate(text, values = {}) {
    return String(text).replace(/\{(\w+)\}/g, (_, key) => (Object.hasOwn(values, key) ? values[key] : `{${key}}`));
  }

  function createRuntime(initialLocale = FALLBACK_LOCALE) {
    let currentLocale = I18N[initialLocale] ? initialLocale : FALLBACK_LOCALE;

    function localeConfig() {
      return I18N[currentLocale] || I18N[FALLBACK_LOCALE];
    }

    function t(key, values = {}) {
      const config = localeConfig();
      const text = config.ui?.[key] ?? I18N[FALLBACK_LOCALE]?.ui?.[key] ?? key;
      return interpolate(text, values);
    }

    function labelFrom(group, key) {
      const config = localeConfig();
      return config[group]?.[key] ?? I18N[FALLBACK_LOCALE]?.[group]?.[key] ?? key;
    }

    function setLocale(locale) {
      currentLocale = I18N[locale] ? locale : FALLBACK_LOCALE;
      return currentLocale;
    }

    return Object.freeze({
      get locale() {
        return currentLocale;
      },
      get config() {
        return localeConfig();
      },
      setLocale,
      t,
      labelFrom
    });
  }

  window.SQUAD_I18N = Object.freeze({
    defaultLocale: DEFAULT_LOCALE,
    locales: LOCALES,
    messages: I18N,
    createRuntime
  });
})();