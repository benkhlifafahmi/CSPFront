import React, { Suspense } from "react";
import { Redirect, Switch } from "react-router-dom";
import { LayoutSplashScreen, ContentRoute } from "../_metronic/layout";
import { DashboardPage } from "./pages/DashboardPage";
import { ProfessionalPage } from "./modules/Professional";
import { AssurePage } from "./modules/Assures";
import { ApciPage } from "./modules/APCI";
import { MedPage } from './modules/Meds';

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
        <ContentRoute path="/assure" component={AssurePage} />
        <ContentRoute path="/apci" component={ApciPage} />
        <ContentRoute path="/med" component={MedPage} />
        
        <Redirect to="error/error-v1" />
      </Switch>
    </Suspense>
  );
}
