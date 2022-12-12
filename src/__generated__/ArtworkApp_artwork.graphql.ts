/**
 * @generated SignedSource<<9476d7857f52cf299c5edd35c1bf7025>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type Visibility = "DRAFT" | "LISTED" | "UNLISTED" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type ArtworkApp_artwork$data = {
  readonly artist: {
    readonly " $fragmentSpreads": FragmentRefs<"ArtistInfo_artist">;
  } | null;
  readonly artists: ReadonlyArray<{
    readonly id: string;
    readonly slug: string;
    readonly " $fragmentSpreads": FragmentRefs<"ArtistInfo_artist">;
  } | null> | null;
  readonly availability: string | null;
  readonly internalID: string;
  readonly is_acquireable: boolean | null;
  readonly is_in_auction: boolean | null;
  readonly is_offerable: boolean | null;
  readonly listPrice: {
    readonly display?: string | null;
  } | null;
  readonly partner: {
    readonly " $fragmentSpreads": FragmentRefs<"UnlistedArtworkBanner_partner">;
  } | null;
  readonly sale: {
    readonly extendedBiddingIntervalMinutes: number | null;
    readonly internalID: string;
    readonly slug: string;
    readonly " $fragmentSpreads": FragmentRefs<"CascadingEndTimesBanner_sale">;
  } | null;
  readonly slug: string;
  readonly visibilityLevel: Visibility | null;
  readonly " $fragmentSpreads": FragmentRefs<"ArtworkImageBrowser_artwork" | "ArtworkMeta_artwork" | "ArtworkRelatedArtists_artwork" | "ArtworkSidebar_artwork" | "ArtworkTopContextBar_artwork">;
  readonly " $fragmentType": "ArtworkApp_artwork";
};
export type ArtworkApp_artwork$key = {
  readonly " $data"?: ArtworkApp_artwork$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArtworkApp_artwork">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "slug",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
  "storageKey": null
},
v2 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "display",
    "storageKey": null
  }
],
v3 = {
  "args": null,
  "kind": "FragmentSpread",
  "name": "ArtistInfo_artist"
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtworkApp_artwork",
  "selections": [
    (v0/*: any*/),
    (v1/*: any*/),
    {
      "alias": "is_acquireable",
      "args": null,
      "kind": "ScalarField",
      "name": "isAcquireable",
      "storageKey": null
    },
    {
      "alias": "is_offerable",
      "args": null,
      "kind": "ScalarField",
      "name": "isOfferable",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "availability",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "visibilityLevel",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": null,
      "kind": "LinkedField",
      "name": "listPrice",
      "plural": false,
      "selections": [
        {
          "kind": "InlineFragment",
          "selections": (v2/*: any*/),
          "type": "PriceRange",
          "abstractKey": null
        },
        {
          "kind": "InlineFragment",
          "selections": (v2/*: any*/),
          "type": "Money",
          "abstractKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Partner",
      "kind": "LinkedField",
      "name": "partner",
      "plural": false,
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "UnlistedArtworkBanner_partner"
        }
      ],
      "storageKey": null
    },
    {
      "alias": "is_in_auction",
      "args": null,
      "kind": "ScalarField",
      "name": "isInAuction",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Sale",
      "kind": "LinkedField",
      "name": "sale",
      "plural": false,
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "CascadingEndTimesBanner_sale"
        },
        (v1/*: any*/),
        (v0/*: any*/),
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "extendedBiddingIntervalMinutes",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Artist",
      "kind": "LinkedField",
      "name": "artists",
      "plural": true,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "id",
          "storageKey": null
        },
        (v0/*: any*/),
        (v3/*: any*/)
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Artist",
      "kind": "LinkedField",
      "name": "artist",
      "plural": false,
      "selections": [
        (v3/*: any*/)
      ],
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArtworkRelatedArtists_artwork"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArtworkMeta_artwork"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArtworkTopContextBar_artwork"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArtworkImageBrowser_artwork"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArtworkSidebar_artwork"
    }
  ],
  "type": "Artwork",
  "abstractKey": null
};
})();

(node as any).hash = "b7807de55978a8a18608c20c352a8886";

export default node;
