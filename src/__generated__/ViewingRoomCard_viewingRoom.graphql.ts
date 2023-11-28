/**
 * @generated SignedSource<<6fb7954cc034b3488d79d0fa3b97711e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ViewingRoomCard_viewingRoom$data = {
  readonly coverImage: {
    readonly height: number | null | undefined;
    readonly imageURLs: {
      readonly normalized: string | null | undefined;
    } | null | undefined;
    readonly width: number | null | undefined;
  } | null | undefined;
  readonly exhibitionPeriod: string | null | undefined;
  readonly href: string | null | undefined;
  readonly title: string;
  readonly " $fragmentType": "ViewingRoomCard_viewingRoom";
};
export type ViewingRoomCard_viewingRoom$key = {
  readonly " $data"?: ViewingRoomCard_viewingRoom$data;
  readonly " $fragmentSpreads": FragmentRefs<"ViewingRoomCard_viewingRoom">;
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
  "type": "ViewingRoom",
  "abstractKey": null
};

(node as any).hash = "ed15b3a17e438b1e4a1949abe4cb5341";

export default node;
