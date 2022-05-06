/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type Contact_partner = {
    readonly locations: {
        readonly edges: ReadonlyArray<{
            readonly " $fragmentRefs": FragmentRefs<"PartnerContacts_edges">;
        } | null> | null;
    } | null;
    readonly " $refType": "Contact_partner";
};
export type Contact_partner$data = Contact_partner;
export type Contact_partner$key = {
    readonly " $data"?: Contact_partner$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"Contact_partner">;
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
(node as any).hash = '3c1eaac24eda64d818270f224e9043c1';
export default node;
