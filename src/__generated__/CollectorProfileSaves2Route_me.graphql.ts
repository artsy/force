/**
 * @generated SignedSource<<68f6ca4b12df51a73969e8d20b6eba79>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CollectorProfileSaves2Route_me$data = {
  readonly defaultSaves: {
    readonly internalID: string;
    readonly " $fragmentSpreads": FragmentRefs<"SavesItem_item">;
  } | null;
  readonly otherSaves: {
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

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
  "storageKey": null
},
v1 = {
  "args": null,
  "kind": "FragmentSpread",
  "name": "SavesItem_item"
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "CollectorProfileSaves2Route_me",
  "selections": [
    {
      "alias": "defaultSaves",
      "args": [
        {
          "kind": "Literal",
          "name": "id",
          "value": "saved-artwork"
        }
      ],
      "concreteType": "Collection",
      "kind": "LinkedField",
      "name": "collection",
      "plural": false,
      "selections": [
        (v0/*: any*/),
        (v1/*: any*/)
      ],
      "storageKey": "collection(id:\"saved-artwork\")"
    },
    {
      "alias": "otherSaves",
      "args": [
        {
          "kind": "Literal",
          "name": "default",
          "value": false
        },
        {
          "kind": "Literal",
          "name": "first",
          "value": 20
        },
        {
          "kind": "Literal",
          "name": "saves",
          "value": true
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
                (v0/*: any*/),
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "default",
                  "storageKey": null
                },
                (v1/*: any*/)
              ],
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": "collectionsConnection(default:false,first:20,saves:true)"
    }
  ],
  "type": "Me",
  "abstractKey": null
};
})();

(node as any).hash = "09e0ae544fde84607cd63834a5be2d91";

export default node;
