import * as React from "react";
import { Route, Switch } from "react-router-dom";
import CharacterSelect from "../components/CharacterSelect";
import CharacterOverview from "../components/Character";
import NewEditCombo from "../components/Combo";
import ViewCombo from "../components/ViewCombo";
import Import from "../components/Import";
import Export from "../components/Export";

export const AnimatedSwitch: React.FC = () => {
  return (
    <Switch>
      <Route path="/" exact>
        <CharacterSelect />
      </Route>
      <Route path="/character/:id" exact>
        <CharacterOverview />
      </Route>
      <Route path="/combo/new/:character/:combo?" exact>
        <NewEditCombo />
      </Route>
      <Route path="/combo-view/:combo" exact>
        <ViewCombo />
      </Route>
      <Route path="/import" exact>
        <Import />
      </Route>
      <Route path="/export" exact>
        <Export />
      </Route>
    </Switch>
  );
};
