/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type SavedSearchAlertsOverviewRoute_me = {
    readonly " $fragmentRefs": FragmentRefs<"SavedSearchAlertsList_me">;
    readonly " $refType": "SavedSearchAlertsOverviewRoute_me";
};
export type SavedSearchAlertsOverviewRoute_me$data = SavedSearchAlertsOverviewRoute_me;
export type SavedSearchAlertsOverviewRoute_me$key = {
    readonly " $data"?: SavedSearchAlertsOverviewRoute_me$data;
    readonly " $fragmentRefs": FragmentRefs<"SavedSearchAlertsOverviewRoute_me">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SavedSearchAlertsOverviewRoute_me",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "SavedSearchAlertsList_me"
    }
  ],
  "type": "Me",
  "abstractKey": null
};
(node as any).hash = '0de25a125e7c4725c96e70077604230a';
export default node;
