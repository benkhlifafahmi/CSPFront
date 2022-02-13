/* eslint-disable jsx-a11y/role-supports-aria-props */
/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from "react";
import { useLocation } from "react-router";
import { NavLink } from "react-router-dom";
import { useSelector, shallowEqual } from "react-redux";
import SVG from "react-inlinesvg";
import { toAbsoluteUrl, checkIsActive } from "../../../../_helpers";
import { useIntl } from "react-intl";

export function AsideMenuList({ layoutProps }) {
  const intl = useIntl();
  const { user } = useSelector((state) => state.auth, shallowEqual);

  const location = useLocation();
  const getMenuItemActive = (url, hasSubmenu = false) => {
    return checkIsActive(location, url)
      ? ` ${!hasSubmenu &&
      "menu-item-active"} menu-item-open menu-item-not-hightlighted`
      : "";
  };

  return (
    <>
      <ul className={`menu-nav ${layoutProps.ulClasses}`}>

              <li
                className={`menu-item ${getMenuItemActive("/professional", false)}`}
                aria-haspopup="true"
              >
                <NavLink className="menu-link" to="/professional">
                  <span className="svg-icon menu-icon">
                    <SVG src={toAbsoluteUrl("/media/svg/icons/Map/Compass.svg")} />
                  </span>
                  <span className="menu-text">{intl.formatMessage({ id: 'MENU.PROFESSIONAL' })}</span>
                </NavLink>
              </li>

              
              <li
                className={`menu-item ${getMenuItemActive("/assure", false)}`}
                aria-haspopup="true"
              >
                <NavLink className="menu-link" to="/assure">
                  <span className="svg-icon menu-icon">
                    <SVG src={toAbsoluteUrl("/media/svg/icons/Map/Compass.svg")} />
                  </span>
                  <span className="menu-text">{intl.formatMessage({ id: 'MENU.ASSURE' })}</span>
                </NavLink>
              </li>

              <li
                className={`menu-item ${getMenuItemActive("/apci", false)}`}
                aria-haspopup="true"
              >
                <NavLink className="menu-link" to="/apci">
                  <span className="svg-icon menu-icon">
                    <SVG src={toAbsoluteUrl("/media/svg/icons/Map/Compass.svg")} />
                  </span>
                  <span className="menu-text">{intl.formatMessage({ id: 'MENU.APCI' })}</span>
                </NavLink>
              </li>

      </ul>

      {/* end::Menu Nav */}
    </>
  );
}
