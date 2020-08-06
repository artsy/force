/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type FollowArtistButton_artist = {
    readonly id: string;
    readonly internalID: string;
    readonly name: string | null;
    readonly is_followed: boolean | null;
    readonly counts: {
        readonly follows: number | null;
    } | null;
    readonly " $fragmentRefs": FragmentRefs<"FollowArtistPopover_artist">;
    readonly " $refType": "FollowArtistButton_artist";
};
export type FollowArtistButton_artist$data = FollowArtistButton_artist;
export type FollowArtistButton_artist$key = {
    readonly " $data"?: FollowArtistButton_artist$data;
    readonly " $fragmentRefs": FragmentRefs<"FollowArtistButton_artist">;
};



const node: ReaderFragment = {
  "kind": "Fragment",
  "name": "FollowArtistButton_artist",
  "type": "Artist",
  "metadata": null,
  "argumentDefinitions": [
    {
      "kind": "LocalArgument",
      "name": "showFollowSuggestions",
      "type": "Boolean",
      "defaultValue": false
    }
  ],
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
      "name": "name",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": "is_followed",
      "name": "isFollowed",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "counts",
      "storageKey": null,
      "args": null,
      "concreteType": "ArtistCounts",
      "plural": false,
      "selections": [
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "follows",
          "args": null,
          "storageKey": null
        }
      ]
    },
    {
      "kind": "Condition",
      "passingValue": true,
      "condition": "showFollowSuggestions",
      "selections": [
        {
          "kind": "FragmentSpread",
          "name": "FollowArtistPopover_artist",
          "args": null
        }
      ]
    }
  ]
};
(node as any).hash = '560d15156b37402c50ee7572d14c9eca';
export default node;
