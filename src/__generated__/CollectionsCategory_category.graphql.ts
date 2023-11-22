/**
 * @generated SignedSource<<770540461563104245ad9fbd7102c2ff>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CollectionsCategory_category$data = {
  readonly collections: ReadonlyArray<{
    readonly headerImage: string | null | undefined;
    readonly internalID: string;
    readonly slug: string;
    readonly title: string;
  }>;
  readonly name: string;
  readonly " $fragmentType": "CollectionsCategory_category";
};
export type CollectionsCategory_category$key = {
  readonly " $data"?: CollectionsCategory_category$data;
  readonly " $fragmentSpreads": FragmentRefs<"CollectionsCategory_category">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "CollectionsCategory_category",
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
      "concreteType": "MarketingCollection",
      "kind": "LinkedField",
      "name": "collections",
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
          "name": "slug",
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
          "name": "headerImage",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "MarketingCollectionCategory",
  "abstractKey": null
};

(node as any).hash = "5ae469ad039ffc6250b647eeac8e00e5";

export default node;
