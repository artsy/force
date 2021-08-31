/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type FairOrganizerApp_fairOrganizer = {
    readonly name: string | null;
    readonly fairs: {
        readonly edges: ReadonlyArray<{
            readonly node: {
                readonly " $fragmentRefs": FragmentRefs<"FairHeaderImage_fair">;
            } | null;
        } | null> | null;
    } | null;
    readonly " $fragmentRefs": FragmentRefs<"FairOrganizerHeader_fairOrganizer" | "FairOrganizerLatestArticles_fairOrganizer">;
    readonly " $refType": "FairOrganizerApp_fairOrganizer";
};
export type FairOrganizerApp_fairOrganizer$data = FairOrganizerApp_fairOrganizer;
export type FairOrganizerApp_fairOrganizer$key = {
    readonly " $data"?: FairOrganizerApp_fairOrganizer$data;
    readonly " $fragmentRefs": FragmentRefs<"FairOrganizerApp_fairOrganizer">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "FairOrganizerApp_fairOrganizer",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "name",
      "storageKey": null
    },
    {
      "alias": "fairs",
      "args": [
        {
          "kind": "Literal",
          "name": "first",
          "value": 1
        },
        {
          "kind": "Literal",
          "name": "sort",
          "value": "START_AT_DESC"
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
                  "args": null,
                  "kind": "FragmentSpread",
                  "name": "FairHeaderImage_fair"
                }
              ],
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": "fairsConnection(first:1,sort:\"START_AT_DESC\")"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "FairOrganizerHeader_fairOrganizer"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "FairOrganizerLatestArticles_fairOrganizer"
    }
  ],
  "type": "FairOrganizer"
};
(node as any).hash = 'e19102e3e74bef5faf62cbc69989d027';
export default node;
