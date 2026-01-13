/**
 * @generated SignedSource<<7dae9f06ba95cc618c8b769dae54d2ef>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type UserCollectionRoute_collection$data = {
  readonly artworksConnection: {
    readonly totalCount: number | null | undefined;
  } | null | undefined;
  readonly internalID: string;
  readonly name: string;
  readonly slug: string | null | undefined;
  readonly " $fragmentType": "UserCollectionRoute_collection";
};
export type UserCollectionRoute_collection$key = {
  readonly " $data"?: UserCollectionRoute_collection$data;
  readonly " $fragmentSpreads": FragmentRefs<"UserCollectionRoute_collection">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "UserCollectionRoute_collection",
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
      "name": "name",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "ArtworkConnection",
      "kind": "LinkedField",
      "name": "artworksConnection",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "totalCount",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Collection",
  "abstractKey": null
};

(node as any).hash = "a22566419c1471424eb4c0990a1743bb";

export default node;
