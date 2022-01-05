import React from "react";
import {useLang} from "./Metronici18n";
import {IntlProvider} from "react-intl";
import "@formatjs/intl-relativetimeformat/polyfill";
import "@formatjs/intl-relativetimeformat/dist/locale-data/fr";
import frMessages from "./messages/fr";

const allMessages = {
  fr: frMessages,
};

export function I18nProvider({ children }) {
  const locale = useLang();
  const messages = allMessages['fr'];

  return (
    <IntlProvider locale={locale} messages={messages}>
      {children}
    </IntlProvider>
  );
}
