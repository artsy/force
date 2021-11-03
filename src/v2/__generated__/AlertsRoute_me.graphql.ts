/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type AlertsRoute_me = {
    readonly name: string | null;
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
    }
  ],
  "type": "Me"
};
(node as any).hash = 'f8d69c066c442d4ae2c6c7d81472ce48';
export default node;
