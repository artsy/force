/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type FairOrganizerHeader_fairOrganizer = {
    readonly name: string | null;
    readonly fairsConnection: {
        readonly edges: ReadonlyArray<{
            readonly node: {
                readonly startAt: string | null;
                readonly exhibitionPeriod: string | null;
            } | null;
        } | null> | null;
    } | null;
    readonly " $fragmentRefs": FragmentRefs<"FairOrganizerHeaderIcon_fairOrganizer" | "FairOrganizerFollowButton_fairOrganizer" | "FairOrganizerInfo_fairOrganizer">;
    readonly " $refType": "FairOrganizerHeader_fairOrganizer";
};
export type FairOrganizerHeader_fairOrganizer$data = FairOrganizerHeader_fairOrganizer;
export type FairOrganizerHeader_fairOrganizer$key = {
    readonly " $data"?: FairOrganizerHeader_fairOrganizer$data;
    readonly " $fragmentRefs": FragmentRefs<"FairOrganizerHeader_fairOrganizer">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "FairOrganizerHeader_fairOrganizer",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "name",
      "storageKey": null
    },
    {
      "alias": null,
      "args": [
        {
          "kind": "Literal",
          "name": "first",
          "value": 1
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
                  "name": "startAt",
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "exhibitionPeriod",
                  "storageKey": null
                }
              ],
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": "fairsConnection(first:1)"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "FairOrganizerHeaderIcon_fairOrganizer"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "FairOrganizerFollowButton_fairOrganizer"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "FairOrganizerInfo_fairOrganizer"
    }
  ],
  "type": "FairOrganizer"
};
(node as any).hash = '1cad529826214e04f9ce747c67ce3c77';
export default node;
