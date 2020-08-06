/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArtworkApp_artwork = {
    readonly slug: string;
    readonly internalID: string;
    readonly is_acquireable: boolean | null;
    readonly is_offerable: boolean | null;
    readonly availability: string | null;
    readonly listPrice: {
        readonly display?: string | null;
    } | null;
    readonly is_in_auction: boolean | null;
    readonly sale: {
        readonly internalID: string;
        readonly slug: string;
    } | null;
    readonly artists: ReadonlyArray<{
        readonly id: string;
        readonly slug: string;
        readonly " $fragmentRefs": FragmentRefs<"ArtistInfo_artist">;
    } | null> | null;
    readonly artist: {
        readonly " $fragmentRefs": FragmentRefs<"ArtistInfo_artist">;
    } | null;
    readonly " $fragmentRefs": FragmentRefs<"ArtworkRelatedArtists_artwork" | "ArtworkMeta_artwork" | "ArtworkBanner_artwork" | "ArtworkSidebar_artwork" | "ArtworkDetails_artwork" | "ArtworkImageBrowser_artwork" | "OtherWorks_artwork" | "PricingContext_artwork">;
    readonly " $refType": "ArtworkApp_artwork";
};
export type ArtworkApp_artwork$data = ArtworkApp_artwork;
export type ArtworkApp_artwork$key = {
    readonly " $data"?: ArtworkApp_artwork$data;
    readonly " $fragmentRefs": FragmentRefs<"ArtworkApp_artwork">;
};



const node: ReaderFragment = (function(){
var v0 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "slug",
  "args": null,
  "storageKey": null
},
v1 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "internalID",
  "args": null,
  "storageKey": null
},
v2 = [
  {
    "kind": "ScalarField",
    "alias": null,
    "name": "display",
    "args": null,
    "storageKey": null
  }
],
v3 = {
  "kind": "FragmentSpread",
  "name": "ArtistInfo_artist",
  "args": null
};
return {
  "kind": "Fragment",
  "name": "ArtworkApp_artwork",
  "type": "Artwork",
  "metadata": null,
  "argumentDefinitions": [
    {
      "kind": "LocalArgument",
      "name": "shouldFetchArtistSeriesData",
      "type": "Boolean!",
      "defaultValue": null
    }
  ],
  "selections": [
    (v0/*: any*/),
    (v1/*: any*/),
    {
      "kind": "ScalarField",
      "alias": "is_acquireable",
      "name": "isAcquireable",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": "is_offerable",
      "name": "isOfferable",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "availability",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "listPrice",
      "storageKey": null,
      "args": null,
      "concreteType": null,
      "plural": false,
      "selections": [
        {
          "kind": "InlineFragment",
          "type": "PriceRange",
          "selections": (v2/*: any*/)
        },
        {
          "kind": "InlineFragment",
          "type": "Money",
          "selections": (v2/*: any*/)
        }
      ]
    },
    {
      "kind": "ScalarField",
      "alias": "is_in_auction",
      "name": "isInAuction",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "sale",
      "storageKey": null,
      "args": null,
      "concreteType": "Sale",
      "plural": false,
      "selections": [
        (v1/*: any*/),
        (v0/*: any*/)
      ]
    },
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "artists",
      "storageKey": null,
      "args": null,
      "concreteType": "Artist",
      "plural": true,
      "selections": [
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "id",
          "args": null,
          "storageKey": null
        },
        (v0/*: any*/),
        (v3/*: any*/)
      ]
    },
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "artist",
      "storageKey": null,
      "args": null,
      "concreteType": "Artist",
      "plural": false,
      "selections": [
        (v3/*: any*/)
      ]
    },
    {
      "kind": "FragmentSpread",
      "name": "ArtworkRelatedArtists_artwork",
      "args": null
    },
    {
      "kind": "FragmentSpread",
      "name": "ArtworkMeta_artwork",
      "args": null
    },
    {
      "kind": "FragmentSpread",
      "name": "ArtworkBanner_artwork",
      "args": null
    },
    {
      "kind": "FragmentSpread",
      "name": "ArtworkSidebar_artwork",
      "args": null
    },
    {
      "kind": "FragmentSpread",
      "name": "ArtworkDetails_artwork",
      "args": null
    },
    {
      "kind": "FragmentSpread",
      "name": "ArtworkImageBrowser_artwork",
      "args": null
    },
    {
      "kind": "FragmentSpread",
      "name": "OtherWorks_artwork",
      "args": [
        {
          "kind": "Variable",
          "name": "shouldFetchArtistSeriesData",
          "variableName": "shouldFetchArtistSeriesData"
        }
      ]
    },
    {
      "kind": "FragmentSpread",
      "name": "PricingContext_artwork",
      "args": null
    }
  ]
};
})();
(node as any).hash = '164faee917283ce6cb127d9a3ee0ca1d';
export default node;
