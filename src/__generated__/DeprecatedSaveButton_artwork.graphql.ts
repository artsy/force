/**
 * @generated SignedSource<<818b8124a151db9289eb8c7b9fb37e2a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type DeprecatedSaveButton_artwork$data = {
  readonly collectorSignals: {
    readonly auction: {
      readonly lotWatcherCount: number;
    } | null | undefined;
  } | null | undefined;
  readonly id: string;
  readonly image: {
    readonly aspectRatio: number;
    readonly url: string | null | undefined;
  } | null | undefined;
  readonly internalID: string;
  readonly isSavedToAnyList: boolean;
  readonly slug: string;
  readonly title: string | null | undefined;
  readonly " $fragmentType": "DeprecatedSaveButton_artwork";
};
export type DeprecatedSaveButton_artwork$key = {
  readonly " $data"?: DeprecatedSaveButton_artwork$data;
  readonly " $fragmentSpreads": FragmentRefs<"DeprecatedSaveButton_artwork">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "DeprecatedSaveButton_artwork",
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
      "name": "isSavedToAnyList",
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

(node as any).hash = "f40191b033d4818466b3b06e47973ccd";

export default node;
