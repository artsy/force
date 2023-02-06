/**
 * @generated SignedSource<<1b600ec495be40a949453022e3c75ed7>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CollectorProfileSaves2Route_me$data = {
  readonly collectionsConnection: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly default: boolean;
        readonly internalID: string;
        readonly " $fragmentSpreads": FragmentRefs<"SavesItem_item">;
      } | null;
    } | null> | null;
  } | null;
  readonly " $fragmentType": "CollectorProfileSaves2Route_me";
};
export type CollectorProfileSaves2Route_me$key = {
  readonly " $data"?: CollectorProfileSaves2Route_me$data;
  readonly " $fragmentSpreads": FragmentRefs<"CollectorProfileSaves2Route_me">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "CollectorProfileSaves2Route_me",
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
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "default",
                  "storageKey": null
                },
                {
                  "args": null,
                  "kind": "FragmentSpread",
                  "name": "SavesItem_item"
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

(node as any).hash = "7b4395e3ff0188bf00db39ea72937d3e";

export default node;
