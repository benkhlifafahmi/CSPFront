import React, { Suspense } from "react";
import { Redirect, Switch } from "react-router-dom";
import { MedsPage } from "./med/MedPage";
import { LayoutSplashScreen, ContentRoute } from "../../../../_metronic/layout";

export default function MedPage() {
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
        {
          /* Redirect from staff root URL to /users */
          <Redirect
            exact={true}
            from="/med"
            to="/med/map"
          />
        }

        <ContentRoute path="/med/map" component={MedsPage} />
      </Switch>
    </Suspense>
  );
}
