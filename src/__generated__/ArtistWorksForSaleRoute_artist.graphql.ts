/**
 * @generated SignedSource<<24f9907c5eddd9076fdc60e03cb6ab83>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtistWorksForSaleRoute_artist$data = {
  readonly artworksMeta: {
    readonly description: string;
    readonly title: string;
  };
  readonly name: string | null | undefined;
  readonly slug: string;
  readonly " $fragmentSpreads": FragmentRefs<"ArtistMeta_artist" | "ArtistWorksForSaleEmpty_artist">;
  readonly " $fragmentType": "ArtistWorksForSaleRoute_artist";
};
export type ArtistWorksForSaleRoute_artist$key = {
  readonly " $data"?: ArtistWorksForSaleRoute_artist$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArtistWorksForSaleRoute_artist">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtistWorksForSaleRoute_artist",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArtistMeta_artist"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArtistWorksForSaleEmpty_artist"
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
      "kind": "ScalarField",
      "name": "name",
      "storageKey": null
    },
    {
      "alias": "artworksMeta",
      "args": [
        {
          "kind": "Literal",
          "name": "page",
          "value": "ARTWORKS"
        }
      ],
      "concreteType": "ArtistMeta",
      "kind": "LinkedField",
      "name": "meta",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "description",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "title",
          "storageKey": null
        }
      ],
      "storageKey": "meta(page:\"ARTWORKS\")"
    }
  ],
  "type": "Artist",
  "abstractKey": null
};

(node as any).hash = "1792f7ad610782faa696afb45ded2e4a";

export default node;
