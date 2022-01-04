/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type FeaturedAuctions_auctions = {
    readonly edges: ReadonlyArray<{
        readonly node: {
            readonly slug: string;
            readonly name: string | null;
            readonly href: string | null;
        } | null;
    } | null> | null;
    readonly " $refType": "FeaturedAuctions_auctions";
};
export type FeaturedAuctions_auctions$data = FeaturedAuctions_auctions;
export type FeaturedAuctions_auctions$key = {
    readonly " $data"?: FeaturedAuctions_auctions$data;
    readonly " $fragmentRefs": FragmentRefs<"FeaturedAuctions_auctions">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "FeaturedAuctions_auctions",
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
(node as any).hash = '58e37c254a000d5d3795ce932b2a08b9';
export default node;
