/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type CurrentAuctions_currentAuctions = {
    readonly edges: ReadonlyArray<{
        readonly node: {
            readonly slug: string;
            readonly name: string | null;
            readonly href: string | null;
            readonly startAt: string | null;
            readonly endAt: string | null;
            readonly liveStartAt: string | null;
            readonly " $fragmentRefs": FragmentRefs<"AuctionArtworksRail_auction">;
        } | null;
    } | null> | null;
    readonly " $refType": "CurrentAuctions_currentAuctions";
};
export type CurrentAuctions_currentAuctions$data = CurrentAuctions_currentAuctions;
export type CurrentAuctions_currentAuctions$key = {
    readonly " $data"?: CurrentAuctions_currentAuctions$data;
    readonly " $fragmentRefs": FragmentRefs<"CurrentAuctions_currentAuctions">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "CurrentAuctions_currentAuctions",
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
              "name": "startAt",
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
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "liveStartAt",
              "storageKey": null
            },
            {
              "args": null,
              "kind": "FragmentSpread",
              "name": "AuctionArtworksRail_auction"
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
(node as any).hash = 'abd7096a804da50bc776a9efe74d11b8';
export default node;
