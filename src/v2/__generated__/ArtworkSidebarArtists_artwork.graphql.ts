/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArtworkSidebarArtists_artwork = {
    readonly cultural_maker: string | null;
    readonly artists: ReadonlyArray<{
        readonly id: string;
        readonly internalID: string;
        readonly slug: string;
        readonly name: string | null;
        readonly href: string | null;
        readonly " $fragmentRefs": FragmentRefs<"FollowArtistButton_artist">;
    } | null> | null;
    readonly " $refType": "ArtworkSidebarArtists_artwork";
};
export type ArtworkSidebarArtists_artwork$data = ArtworkSidebarArtists_artwork;
export type ArtworkSidebarArtists_artwork$key = {
    readonly " $data"?: ArtworkSidebarArtists_artwork$data;
    readonly " $fragmentRefs": FragmentRefs<"ArtworkSidebarArtists_artwork">;
};



const node: ReaderFragment = {
  "kind": "Fragment",
  "name": "ArtworkSidebarArtists_artwork",
  "type": "Artwork",
  "metadata": null,
  "argumentDefinitions": [
    {
      "kind": "LocalArgument",
      "name": "showFollowSuggestions",
      "type": "Boolean",
      "defaultValue": true
    }
  ],
  "selections": [
    {
      "kind": "ScalarField",
      "alias": "cultural_maker",
      "name": "culturalMaker",
      "args": null,
      "storageKey": null
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
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "internalID",
          "args": null,
          "storageKey": null
        },
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "slug",
          "args": null,
          "storageKey": null
        },
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "name",
          "args": null,
          "storageKey": null
        },
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "href",
          "args": null,
          "storageKey": null
        },
        {
          "kind": "FragmentSpread",
          "name": "FollowArtistButton_artist",
          "args": [
            {
              "kind": "Variable",
              "name": "showFollowSuggestions",
              "variableName": "showFollowSuggestions"
            }
          ]
        }
      ]
    }
  ]
};
(node as any).hash = '961d703b4bbc396cc6aaf106c649a11d';
export default node;
