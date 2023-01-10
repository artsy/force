/**
 * @generated SignedSource<<c5e83c83569c4eada3b2eb5031935141>>
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
    readonly isPersonalArtist: boolean | null;
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
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "isPersonalArtist",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Artwork",
  "abstractKey": null
};

(node as any).hash = "60b35ced5949495cc1612ba0bab5e992";

export default node;
