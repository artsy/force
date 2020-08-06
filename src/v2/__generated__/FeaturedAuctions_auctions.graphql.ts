/* tslint:disable */

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
  "kind": "Fragment",
  "name": "FeaturedAuctions_auctions",
  "type": "SaleConnection",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "edges",
      "storageKey": null,
      "args": null,
      "concreteType": "SaleEdge",
      "plural": true,
      "selections": [
        {
          "kind": "LinkedField",
          "alias": null,
          "name": "node",
          "storageKey": null,
          "args": null,
          "concreteType": "Sale",
          "plural": false,
          "selections": [
            {
              "kind": "ScalarField",
              "alias": null,
              "name": "slug",
              "args": null,
              "storageKey": null
            },
            {
              "kind": "ScalarField",
              "alias": null,
              "name": "name",
              "args": null,
              "storageKey": null
            },
            {
              "kind": "ScalarField",
              "alias": null,
              "name": "href",
              "args": null,
              "storageKey": null
            }
          ]
        }
      ]
    }
  ]
};
(node as any).hash = '58e37c254a000d5d3795ce932b2a08b9';
export default node;
