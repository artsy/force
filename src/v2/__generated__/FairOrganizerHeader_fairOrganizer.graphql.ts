/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type FairOrganizerHeader_fairOrganizer = {
    readonly name: string | null;
    readonly about: string | null;
    readonly fairs: {
        readonly edges: ReadonlyArray<{
            readonly node: {
                readonly " $fragmentRefs": FragmentRefs<"FairOrganizerTiming_fair">;
            } | null;
        } | null> | null;
    } | null;
    readonly " $fragmentRefs": FragmentRefs<"FairOrganizerHeaderIcon_fairOrganizer">;
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
      "args": null,
      "kind": "ScalarField",
      "name": "about",
      "storageKey": null
    },
    {
      "alias": "fairs",
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
                  "args": null,
                  "kind": "FragmentSpread",
                  "name": "FairOrganizerTiming_fair"
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
    }
  ],
  "type": "FairOrganizer"
};
(node as any).hash = '15a655a4a8a438c87d37be6cad5cfd00';
export default node;
