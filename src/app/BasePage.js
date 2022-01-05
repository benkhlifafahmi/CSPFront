import React, { Suspense } from "react";
import { Redirect, Switch } from "react-router-dom";
import { LayoutSplashScreen, ContentRoute } from "../_metronic/layout";
import { DashboardPage } from "./pages/DashboardPage";
import { ProfessionalPage } from "./modules/Professional";

export default function BasePage() {

  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
        {
          /* Redirect from root URL to /dashboard. */
            <Redirect exact from="/" to="/professional/map" />
        }
        <ContentRoute path="/dashboard" component={DashboardPage} />
        <ContentRoute path="/professional" component={ProfessionalPage} />
        
        <Redirect to="error/error-v1" />
      </Switch>
    </Suspense>
  );
}
