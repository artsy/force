/**
 * @generated SignedSource<<55d0fa41745de942570241f317395ede>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SaveButton_artwork$data = {
  readonly collectorSignals: {
    readonly auction: {
      readonly lotClosesAt: string | null | undefined;
      readonly lotWatcherCount: number;
    } | null | undefined;
  } | null | undefined;
  readonly id: string;
  readonly image: {
    readonly aspectRatio: number;
    readonly url: string | null | undefined;
  } | null | undefined;
  readonly internalID: string;
  readonly isSaved: boolean | null | undefined;
  readonly slug: string;
  readonly title: string | null | undefined;
  readonly " $fragmentType": "SaveButton_artwork";
};
export type SaveButton_artwork$key = {
  readonly " $data"?: SaveButton_artwork$data;
  readonly " $fragmentSpreads": FragmentRefs<"SaveButton_artwork">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SaveButton_artwork",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    },
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
      "name": "slug",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "isSaved",
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
      "concreteType": "Image",
      "kind": "LinkedField",
      "name": "image",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": [
            {
              "kind": "Literal",
              "name": "version",
              "value": "large"
            }
          ],
          "kind": "ScalarField",
          "name": "url",
          "storageKey": "url(version:\"large\")"
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "aspectRatio",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "CollectorSignals",
      "kind": "LinkedField",
      "name": "collectorSignals",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "AuctionCollectorSignals",
          "kind": "LinkedField",
          "name": "auction",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "lotWatcherCount",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "lotClosesAt",
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Artwork",
  "abstractKey": null
};

(node as any).hash = "f7aae4b966a992abec5fd25214b3a716";

export default node;
