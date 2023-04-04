/**
 * @generated SignedSource<<c6e897d9c9c0ee9f23c76141af9b3276>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CollectorProfileSaves2Route_me$data = {
  readonly allSavesArtworkList: {
    readonly internalID: string;
    readonly " $fragmentSpreads": FragmentRefs<"ArtworkListItem_item">;
  } | null;
  readonly customArtworkLists: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly default: boolean;
        readonly internalID: string;
        readonly " $fragmentSpreads": FragmentRefs<"ArtworkListItem_item">;
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
  "name": "ArtworkListItem_item"
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": {
    "connection": [
      {
        "count": null,
        "cursor": null,
        "direction": "forward",
        "path": [
          "customArtworkLists"
        ]
      }
    ]
  },
  "name": "CollectorProfileSaves2Route_me",
  "selections": [
    {
      "alias": "allSavesArtworkList",
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
      "alias": "customArtworkLists",
      "args": null,
      "concreteType": "CollectionsConnection",
      "kind": "LinkedField",
      "name": "__CollectorProfileSaves2Route_customArtworkLists_connection",
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
                (v1/*: any*/),
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "__typename",
                  "storageKey": null
                }
              ],
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "cursor",
              "storageKey": null
            }
          ],
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "PageInfo",
          "kind": "LinkedField",
          "name": "pageInfo",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "endCursor",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "hasNextPage",
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Me",
  "abstractKey": null
};
})();

(node as any).hash = "38bba4625a0a53bd9aa326879721d816";

export default node;
