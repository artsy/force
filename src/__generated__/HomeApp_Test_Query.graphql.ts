/**
 * @generated SignedSource<<8cd929810928163e140d9156151002bd>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type HomeApp_Test_Query$variables = {};
export type HomeApp_Test_Query$data = {
  readonly featuredEventsOrderedSet: {
    readonly " $fragmentSpreads": FragmentRefs<"HomeApp_featuredEventsOrderedSet">;
  } | null;
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
v1 = {
  "kind": "Literal",
  "name": "version",
  "value": [
    "main",
    "wide",
    "large_rectangle"
  ]
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "src",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "srcSet",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v5 = [
  (v4/*: any*/)
],
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
},
v9 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "CroppedImageUrl"
},
v10 = {
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
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "title",
                    "storageKey": null
                  },
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
                            "value": 63
                          },
                          (v1/*: any*/),
                          {
                            "kind": "Literal",
                            "name": "width",
                            "value": 95
                          }
                        ],
                        "concreteType": "CroppedImageUrl",
                        "kind": "LinkedField",
                        "name": "cropped",
                        "plural": false,
                        "selections": [
                          (v2/*: any*/),
                          (v3/*: any*/),
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
                        "storageKey": "cropped(height:63,version:[\"main\",\"wide\",\"large_rectangle\"],width:95)"
                      },
                      {
                        "alias": "large",
                        "args": [
                          {
                            "kind": "Literal",
                            "name": "height",
                            "value": 297
                          },
                          (v1/*: any*/),
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
                          (v2/*: any*/),
                          (v3/*: any*/)
                        ],
                        "storageKey": "cropped(height:297,version:[\"main\",\"wide\",\"large_rectangle\"],width:445)"
                      }
                    ],
                    "storageKey": null
                  },
                  (v4/*: any*/)
                ],
                "type": "FeaturedLink",
                "abstractKey": null
              },
              {
                "kind": "InlineFragment",
                "selections": (v5/*: any*/),
                "type": "Node",
                "abstractKey": "__isNode"
              },
              {
                "kind": "InlineFragment",
                "selections": (v5/*: any*/),
                "type": "Profile",
                "abstractKey": null
              }
            ],
            "storageKey": null
          },
          (v4/*: any*/)
        ],
        "storageKey": "orderedSet(id:\"example\")"
      }
    ]
  },
  "params": {
    "cacheID": "9ce6e024b610bf8d52cdcdf08809fd23",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "featuredEventsOrderedSet": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "OrderedSet"
        },
        "featuredEventsOrderedSet.id": (v6/*: any*/),
        "featuredEventsOrderedSet.items": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "OrderedSetItem"
        },
        "featuredEventsOrderedSet.items.__isNode": (v7/*: any*/),
        "featuredEventsOrderedSet.items.__typename": (v7/*: any*/),
        "featuredEventsOrderedSet.items.href": (v8/*: any*/),
        "featuredEventsOrderedSet.items.id": (v6/*: any*/),
        "featuredEventsOrderedSet.items.image": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Image"
        },
        "featuredEventsOrderedSet.items.image.large": (v9/*: any*/),
        "featuredEventsOrderedSet.items.image.large.src": (v7/*: any*/),
        "featuredEventsOrderedSet.items.image.large.srcSet": (v7/*: any*/),
        "featuredEventsOrderedSet.items.image.small": (v9/*: any*/),
        "featuredEventsOrderedSet.items.image.small.height": (v10/*: any*/),
        "featuredEventsOrderedSet.items.image.small.src": (v7/*: any*/),
        "featuredEventsOrderedSet.items.image.small.srcSet": (v7/*: any*/),
        "featuredEventsOrderedSet.items.image.small.width": (v10/*: any*/),
        "featuredEventsOrderedSet.items.internalID": (v6/*: any*/),
        "featuredEventsOrderedSet.items.subtitle": (v8/*: any*/),
        "featuredEventsOrderedSet.items.title": (v8/*: any*/)
      }
    },
    "name": "HomeApp_Test_Query",
    "operationKind": "query",
    "text": "query HomeApp_Test_Query {\n  featuredEventsOrderedSet: orderedSet(id: \"example\") {\n    ...HomeApp_featuredEventsOrderedSet\n    id\n  }\n}\n\nfragment HomeApp_featuredEventsOrderedSet on OrderedSet {\n  ...HomeFeaturedEventsRail_orderedSet\n}\n\nfragment HomeFeaturedEventsRail_orderedSet on OrderedSet {\n  items {\n    __typename\n    ... on FeaturedLink {\n      internalID\n      title\n      subtitle\n      href\n      image {\n        small: cropped(width: 95, height: 63, version: [\"main\", \"wide\", \"large_rectangle\"]) {\n          src\n          srcSet\n          width\n          height\n        }\n        large: cropped(width: 445, height: 297, version: [\"main\", \"wide\", \"large_rectangle\"]) {\n          src\n          srcSet\n        }\n      }\n      id\n    }\n    ... on Node {\n      __isNode: __typename\n      id\n    }\n    ... on Profile {\n      id\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "659b364266caf7b1a5df59d3b4d2033a";

export default node;
