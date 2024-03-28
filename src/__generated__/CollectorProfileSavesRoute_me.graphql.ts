/**
 * @generated SignedSource<<886867bad519579baf4c237b829a64df>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CollectorProfileSavesRoute_me$data = {
  readonly customArtworkLists: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly default: boolean;
        readonly internalID: string;
        readonly shareableWithPartners: boolean;
        readonly " $fragmentSpreads": FragmentRefs<"ArtworkListItem_item" | "OfferSettingsListItem_item">;
      } | null | undefined;
    } | null | undefined> | null | undefined;
  } | null | undefined;
  readonly savedArtworksArtworkList: {
    readonly artworksConnection: {
      readonly totalCount: number | null | undefined;
    } | null | undefined;
    readonly internalID: string;
    readonly shareableWithPartners: boolean;
    readonly " $fragmentSpreads": FragmentRefs<"ArtworkListItem_item" | "OfferSettingsListItem_item">;
  } | null | undefined;
  readonly " $fragmentType": "CollectorProfileSavesRoute_me";
};
export type CollectorProfileSavesRoute_me$key = {
  readonly " $data"?: CollectorProfileSavesRoute_me$data;
  readonly " $fragmentSpreads": FragmentRefs<"CollectorProfileSavesRoute_me">;
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
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "shareableWithPartners",
  "storageKey": null
},
v2 = {
  "args": null,
  "kind": "FragmentSpread",
  "name": "ArtworkListItem_item"
},
v3 = {
  "args": null,
  "kind": "FragmentSpread",
  "name": "OfferSettingsListItem_item"
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
  "name": "CollectorProfileSavesRoute_me",
  "selections": [
    {
      "alias": "savedArtworksArtworkList",
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
        (v1/*: any*/),
        (v2/*: any*/),
        (v3/*: any*/),
        {
          "alias": null,
          "args": [
            {
              "kind": "Literal",
              "name": "first",
              "value": 4
            }
          ],
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
          "storageKey": "artworksConnection(first:4)"
        }
      ],
      "storageKey": "collection(id:\"saved-artwork\")"
    },
    {
      "alias": "customArtworkLists",
      "args": null,
      "concreteType": "CollectionsConnection",
      "kind": "LinkedField",
      "name": "__CollectorProfileSavesRoute_customArtworkLists_connection",
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
                (v2/*: any*/),
                (v3/*: any*/),
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

(node as any).hash = "08a824fa4155abab44470b620fbd6640";

export default node;
