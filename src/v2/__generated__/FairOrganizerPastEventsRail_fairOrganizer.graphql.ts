/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type FairOrganizerPastEventsRail_fairOrganizer = {
    readonly pastFairs: {
        readonly edges: ReadonlyArray<{
            readonly node: {
                readonly id: string;
                readonly " $fragmentRefs": FragmentRefs<"FairOrganizerPastEventRailCell_fair">;
            } | null;
        } | null> | null;
    } | null;
    readonly " $refType": "FairOrganizerPastEventsRail_fairOrganizer";
};
export type FairOrganizerPastEventsRail_fairOrganizer$data = FairOrganizerPastEventsRail_fairOrganizer;
export type FairOrganizerPastEventsRail_fairOrganizer$key = {
    readonly " $data"?: FairOrganizerPastEventsRail_fairOrganizer$data;
    readonly " $fragmentRefs": FragmentRefs<"FairOrganizerPastEventsRail_fairOrganizer">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "FairOrganizerPastEventsRail_fairOrganizer",
  "selections": [
    {
      "alias": "pastFairs",
      "args": [
        {
          "kind": "Literal",
          "name": "first",
          "value": 20
        },
        {
          "kind": "Literal",
          "name": "hasFullFeature",
          "value": true
        },
        {
          "kind": "Literal",
          "name": "sort",
          "value": "START_AT_DESC"
        },
        {
          "kind": "Literal",
          "name": "status",
          "value": "CLOSED"
        }
      ],
      "concreteType": "FairConnection",
      "kind": "LinkedField",
      "name": "fairsConnection",
      "plural": false,
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
      "storageKey": "fairsConnection(first:20,hasFullFeature:true,sort:\"START_AT_DESC\",status:\"CLOSED\")"
    }
  ],
  "type": "FairOrganizer",
  "abstractKey": null
};
(node as any).hash = '6aeda34d2d36710cd10a7f1f3e4ac93e';
export default node;
