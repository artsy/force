/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type NotificationItem_item = {
    readonly href: string | null;
    readonly image: {
        readonly thumb: {
            readonly url: string;
        } | null;
    } | null;
    readonly " $refType": "NotificationItem_item";
};
export type NotificationItem_item$data = NotificationItem_item;
export type NotificationItem_item$key = {
    readonly " $data"?: NotificationItem_item$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"NotificationItem_item">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "NotificationItem_item",
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
      "concreteType": "Image",
      "kind": "LinkedField",
      "name": "image",
      "plural": false,
      "selections": [
        {
          "alias": "thumb",
          "args": [
            {
              "kind": "Literal",
              "name": "height",
              "value": 58
            },
            {
              "kind": "Literal",
              "name": "width",
              "value": 58
            }
          ],
          "concreteType": "CroppedImageUrl",
          "kind": "LinkedField",
          "name": "cropped",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "url",
              "storageKey": null
            }
          ],
          "storageKey": "cropped(height:58,width:58)"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "FollowedArtistsArtworksGroup",
  "abstractKey": null
};
(node as any).hash = '6e46b3557a28a95432793128af0d6676';
export default node;
