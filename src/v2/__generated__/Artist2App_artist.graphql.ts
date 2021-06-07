/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type Artist2App_artist = {
    readonly counts: {
        readonly forSaleArtworks: number | null;
    } | null;
    readonly internalID: string;
    readonly name: string | null;
    readonly slug: string;
    readonly statuses: {
        readonly artworks: boolean | null;
        readonly auctionLots: boolean | null;
    } | null;
    readonly " $fragmentRefs": FragmentRefs<"Artist2Meta_artist" | "Artist2Header_artist" | "BackLink_artist">;
    readonly " $refType": "Artist2App_artist";
};
export type Artist2App_artist$data = Artist2App_artist;
export type Artist2App_artist$key = {
    readonly " $data"?: Artist2App_artist$data;
    readonly " $fragmentRefs": FragmentRefs<"Artist2App_artist">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Artist2App_artist",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "ArtistCounts",
      "kind": "LinkedField",
      "name": "counts",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "forSaleArtworks",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "internalID",
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
      "name": "slug",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "ArtistStatuses",
      "kind": "LinkedField",
      "name": "statuses",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "artworks",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "auctionLots",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "Artist2Meta_artist"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "Artist2Header_artist"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "BackLink_artist"
    }
  ],
  "type": "Artist"
};
(node as any).hash = 'f379ad670ff913965bbeee8f3c3b32ba';
export default node;
