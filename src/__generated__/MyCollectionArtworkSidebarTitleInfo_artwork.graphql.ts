/**
 * @generated SignedSource<<dbd362b0255c7d5eed7442b621ed9b2e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type MyCollectionArtworkSidebarTitleInfo_artwork$data = {
  readonly artist: {
    readonly href: string | null;
  } | null;
  readonly artistNames: string | null;
  readonly date: string | null;
  readonly title: string | null;
  readonly " $fragmentType": "MyCollectionArtworkSidebarTitleInfo_artwork";
};
export type MyCollectionArtworkSidebarTitleInfo_artwork$key = {
  readonly " $data"?: MyCollectionArtworkSidebarTitleInfo_artwork$data;
  readonly " $fragmentSpreads": FragmentRefs<"MyCollectionArtworkSidebarTitleInfo_artwork">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "MyCollectionArtworkSidebarTitleInfo_artwork",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "artistNames",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "title",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "date",
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
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "href",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Artwork",
  "abstractKey": null
};

(node as any).hash = "24af03d4f484b14c3653cb2ed472a822";

export default node;
