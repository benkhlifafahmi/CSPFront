import React, { Suspense } from "react";
import { Redirect, Switch } from "react-router-dom";
import { AssuresPage } from "./assures/AssurePage";
import { LayoutSplashScreen, ContentRoute } from "../../../../_metronic/layout";

export default function AssurePage() {
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
        {
          /* Redirect from staff root URL to /users */
          <Redirect
            exact={true}
            from="/assure"
            to="/assure/map"
          />
        }

        <ContentRoute path="/assure/map" component={AssuresPage} />
      </Switch>
    </Suspense>
  );
}
