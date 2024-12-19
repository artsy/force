/**
 * @generated SignedSource<<65abc3f61fa50168b5891107a12eeebf>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type NotificationViewingRoom_viewingRoom$data = {
  readonly href: string | null | undefined;
  readonly image: {
    readonly height: number | null | undefined;
    readonly imageURLs: {
      readonly normalized: string | null | undefined;
    } | null | undefined;
    readonly width: number | null | undefined;
  } | null | undefined;
  readonly introStatement: string | null | undefined;
  readonly title: string;
  readonly " $fragmentType": "NotificationViewingRoom_viewingRoom";
};
export type NotificationViewingRoom_viewingRoom$key = {
  readonly " $data"?: NotificationViewingRoom_viewingRoom$data;
  readonly " $fragmentSpreads": FragmentRefs<"NotificationViewingRoom_viewingRoom">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "NotificationViewingRoom_viewingRoom",
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
      "name": "introStatement",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "GravityARImage",
      "kind": "LinkedField",
      "name": "image",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "GravityImageURLs",
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
  "type": "ViewingRoom",
  "abstractKey": null
};

(node as any).hash = "e9bc7f5212b624b901857080430ec9c6";

export default node;
