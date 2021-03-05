/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type CurrentAuctions_salesConnection = {
    readonly edges: ReadonlyArray<{
        readonly node: {
            readonly slug: string;
            readonly name: string | null;
            readonly href: string | null;
            readonly liveStartAt: string | null;
            readonly " $fragmentRefs": FragmentRefs<"AuctionArtworksRail_sale">;
        } | null;
    } | null> | null;
    readonly " $refType": "CurrentAuctions_salesConnection";
};
export type CurrentAuctions_salesConnection$data = CurrentAuctions_salesConnection;
export type CurrentAuctions_salesConnection$key = {
    readonly " $data"?: CurrentAuctions_salesConnection$data;
    readonly " $fragmentRefs": FragmentRefs<"CurrentAuctions_salesConnection">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "CurrentAuctions_salesConnection",
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
              "name": "liveStartAt",
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
(node as any).hash = '9254f1dd7c67b06461ec838874289c25';
export default node;
