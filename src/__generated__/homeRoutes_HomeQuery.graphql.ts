/**
 * @generated SignedSource<<c6cc0d7c685817dbd8ada009792c798c>>
 * @relayHash 4b82532ce0d79388f046c2e38642c667
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 4b82532ce0d79388f046c2e38642c667

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type homeRoutes_HomeQuery$variables = {
  private: boolean;
};
export type homeRoutes_HomeQuery$data = {
  readonly featuredEventsOrderedSet: {
    readonly " $fragmentSpreads": FragmentRefs<"HomeApp_featuredEventsOrderedSet">;
  } | null | undefined;
  readonly heroUnitsConnection: {
    readonly " $fragmentSpreads": FragmentRefs<"HomeApp_heroUnitsConnection">;
  } | null | undefined;
};
export type homeRoutes_HomeQuery = {
  response: homeRoutes_HomeQuery$data;
  variables: homeRoutes_HomeQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "private"
  }
],
v1 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "529939e2275b245e290004a0"
  }
],
v2 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 10
  },
  {
    "kind": "Variable",
    "name": "private",
    "variableName": "private"
  }
],
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "title",
  "storageKey": null
},
v4 = {
  "kind": "Literal",
  "name": "version",
  "value": [
    "main",
    "wide",
    "large_rectangle"
  ]
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "src",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "srcSet",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v8 = [
  (v7/*: any*/)
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "homeRoutes_HomeQuery",
    "selections": [
      {
        "alias": "featuredEventsOrderedSet",
        "args": (v1/*: any*/),
        "concreteType": "OrderedSet",
        "kind": "LinkedField",
        "name": "orderedSet",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "HomeApp_featuredEventsOrderedSet"
          }
        ],
        "storageKey": "orderedSet(id:\"529939e2275b245e290004a0\")"
      },
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "HeroUnitConnection",
        "kind": "LinkedField",
        "name": "heroUnitsConnection",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "HomeApp_heroUnitsConnection"
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
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "homeRoutes_HomeQuery",
    "selections": [
      {
        "alias": "featuredEventsOrderedSet",
        "args": (v1/*: any*/),
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
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "__typename",
                "storageKey": null
              },
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
                  (v3/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "subtitle",
                    "storageKey": null
                  },
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
                    "concreteType": "Image",
                    "kind": "LinkedField",
                    "name": "image",
                    "plural": false,
                    "selections": [
                      {
                        "alias": "small",
                        "args": [
                          {
                            "kind": "Literal",
                            "name": "height",
                            "value": 80
                          },
                          (v4/*: any*/),
                          {
                            "kind": "Literal",
                            "name": "width",
                            "value": 80
                          }
                        ],
                        "concreteType": "CroppedImageUrl",
                        "kind": "LinkedField",
                        "name": "cropped",
                        "plural": false,
                        "selections": [
                          (v5/*: any*/),
                          (v6/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "width",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "height",
                            "storageKey": null
                          }
                        ],
                        "storageKey": "cropped(height:80,version:[\"main\",\"wide\",\"large_rectangle\"],width:80)"
                      },
                      {
                        "alias": "large",
                        "args": [
                          {
                            "kind": "Literal",
                            "name": "height",
                            "value": 297
                          },
                          (v4/*: any*/),
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
                          (v5/*: any*/),
                          (v6/*: any*/)
                        ],
                        "storageKey": "cropped(height:297,version:[\"main\",\"wide\",\"large_rectangle\"],width:445)"
                      }
                    ],
                    "storageKey": null
                  },
                  (v7/*: any*/)
                ],
                "type": "FeaturedLink",
                "abstractKey": null
              },
              {
                "kind": "InlineFragment",
                "selections": (v8/*: any*/),
                "type": "Node",
                "abstractKey": "__isNode"
              },
              {
                "kind": "InlineFragment",
                "selections": (v8/*: any*/),
                "type": "Profile",
                "abstractKey": null
              }
            ],
            "storageKey": null
          },
          (v7/*: any*/)
        ],
        "storageKey": "orderedSet(id:\"529939e2275b245e290004a0\")"
      },
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "HeroUnitConnection",
        "kind": "LinkedField",
        "name": "heroUnitsConnection",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "HeroUnitEdge",
            "kind": "LinkedField",
            "name": "edges",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "HeroUnit",
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "body",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "credit",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Image",
                    "kind": "LinkedField",
                    "name": "image",
                    "plural": false,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "imageURL",
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "label",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "HeroUnitLink",
                    "kind": "LinkedField",
                    "name": "link",
                    "plural": false,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "text",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "url",
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  },
                  (v3/*: any*/),
                  (v7/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "id": "4b82532ce0d79388f046c2e38642c667",
    "metadata": {},
    "name": "homeRoutes_HomeQuery",
    "operationKind": "query",
    "text": null
  }
};
})();

(node as any).hash = "7ce6cd8a9423f20ad73885944015116f";

export default node;
