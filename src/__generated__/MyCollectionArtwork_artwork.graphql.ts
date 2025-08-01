/**
 * @generated SignedSource<<487d90cc994298a995104ece77c610ab>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
export type ArtistTargetSupplyPriority = "FALSE" | "TRUE" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type MyCollectionArtwork_artwork$data = {
  readonly artist: {
    readonly auctionResults: {
      readonly totalCount: number | null | undefined;
    } | null | undefined;
    readonly slug: string;
    readonly targetSupply: {
      readonly priority: ArtistTargetSupplyPriority | null | undefined;
    };
    readonly " $fragmentSpreads": FragmentRefs<"MyCollectionArtworkAuctionResults_artist">;
  } | null | undefined;
  readonly comparables: {
    readonly totalCount: number | null | undefined;
  } | null | undefined;
  readonly hasMarketPriceInsights: boolean | null | undefined;
  readonly internalID: string;
  readonly slug: string;
  readonly " $fragmentSpreads": FragmentRefs<"MyCollectionArtworkAboutTab_artwork" | "MyCollectionArtworkComparables_artwork" | "MyCollectionArtworkDetails_artwork" | "MyCollectionArtworkHeader_artwork" | "MyCollectionArtworkImageBrowser_artwork" | "MyCollectionArtworkInsights_artwork" | "MyCollectionArtworkMeta_artwork" | "MyCollectionArtworkTitle_artwork">;
  readonly " $fragmentType": "MyCollectionArtwork_artwork";
};
export type MyCollectionArtwork_artwork$key = {
  readonly " $data"?: MyCollectionArtwork_artwork$data;
  readonly " $fragmentSpreads": FragmentRefs<"MyCollectionArtwork_artwork">;
};

const node: ReaderFragment = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "totalCount",
    "storageKey": null
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "slug",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "MyCollectionArtwork_artwork",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "MyCollectionArtworkHeader_artwork"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "MyCollectionArtworkTitle_artwork"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "MyCollectionArtworkDetails_artwork"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "MyCollectionArtworkMeta_artwork"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "MyCollectionArtworkInsights_artwork"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "MyCollectionArtworkImageBrowser_artwork"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "MyCollectionArtworkComparables_artwork"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "MyCollectionArtworkAboutTab_artwork"
    },
    {
      "alias": "comparables",
      "args": null,
      "concreteType": "AuctionResultConnection",
      "kind": "LinkedField",
      "name": "comparableAuctionResults",
      "plural": false,
      "selections": (v0/*: any*/),
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "hasMarketPriceInsights",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "internalID",
      "storageKey": null
    },
    (v1/*: any*/),
    {
      "alias": null,
      "args": [
        {
          "kind": "Literal",
          "name": "shallow",
          "value": true
        }
      ],
      "concreteType": "Artist",
      "kind": "LinkedField",
      "name": "artist",
      "plural": false,
      "selections": [
        (v1/*: any*/),
        {
          "alias": null,
          "args": null,
          "concreteType": "ArtistTargetSupply",
          "kind": "LinkedField",
          "name": "targetSupply",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "priority",
              "storageKey": null
            }
          ],
          "storageKey": null
        },
        {
          "alias": "auctionResults",
          "args": null,
          "concreteType": "AuctionResultConnection",
          "kind": "LinkedField",
          "name": "auctionResultsConnection",
          "plural": false,
          "selections": (v0/*: any*/),
          "storageKey": null
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "MyCollectionArtworkAuctionResults_artist"
        }
      ],
      "storageKey": "artist(shallow:true)"
    }
  ],
  "type": "Artwork",
  "abstractKey": null
};
})();

(node as any).hash = "621ff503aabb9c5346bf9780e9cf1779";

export default node;
