import React, { Suspense } from "react";
import { Redirect, Switch } from "react-router-dom";
import { ApcisPage } from "./apci/ApciPage";
import { LayoutSplashScreen, ContentRoute } from "../../../../_metronic/layout";

export default function ApciPage() {
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
        {
          /* Redirect from staff root URL to /users */
          <Redirect
            exact={true}
            from="/apci"
            to="/apci/map"
          />
        }

        <ContentRoute path="/apci/map" component={ApcisPage} />
      </Switch>
    </Suspense>
  );
}
