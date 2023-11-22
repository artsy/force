/**
 * @generated SignedSource<<6cf86937e0d304cf4f5491b057d43693>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type HomeFeaturedShowsRail_Test_Query$variables = Record<PropertyKey, never>;
export type HomeFeaturedShowsRail_Test_Query$data = {
  readonly orderedSet: {
    readonly " $fragmentSpreads": FragmentRefs<"HomeFeaturedShowsRail_orderedSet">;
  } | null | undefined;
};
export type HomeFeaturedShowsRail_Test_Query = {
  response: HomeFeaturedShowsRail_Test_Query$data;
  variables: HomeFeaturedShowsRail_Test_Query$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "example"
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v4 = [
  (v3/*: any*/)
],
v5 = {
  "kind": "InlineFragment",
  "selections": (v4/*: any*/),
  "type": "Node",
  "abstractKey": "__isNode"
},
v6 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
},
v7 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "String"
},
v8 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "HomeFeaturedShowsRail_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "OrderedSet",
        "kind": "LinkedField",
        "name": "orderedSet",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "HomeFeaturedShowsRail_orderedSet"
          }
        ],
        "storageKey": "orderedSet(id:\"example\")"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "HomeFeaturedShowsRail_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "OrderedSet",
        "kind": "LinkedField",
        "name": "orderedSet",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": null,
            "kind": "LinkedField",
            "name": "items",
            "plural": true,
            "selections": [
              (v1/*: any*/),
              {
                "kind": "InlineFragment",
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
                  (v2/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "href",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "startAt",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "endAt",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "isFairBooth",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "exhibitionPeriod",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": null,
                    "kind": "LinkedField",
                    "name": "partner",
                    "plural": false,
                    "selections": [
                      (v1/*: any*/),
                      {
                        "kind": "InlineFragment",
                        "selections": [
                          (v2/*: any*/)
                        ],
                        "type": "Partner",
                        "abstractKey": null
                      },
                      (v5/*: any*/),
                      {
                        "kind": "InlineFragment",
                        "selections": (v4/*: any*/),
                        "type": "ExternalPartner",
                        "abstractKey": null
                      }
                    ],
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Image",
                    "kind": "LinkedField",
                    "name": "coverImage",
                    "plural": false,
                    "selections": [
                      {
                        "alias": null,
                        "args": [
                          {
                            "kind": "Literal",
                            "name": "height",
                            "value": 334
                          },
                          {
                            "kind": "Literal",
                            "name": "version",
                            "value": [
                              "larger",
                              "large"
                            ]
                          },
                          {
                            "kind": "Literal",
                            "name": "width",
                            "value": 445
                          }
                        ],
                        "concreteType": "CroppedImageUrl",
                        "kind": "LinkedField",
                        "name": "cropped",
                        "plural": false,
                        "selections": [
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "src",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "srcSet",
                            "storageKey": null
                          }
                        ],
                        "storageKey": "cropped(height:334,version:[\"larger\",\"large\"],width:445)"
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "type": "Show",
                "abstractKey": null
              },
              (v5/*: any*/),
              {
                "kind": "InlineFragment",
                "selections": (v4/*: any*/),
                "type": "FeaturedLink",
                "abstractKey": null
              },
              {
                "kind": "InlineFragment",
                "selections": (v4/*: any*/),
                "type": "Profile",
                "abstractKey": null
              }
            ],
            "storageKey": null
          },
          (v3/*: any*/)
        ],
        "storageKey": "orderedSet(id:\"example\")"
      }
    ]
  },
  "params": {
    "cacheID": "3dca8b4eb2fb2bf82ef845016da08138",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "orderedSet": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "OrderedSet"
        },
        "orderedSet.id": (v6/*: any*/),
        "orderedSet.items": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "OrderedSetItem"
        },
        "orderedSet.items.__isNode": (v7/*: any*/),
        "orderedSet.items.__typename": (v7/*: any*/),
        "orderedSet.items.coverImage": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Image"
        },
        "orderedSet.items.coverImage.cropped": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "CroppedImageUrl"
        },
        "orderedSet.items.coverImage.cropped.src": (v7/*: any*/),
        "orderedSet.items.coverImage.cropped.srcSet": (v7/*: any*/),
        "orderedSet.items.endAt": (v8/*: any*/),
        "orderedSet.items.exhibitionPeriod": (v8/*: any*/),
        "orderedSet.items.href": (v8/*: any*/),
        "orderedSet.items.id": (v6/*: any*/),
        "orderedSet.items.internalID": (v6/*: any*/),
        "orderedSet.items.isFairBooth": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Boolean"
        },
        "orderedSet.items.name": (v8/*: any*/),
        "orderedSet.items.partner": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "PartnerTypes"
        },
        "orderedSet.items.partner.__isNode": (v7/*: any*/),
        "orderedSet.items.partner.__typename": (v7/*: any*/),
        "orderedSet.items.partner.id": (v6/*: any*/),
        "orderedSet.items.partner.name": (v8/*: any*/),
        "orderedSet.items.slug": (v6/*: any*/),
        "orderedSet.items.startAt": (v8/*: any*/)
      }
    },
    "name": "HomeFeaturedShowsRail_Test_Query",
    "operationKind": "query",
    "text": "query HomeFeaturedShowsRail_Test_Query {\n  orderedSet(id: \"example\") {\n    ...HomeFeaturedShowsRail_orderedSet\n    id\n  }\n}\n\nfragment CellShow_show on Show {\n  internalID\n  slug\n  name\n  href\n  startAt\n  endAt\n  isFairBooth\n  exhibitionPeriod\n  partner {\n    __typename\n    ... on Partner {\n      name\n    }\n    ... on Node {\n      __isNode: __typename\n      id\n    }\n    ... on ExternalPartner {\n      id\n    }\n  }\n  coverImage {\n    cropped(width: 445, height: 334, version: [\"larger\", \"large\"]) {\n      src\n      srcSet\n    }\n  }\n}\n\nfragment HomeFeaturedShow_show on Show {\n  ...CellShow_show\n  internalID\n  slug\n}\n\nfragment HomeFeaturedShowsRail_orderedSet on OrderedSet {\n  items {\n    __typename\n    ... on Show {\n      ...HomeFeaturedShow_show\n      internalID\n    }\n    ... on Node {\n      __isNode: __typename\n      id\n    }\n    ... on FeaturedLink {\n      id\n    }\n    ... on Profile {\n      id\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "4bf647cb7acfa53ac3204fd28dbe4199";

export default node;
