/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type InsightsRoute_me = {
    readonly internalID: string;
    readonly " $refType": "InsightsRoute_me";
};
export type InsightsRoute_me$data = InsightsRoute_me;
export type InsightsRoute_me$key = {
    readonly " $data"?: InsightsRoute_me$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"InsightsRoute_me">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "InsightsRoute_me",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "internalID",
      "storageKey": null
    }
  ],
  "type": "Me",
  "abstractKey": null
};
(node as any).hash = '76291bcddf3a5c12d1c020fdfe2c8e63';
export default node;
