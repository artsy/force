/**
 * @generated SignedSource<<37f83f8cb5f59df953af65844afbc09b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ViewingRoomSubsections_viewingRoom$data = {
  readonly subsections: ReadonlyArray<{
    readonly body: string | null | undefined;
    readonly caption: string | null | undefined;
    readonly image: {
      readonly height: number | null | undefined;
      readonly imageURLs: {
        readonly normalized: string | null | undefined;
      } | null | undefined;
      readonly width: number | null | undefined;
    } | null | undefined;
    readonly internalID: string;
    readonly title: string | null | undefined;
  }>;
  readonly " $fragmentType": "ViewingRoomSubsections_viewingRoom";
};
export type ViewingRoomSubsections_viewingRoom$key = {
  readonly " $data"?: ViewingRoomSubsections_viewingRoom$data;
  readonly " $fragmentSpreads": FragmentRefs<"ViewingRoomSubsections_viewingRoom">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ViewingRoomSubsections_viewingRoom",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "ViewingRoomSubsection",
      "kind": "LinkedField",
      "name": "subsections",
      "plural": true,
      "selections": [
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
          "name": "title",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "body",
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
            },
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
          "name": "caption",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "ViewingRoom",
  "abstractKey": null
};

(node as any).hash = "e5981115f09332e8129f7bb001196d11";

export default node;
