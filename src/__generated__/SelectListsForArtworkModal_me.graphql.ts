/**
 * @generated SignedSource<<0b565030f020ba3a4d9255a82cdd71db>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SelectListsForArtworkModal_me$data = {
  readonly collectionsConnection: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly internalID: string;
        readonly " $fragmentSpreads": FragmentRefs<"SelectListItem_item">;
      } | null;
    } | null> | null;
  } | null;
  readonly " $fragmentType": "SelectListsForArtworkModal_me";
};
export type SelectListsForArtworkModal_me$key = {
  readonly " $data"?: SelectListsForArtworkModal_me$data;
  readonly " $fragmentSpreads": FragmentRefs<"SelectListsForArtworkModal_me">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SelectListsForArtworkModal_me",
  "selections": [
    {
      "alias": null,
      "args": [
        {
          "kind": "Literal",
          "name": "first",
          "value": 20
        }
      ],
      "concreteType": "CollectionsConnection",
      "kind": "LinkedField",
      "name": "collectionsConnection",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "CollectionsEdge",
          "kind": "LinkedField",
          "name": "edges",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "Collection",
              "kind": "LinkedField",
              "name": "node",
              "plural": false,
              "selections": [
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "internalID",
                  "storageKey": null
                },
                {
                  "args": null,
                  "kind": "FragmentSpread",
                  "name": "SelectListItem_item"
                }
              ],
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": "collectionsConnection(first:20)"
    }
  ],
  "type": "Me",
  "abstractKey": null
};

(node as any).hash = "cb4f666bb2286b5e227dc17a1ff3f0b7";

export default node;
