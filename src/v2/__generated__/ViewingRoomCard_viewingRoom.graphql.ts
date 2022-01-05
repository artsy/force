/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ViewingRoomCard_viewingRoom = {
    readonly href: string | null;
    readonly title: string;
    readonly exhibitionPeriod: string | null;
    readonly coverImage: {
        readonly imageURLs: {
            readonly normalized: string | null;
        } | null;
        readonly width: number | null;
        readonly height: number | null;
    } | null;
    readonly " $refType": "ViewingRoomCard_viewingRoom";
};
export type ViewingRoomCard_viewingRoom$data = ViewingRoomCard_viewingRoom;
export type ViewingRoomCard_viewingRoom$key = {
    readonly " $data"?: ViewingRoomCard_viewingRoom$data;
    readonly " $fragmentRefs": FragmentRefs<"ViewingRoomCard_viewingRoom">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ViewingRoomCard_viewingRoom",
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
      "name": "title",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "exhibitionPeriod",
      "storageKey": null
    },
    {
      "alias": "coverImage",
      "args": null,
      "concreteType": "ARImage",
      "kind": "LinkedField",
      "name": "image",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "ImageURLs",
          "kind": "LinkedField",
          "name": "imageURLs",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "normalized",
              "storageKey": null
            }
          ],
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "width",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "height",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "ViewingRoom"
};
(node as any).hash = 'ed15b3a17e438b1e4a1949abe4cb5341';
export default node;
