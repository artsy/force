/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type FollowArtistPopoverRow_artist = {
    readonly internalID: string;
    readonly name: string | null;
    readonly image: {
        readonly cropped: {
            readonly url: string | null;
        } | null;
    } | null;
    readonly " $refType": "FollowArtistPopoverRow_artist";
};
export type FollowArtistPopoverRow_artist$data = FollowArtistPopoverRow_artist;
export type FollowArtistPopoverRow_artist$key = {
    readonly " $data"?: FollowArtistPopoverRow_artist$data;
    readonly " $fragmentRefs": FragmentRefs<"FollowArtistPopoverRow_artist">;
};



const node: ReaderFragment = {
  "kind": "Fragment",
  "name": "FollowArtistPopoverRow_artist",
  "type": "Artist",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
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
      "kind": "LinkedField",
      "alias": null,
      "name": "image",
      "storageKey": null,
      "args": null,
      "concreteType": "Image",
      "plural": false,
      "selections": [
        {
          "kind": "LinkedField",
          "alias": null,
          "name": "cropped",
          "storageKey": "cropped(height:45,width:45)",
          "args": [
            {
              "kind": "Literal",
              "name": "height",
              "value": 45
            },
            {
              "kind": "Literal",
              "name": "width",
              "value": 45
            }
          ],
          "concreteType": "CroppedImageUrl",
          "plural": false,
          "selections": [
            {
              "kind": "ScalarField",
              "alias": null,
              "name": "url",
              "args": null,
              "storageKey": null
            }
          ]
        }
      ]
    }
  ]
};
(node as any).hash = 'd84437134bc4bd985ba4e09cb554e080';
export default node;
