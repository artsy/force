/**
 * @generated SignedSource<<4c5062c46faf9fb735c6db945f86335f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type Visibility = "LISTED" | "UNLISTED" | "%future added value";
export type ArtworkPageBanner_Test_Query$variables = Record<PropertyKey, never>;
export type ArtworkPageBanner_Test_Query$data = {
  readonly artwork: {
    readonly " $fragmentSpreads": FragmentRefs<"ArtworkPageBanner_artwork">;
  } | null | undefined;
  readonly me: {
    readonly " $fragmentSpreads": FragmentRefs<"ArtworkPageBanner_me">;
  } | null | undefined;
};
export type ArtworkPageBanner_Test_Query$rawResponse = {
  readonly artwork: {
    readonly id: string;
    readonly isPurchasable: boolean | null | undefined;
    readonly published: boolean;
    readonly sale: {
      readonly __typename: "Sale";
      readonly cascadingEndTimeIntervalMinutes: number | null | undefined;
      readonly extendedBiddingIntervalMinutes: number | null | undefined;
      readonly id: string;
      readonly isClosed: boolean | null | undefined;
    } | null | undefined;
    readonly visibilityLevel: Visibility | null | undefined;
  } | null | undefined;
  readonly me: {
    readonly id: string;
    readonly partnerOffersConnection: {
      readonly edges: ReadonlyArray<{
        readonly node: {
          readonly id: string;
          readonly internalID: string;
          readonly isActive: boolean | null | undefined;
        } | null | undefined;
      } | null | undefined> | null | undefined;
    } | null | undefined;
  } | null | undefined;
};
export type ArtworkPageBanner_Test_Query = {
  rawResponse: ArtworkPageBanner_Test_Query$rawResponse;
  response: ArtworkPageBanner_Test_Query$data;
  variables: ArtworkPageBanner_Test_Query$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "erik-s-mona-lisa"
  }
],
v1 = {
  "kind": "Literal",
  "name": "artworkID",
  "value": "erik-s-mona-lisa"
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "ArtworkPageBanner_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "Artwork",
        "kind": "LinkedField",
        "name": "artwork",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "ArtworkPageBanner_artwork"
          }
        ],
        "storageKey": "artwork(id:\"erik-s-mona-lisa\")"
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "Me",
        "kind": "LinkedField",
        "name": "me",
        "plural": false,
        "selections": [
          {
            "args": [
              (v1/*: any*/)
            ],
            "kind": "FragmentSpread",
            "name": "ArtworkPageBanner_me"
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "ArtworkPageBanner_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "Artwork",
        "kind": "LinkedField",
        "name": "artwork",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "published",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "visibilityLevel",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "isPurchasable",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Sale",
            "kind": "LinkedField",
            "name": "sale",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "__typename",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "isClosed",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "cascadingEndTimeIntervalMinutes",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "extendedBiddingIntervalMinutes",
                "storageKey": null
              },
              (v2/*: any*/)
            ],
            "storageKey": null
          },
          (v2/*: any*/)
        ],
        "storageKey": "artwork(id:\"erik-s-mona-lisa\")"
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "Me",
        "kind": "LinkedField",
        "name": "me",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": [
              (v1/*: any*/),
              {
                "kind": "Literal",
                "name": "first",
                "value": 1
              }
            ],
            "concreteType": "PartnerOfferToCollectorConnection",
            "kind": "LinkedField",
            "name": "partnerOffersConnection",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "PartnerOfferToCollectorEdge",
                "kind": "LinkedField",
                "name": "edges",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "PartnerOfferToCollector",
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
                        "name": "isActive",
                        "storageKey": null
                      },
                      (v2/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": "partnerOffersConnection(artworkID:\"erik-s-mona-lisa\",first:1)"
          },
          (v2/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "e614b10b22d48f742400a2fdb88bd52a",
    "id": null,
    "metadata": {},
    "name": "ArtworkPageBanner_Test_Query",
    "operationKind": "query",
    "text": "query ArtworkPageBanner_Test_Query {\n  artwork(id: \"erik-s-mona-lisa\") {\n    ...ArtworkPageBanner_artwork\n    id\n  }\n  me {\n    ...ArtworkPageBanner_me_4FqYAG\n    id\n  }\n}\n\nfragment ArtworkPageBanner_artwork on Artwork {\n  published\n  visibilityLevel\n  isPurchasable\n  sale {\n    __typename\n    ...CascadingEndTimesBanner_sale\n    id\n  }\n}\n\nfragment ArtworkPageBanner_me_4FqYAG on Me {\n  partnerOffersConnection(artworkID: \"erik-s-mona-lisa\", first: 1) {\n    edges {\n      node {\n        internalID\n        isActive\n        id\n      }\n    }\n  }\n}\n\nfragment CascadingEndTimesBanner_sale on Sale {\n  isClosed\n  cascadingEndTimeIntervalMinutes\n  extendedBiddingIntervalMinutes\n}\n"
  }
};
})();

(node as any).hash = "a69345c4256ec74fa0873a65a0fb01dd";

export default node;
