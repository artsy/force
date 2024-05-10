/**
 * @generated SignedSource<<61154854c32c1aeba16f3b910a95b7bf>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type HomeApp_Test_Query$variables = Record<PropertyKey, never>;
export type HomeApp_Test_Query$data = {
  readonly featuredEventsOrderedSet: {
    readonly " $fragmentSpreads": FragmentRefs<"HomeApp_featuredEventsOrderedSet">;
  } | null | undefined;
  readonly heroUnitsConnection: {
    readonly " $fragmentSpreads": FragmentRefs<"HomeApp_heroUnitsConnection">;
  } | null | undefined;
};
export type HomeApp_Test_Query = {
  response: HomeApp_Test_Query$data;
  variables: HomeApp_Test_Query$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "example"
  }
],
v1 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 10
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "title",
  "storageKey": null
},
v3 = {
  "kind": "Literal",
  "name": "version",
  "value": [
    "main",
    "wide",
    "large_rectangle"
  ]
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "src",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "srcSet",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v7 = [
  (v6/*: any*/)
],
v8 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
},
v9 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "String"
},
v10 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
},
v11 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Image"
},
v12 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "CroppedImageUrl"
},
v13 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "Int"
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "HomeApp_Test_Query",
    "selections": [
      {
        "alias": "featuredEventsOrderedSet",
        "args": (v0/*: any*/),
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
        "storageKey": "orderedSet(id:\"example\")"
      },
      {
        "alias": null,
        "args": (v1/*: any*/),
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
        "storageKey": "heroUnitsConnection(first:10)"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "HomeApp_Test_Query",
    "selections": [
      {
        "alias": "featuredEventsOrderedSet",
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
                  (v2/*: any*/),
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
                          (v3/*: any*/),
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
                          (v4/*: any*/),
                          (v5/*: any*/),
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
                          (v3/*: any*/),
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
                          (v4/*: any*/),
                          (v5/*: any*/)
                        ],
                        "storageKey": "cropped(height:297,version:[\"main\",\"wide\",\"large_rectangle\"],width:445)"
                      }
                    ],
                    "storageKey": null
                  },
                  (v6/*: any*/)
                ],
                "type": "FeaturedLink",
                "abstractKey": null
              },
              {
                "kind": "InlineFragment",
                "selections": (v7/*: any*/),
                "type": "Node",
                "abstractKey": "__isNode"
              },
              {
                "kind": "InlineFragment",
                "selections": (v7/*: any*/),
                "type": "Profile",
                "abstractKey": null
              }
            ],
            "storageKey": null
          },
          (v6/*: any*/)
        ],
        "storageKey": "orderedSet(id:\"example\")"
      },
      {
        "alias": null,
        "args": (v1/*: any*/),
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
                  (v2/*: any*/),
                  (v6/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": "heroUnitsConnection(first:10)"
      }
    ]
  },
  "params": {
    "cacheID": "539513fa29bafd1ad9175b04a5589e38",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "featuredEventsOrderedSet": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "OrderedSet"
        },
        "featuredEventsOrderedSet.id": (v8/*: any*/),
        "featuredEventsOrderedSet.items": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "OrderedSetItem"
        },
        "featuredEventsOrderedSet.items.__isNode": (v9/*: any*/),
        "featuredEventsOrderedSet.items.__typename": (v9/*: any*/),
        "featuredEventsOrderedSet.items.href": (v10/*: any*/),
        "featuredEventsOrderedSet.items.id": (v8/*: any*/),
        "featuredEventsOrderedSet.items.image": (v11/*: any*/),
        "featuredEventsOrderedSet.items.image.large": (v12/*: any*/),
        "featuredEventsOrderedSet.items.image.large.src": (v9/*: any*/),
        "featuredEventsOrderedSet.items.image.large.srcSet": (v9/*: any*/),
        "featuredEventsOrderedSet.items.image.small": (v12/*: any*/),
        "featuredEventsOrderedSet.items.image.small.height": (v13/*: any*/),
        "featuredEventsOrderedSet.items.image.small.src": (v9/*: any*/),
        "featuredEventsOrderedSet.items.image.small.srcSet": (v9/*: any*/),
        "featuredEventsOrderedSet.items.image.small.width": (v13/*: any*/),
        "featuredEventsOrderedSet.items.internalID": (v8/*: any*/),
        "featuredEventsOrderedSet.items.subtitle": (v10/*: any*/),
        "featuredEventsOrderedSet.items.title": (v10/*: any*/),
        "heroUnitsConnection": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "HeroUnitConnection"
        },
        "heroUnitsConnection.edges": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "HeroUnitEdge"
        },
        "heroUnitsConnection.edges.node": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "HeroUnit"
        },
        "heroUnitsConnection.edges.node.body": (v9/*: any*/),
        "heroUnitsConnection.edges.node.credit": (v10/*: any*/),
        "heroUnitsConnection.edges.node.id": (v8/*: any*/),
        "heroUnitsConnection.edges.node.image": (v11/*: any*/),
        "heroUnitsConnection.edges.node.image.imageURL": (v10/*: any*/),
        "heroUnitsConnection.edges.node.label": (v10/*: any*/),
        "heroUnitsConnection.edges.node.link": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "HeroUnitLink"
        },
        "heroUnitsConnection.edges.node.link.text": (v9/*: any*/),
        "heroUnitsConnection.edges.node.link.url": (v9/*: any*/),
        "heroUnitsConnection.edges.node.title": (v9/*: any*/)
      }
    },
    "name": "HomeApp_Test_Query",
    "operationKind": "query",
    "text": "query HomeApp_Test_Query {\n  featuredEventsOrderedSet: orderedSet(id: \"example\") {\n    ...HomeApp_featuredEventsOrderedSet\n    id\n  }\n  heroUnitsConnection(first: 10) {\n    ...HomeApp_heroUnitsConnection\n  }\n}\n\nfragment HomeApp_featuredEventsOrderedSet on OrderedSet {\n  ...HomeFeaturedEventsRail_orderedSet\n}\n\nfragment HomeApp_heroUnitsConnection on HeroUnitConnection {\n  ...HomeHeroUnits_heroUnits\n}\n\nfragment HomeFeaturedEventsRail_orderedSet on OrderedSet {\n  items {\n    __typename\n    ... on FeaturedLink {\n      internalID\n      title\n      subtitle\n      href\n      image {\n        small: cropped(width: 80, height: 80, version: [\"main\", \"wide\", \"large_rectangle\"]) {\n          src\n          srcSet\n          width\n          height\n        }\n        large: cropped(width: 445, height: 297, version: [\"main\", \"wide\", \"large_rectangle\"]) {\n          src\n          srcSet\n        }\n      }\n      id\n    }\n    ... on Node {\n      __isNode: __typename\n      id\n    }\n    ... on Profile {\n      id\n    }\n  }\n}\n\nfragment HomeHeroUnit_heroUnit on HeroUnit {\n  body\n  credit\n  image {\n    imageURL\n  }\n  label\n  link {\n    text\n    url\n  }\n  title\n}\n\nfragment HomeHeroUnits_heroUnits on HeroUnitConnection {\n  edges {\n    node {\n      ...HomeHeroUnit_heroUnit\n      id\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "fcc85b86fb1b767b9c94712579db1172";

export default node;
