import React, {useMemo} from "react";
import {useHtmlClassService} from "../../_core/MetronicLayout";
import { useIntl } from "react-intl";

export function Footer() {
  const today = new Date().getFullYear();
  const uiService = useHtmlClassService();
  const intl = useIntl();

  const layoutProps = useMemo(() => {
    return {
      footerClasses: uiService.getClasses("footer", true),
      footerContainerClasses: uiService.getClasses("footer_container", true)
    };
  }, [uiService]);

  return (
    <div
      className={`footer bg-white py-4 d-flex flex-lg-column  ${layoutProps.footerClasses}`}
      id="kt_footer"
    >
      <div
        className={`${layoutProps.footerContainerClasses} d-flex flex-column flex-md-row align-items-center justify-content-between`}
      >
        <div className="text-dark order-2 order-md-1">
          <p dangerouslySetInnerHTML={{ __html: intl.formatHTMLMessage({id: 'AUTH.FOOTER_COPY_RIGHT'}, {color: '#3fa9df', date:today}) }} />
        </div>
        <div className="nav nav-dark order-1 order-md-2">
        </div>
      </div>
    </div>
  );
}
