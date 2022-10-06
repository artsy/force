/**
 * @generated SignedSource<<7a35b7cb11b013ad6d473d76305e7c77>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type Header_artworks$data = {
  readonly merchandisableArtists: ReadonlyArray<{
    readonly internalID: string;
    readonly name: string | null;
    readonly " $fragmentSpreads": FragmentRefs<"EntityHeaderArtist_artist">;
  } | null> | null;
  readonly " $fragmentSpreads": FragmentRefs<"DefaultHeader_headerArtworks">;
  readonly " $fragmentType": "Header_artworks";
};
export type Header_artworks$key = {
  readonly " $data"?: Header_artworks$data;
  readonly " $fragmentSpreads": FragmentRefs<"Header_artworks">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Header_artworks",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "DefaultHeader_headerArtworks"
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Artist",
      "kind": "LinkedField",
      "name": "merchandisableArtists",
      "plural": true,
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "EntityHeaderArtist_artist"
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
        }
      ],
      "storageKey": null
    }
  ],
  "type": "FilterArtworksConnection",
  "abstractKey": null
};

(node as any).hash = "69f824c3f2a20c931c30b8ec11d065e6";

export default node;
