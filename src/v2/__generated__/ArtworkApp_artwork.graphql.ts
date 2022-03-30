/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

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
        readonly cascadingEndTimeInterval: number | null;
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
    readonly " $fragmentRefs": FragmentRefs<"ArtworkRelatedArtists_artwork" | "ArtworkMeta_artwork" | "ArtworkBanner_artwork" | "ArtworkSidebar_artwork" | "ArtworkImageBrowser_artwork">;
    readonly " $refType": "ArtworkApp_artwork";
};
export type ArtworkApp_artwork$data = ArtworkApp_artwork;
export type ArtworkApp_artwork$key = {
    readonly " $data"?: ArtworkApp_artwork$data;
    readonly " $fragmentRefs": FragmentRefs<"ArtworkApp_artwork">;
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
        (v1/*: any*/),
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "cascadingEndTimeInterval",
          "storageKey": null
        },
        (v0/*: any*/)
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
      "name": "ArtworkBanner_artwork"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArtworkSidebar_artwork"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArtworkImageBrowser_artwork"
    }
  ],
  "type": "Artwork",
  "abstractKey": null
};
})();
(node as any).hash = '0749cdcd72ce1253541c906cd016c164';
export default node;
