/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type FairOrganizerPastEventsRail_fairs = {
    readonly edges: ReadonlyArray<{
        readonly node: {
            readonly id: string;
            readonly " $fragmentRefs": FragmentRefs<"FairOrganizerPastEventRailCell_fair">;
        } | null;
    } | null> | null;
    readonly " $refType": "FairOrganizerPastEventsRail_fairs";
};
export type FairOrganizerPastEventsRail_fairs$data = FairOrganizerPastEventsRail_fairs;
export type FairOrganizerPastEventsRail_fairs$key = {
    readonly " $data"?: FairOrganizerPastEventsRail_fairs$data;
    readonly " $fragmentRefs": FragmentRefs<"FairOrganizerPastEventsRail_fairs">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "FairOrganizerPastEventsRail_fairs",
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
              "name": "FairOrganizerPastEventRailCell_fair"
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
(node as any).hash = 'f4b8edbf17149f9ddadfe4eb9d5db502';
export default node;
