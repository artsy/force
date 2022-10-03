/**
 * @generated SignedSource<<7b9d2bcc3f9857134a3726977d407d66>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtworkSidebarArtists_artwork$data = {
  readonly artists: ReadonlyArray<{
    readonly internalID: string;
    readonly name: string | null;
    readonly slug: string;
    readonly " $fragmentSpreads": FragmentRefs<"EntityHeaderArtist_artist" | "FollowArtistButton_artist">;
  } | null> | null;
  readonly cultural_maker: string | null;
  readonly " $fragmentType": "ArtworkSidebarArtists_artwork";
};
export type ArtworkSidebarArtists_artwork$key = {
  readonly " $data"?: ArtworkSidebarArtists_artwork$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArtworkSidebarArtists_artwork">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [
    {
      "defaultValue": true,
      "kind": "LocalArgument",
      "name": "showFollowSuggestions"
    }
  ],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtworkSidebarArtists_artwork",
  "selections": [
    {
      "alias": "cultural_maker",
      "args": null,
      "kind": "ScalarField",
      "name": "culturalMaker",
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
          "args": [
            {
              "kind": "Variable",
              "name": "showFollowSuggestions",
              "variableName": "showFollowSuggestions"
            }
          ],
          "kind": "FragmentSpread",
          "name": "FollowArtistButton_artist"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Artwork",
  "abstractKey": null
};

(node as any).hash = "7b030820d6156f2b5417ed17d67e09f7";

export default node;
