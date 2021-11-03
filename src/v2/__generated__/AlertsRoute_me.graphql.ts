/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type AlertsRoute_me = {
    readonly name: string | null;
    readonly " $fragmentRefs": FragmentRefs<"AllAlertsSection_me">;
    readonly " $refType": "AlertsRoute_me";
};
export type AlertsRoute_me$data = AlertsRoute_me;
export type AlertsRoute_me$key = {
    readonly " $data"?: AlertsRoute_me$data;
    readonly " $fragmentRefs": FragmentRefs<"AlertsRoute_me">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "AlertsRoute_me",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "name",
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "AllAlertsSection_me"
    }
  ],
  "type": "Me"
};
(node as any).hash = '28f07c05e231cd3f10cfccfbf677adff';
export default node;
