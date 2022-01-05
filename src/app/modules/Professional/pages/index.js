import React, { Suspense } from "react";
import { Redirect, Switch } from "react-router-dom";
import { ProfessionalsPage } from "./professional/ProfessionalPage";
import { LayoutSplashScreen, ContentRoute } from "../../../../_metronic/layout";

export default function ProfessionalPage() {
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
        {
          /* Redirect from staff root URL to /users */
          <Redirect
            exact={true}
            from="/professional"
            to="/professional/map"
          />
        }

        <ContentRoute path="/professional/map" component={ProfessionalsPage} />
      </Switch>
    </Suspense>
  );
}
