/**
 * @generated SignedSource<<c4e16ed046fbfee43ae58f45afcbbafe>>
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
    readonly " $fragmentSpreads": FragmentRefs<"ArtworkGrid_artworks">;
  } | null | undefined;
  readonly id: string;
  readonly name: string;
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
      "name": "id",
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
      "args": [
        {
          "kind": "Literal",
          "name": "first",
          "value": 10
        }
      ],
      "concreteType": "ArtworkConnection",
      "kind": "LinkedField",
      "name": "artworksConnection",
      "plural": false,
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "ArtworkGrid_artworks"
        }
      ],
      "storageKey": "artworksConnection(first:10)"
    }
  ],
  "type": "Collection",
  "abstractKey": null
};

(node as any).hash = "a96cce66b25a20a2ff2b716b131e1da0";

export default node;
