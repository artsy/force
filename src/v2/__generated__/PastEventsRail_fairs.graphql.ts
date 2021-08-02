/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type PastEventsRail_fairs = {
    readonly edges: ReadonlyArray<{
        readonly node: {
            readonly id: string;
            readonly " $fragmentRefs": FragmentRefs<"PastEventRailCell_fair">;
        } | null;
    } | null> | null;
    readonly " $refType": "PastEventsRail_fairs";
};
export type PastEventsRail_fairs$data = PastEventsRail_fairs;
export type PastEventsRail_fairs$key = {
    readonly " $data"?: PastEventsRail_fairs$data;
    readonly " $fragmentRefs": FragmentRefs<"PastEventsRail_fairs">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PastEventsRail_fairs",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "FairEdge",
      "kind": "LinkedField",
      "name": "edges",
      "plural": true,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "Fair",
          "kind": "LinkedField",
          "name": "node",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "id",
              "storageKey": null
            },
            {
              "args": null,
              "kind": "FragmentSpread",
              "name": "PastEventRailCell_fair"
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "FairConnection"
};
(node as any).hash = '9b80329777176f429ac2179bd87d9596';
export default node;
