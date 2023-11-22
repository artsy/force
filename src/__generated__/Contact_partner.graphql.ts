/**
 * @generated SignedSource<<7d8ce94f612c3985dcb731bad1d29f71>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type Contact_partner$data = {
  readonly locations: {
    readonly edges: ReadonlyArray<{
      readonly " $fragmentSpreads": FragmentRefs<"PartnerContacts_edges">;
    } | null | undefined> | null | undefined;
  } | null | undefined;
  readonly " $fragmentType": "Contact_partner";
};
export type Contact_partner$key = {
  readonly " $data"?: Contact_partner$data;
  readonly " $fragmentSpreads": FragmentRefs<"Contact_partner">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Contact_partner",
  "selections": [
    {
      "alias": "locations",
      "args": [
        {
          "kind": "Literal",
          "name": "first",
          "value": 50
        }
      ],
      "concreteType": "LocationConnection",
      "kind": "LinkedField",
      "name": "locationsConnection",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "LocationEdge",
          "kind": "LinkedField",
          "name": "edges",
          "plural": true,
          "selections": [
            {
              "args": null,
              "kind": "FragmentSpread",
              "name": "PartnerContacts_edges"
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": "locationsConnection(first:50)"
    }
  ],
  "type": "Partner",
  "abstractKey": null
};

(node as any).hash = "3c1eaac24eda64d818270f224e9043c1";

export default node;
