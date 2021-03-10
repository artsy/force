/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type PastAuctions_salesConnection = {
    readonly edges: ReadonlyArray<{
        readonly node: {
            readonly slug: string;
            readonly name: string | null;
            readonly href: string | null;
            readonly endAt: string | null;
            readonly " $fragmentRefs": FragmentRefs<"AuctionArtworksRail_sale">;
        } | null;
    } | null> | null;
    readonly " $refType": "PastAuctions_salesConnection";
};
export type PastAuctions_salesConnection$data = PastAuctions_salesConnection;
export type PastAuctions_salesConnection$key = {
    readonly " $data"?: PastAuctions_salesConnection$data;
    readonly " $fragmentRefs": FragmentRefs<"PastAuctions_salesConnection">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PastAuctions_salesConnection",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "SaleEdge",
      "kind": "LinkedField",
      "name": "edges",
      "plural": true,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "Sale",
          "kind": "LinkedField",
          "name": "node",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "slug",
              "storageKey": null
            },
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
              "name": "href",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "endAt",
              "storageKey": null
            },
            {
              "args": null,
              "kind": "FragmentSpread",
              "name": "AuctionArtworksRail_sale"
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "SaleConnection"
};
(node as any).hash = '0b9c85684771d57adb7a12d8cc8a8e49';
export default node;
