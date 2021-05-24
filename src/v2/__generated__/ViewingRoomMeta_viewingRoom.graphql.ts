/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ViewingRoomMeta_viewingRoom = {
    readonly title: string;
    readonly href: string | null;
    readonly pullQuote: string | null;
    readonly image: {
        readonly imageURLs: {
            readonly normalized: string | null;
        } | null;
    } | null;
    readonly " $refType": "ViewingRoomMeta_viewingRoom";
};
export type ViewingRoomMeta_viewingRoom$data = ViewingRoomMeta_viewingRoom;
export type ViewingRoomMeta_viewingRoom$key = {
    readonly " $data"?: ViewingRoomMeta_viewingRoom$data;
    readonly " $fragmentRefs": FragmentRefs<"ViewingRoomMeta_viewingRoom">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ViewingRoomMeta_viewingRoom",
  "selections": [
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
      "name": "href",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "pullQuote",
      "storageKey": null
    },
    {
      "alias": null,
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
        }
      ],
      "storageKey": null
    }
  ],
  "type": "ViewingRoom"
};
(node as any).hash = '37a939c41eb1dbd9fbfee32fcb7b73fd';
export default node;
