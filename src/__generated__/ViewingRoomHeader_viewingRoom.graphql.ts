/**
 * @generated SignedSource<<31cc9e4b140934bf91119e1c4c79fc0d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ViewingRoomHeader_viewingRoom$data = {
  readonly distanceToClose: string | null | undefined;
  readonly distanceToOpen: string | null | undefined;
  readonly image: {
    readonly imageURLs: {
      readonly normalized: string | null | undefined;
    } | null | undefined;
  } | null | undefined;
  readonly partner: {
    readonly href: string | null | undefined;
    readonly name: string | null | undefined;
  } | null | undefined;
  readonly status: string;
  readonly title: string;
  readonly " $fragmentType": "ViewingRoomHeader_viewingRoom";
};
export type ViewingRoomHeader_viewingRoom$key = {
  readonly " $data"?: ViewingRoomHeader_viewingRoom$data;
  readonly " $fragmentSpreads": FragmentRefs<"ViewingRoomHeader_viewingRoom">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ViewingRoomHeader_viewingRoom",
  "selections": [
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
      "concreteType": "Partner",
      "kind": "LinkedField",
      "name": "partner",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "name",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "href",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "distanceToOpen",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "distanceToClose",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "status",
      "storageKey": null
    }
  ],
  "type": "ViewingRoom",
  "abstractKey": null
};

(node as any).hash = "796ee6ac5f38b0a78475ca0706e2dbad";

export default node;
