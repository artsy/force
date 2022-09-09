/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type InsightsRoute_me = {
    readonly internalID: string;
    readonly myCollectionInfo: {
        readonly " $fragmentRefs": FragmentRefs<"InsightsOverview_info">;
    } | null;
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
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "MyCollectionInfo",
      "kind": "LinkedField",
      "name": "myCollectionInfo",
      "plural": false,
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "InsightsOverview_info"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Me",
  "abstractKey": null
};
(node as any).hash = 'b47c57b1e1c06f1959925755c9d614e8';
export default node;
