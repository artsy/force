/**
 * @generated SignedSource<<617a3693228bb29efac2ec9bc3496347>>
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
  readonly homePage: {
    readonly " $fragmentSpreads": FragmentRefs<"HomeApp_homePage">;
  } | null;
  readonly featuredEventsOrderedSet: {
    readonly " $fragmentSpreads": FragmentRefs<"HomeApp_featuredEventsOrderedSet">;
  } | null;
};
export type HomeApp_Test_Query = {
  variables: HomeApp_Test_Query$variables;
  response: HomeApp_Test_Query$data;
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
  "name": "internalID",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "title",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "subtitle",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "href",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v6 = {
  "kind": "Literal",
  "name": "version",
  "value": [
    "main",
    "wide",
    "large_rectangle"
  ]
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "src",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "srcSet",
  "storageKey": null
},
v9 = [
  (v5/*: any*/)
],
v10 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
},
v11 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "String"
},
v12 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
},
v13 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "CroppedImageUrl"
},
v14 = {
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
        "alias": null,
        "args": null,
        "concreteType": "HomePage",
        "kind": "LinkedField",
        "name": "homePage",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "HomeApp_homePage"
          }
        ],
        "storageKey": null
      },
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
        "alias": null,
        "args": null,
        "concreteType": "HomePage",
        "kind": "LinkedField",
        "name": "homePage",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": [
              {
                "kind": "Literal",
                "name": "platform",
                "value": "DESKTOP"
              }
            ],
            "concreteType": "HomePageHeroUnit",
            "kind": "LinkedField",
            "name": "heroUnits",
            "plural": true,
            "selections": [
              (v1/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "backgroundImageURL",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "heading",
                "storageKey": null
              },
              (v2/*: any*/),
              (v3/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "linkText",
                "storageKey": null
              },
              (v4/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "creditLine",
                "storageKey": null
              },
              (v5/*: any*/)
            ],
            "storageKey": "heroUnits(platform:\"DESKTOP\")"
          }
        ],
        "storageKey": null
      },
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
                  (v1/*: any*/),
                  (v2/*: any*/),
                  (v3/*: any*/),
                  (v4/*: any*/),
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
                          (v6/*: any*/),
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
                          (v7/*: any*/),
                          (v8/*: any*/),
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
                          (v6/*: any*/),
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
                          (v7/*: any*/),
                          (v8/*: any*/)
                        ],
                        "storageKey": "cropped(height:297,version:[\"main\",\"wide\",\"large_rectangle\"],width:445)"
                      }
                    ],
                    "storageKey": null
                  },
                  (v5/*: any*/)
                ],
                "type": "FeaturedLink",
                "abstractKey": null
              },
              {
                "kind": "InlineFragment",
                "selections": (v9/*: any*/),
                "type": "Node",
                "abstractKey": "__isNode"
              },
              {
                "kind": "InlineFragment",
                "selections": (v9/*: any*/),
                "type": "Profile",
                "abstractKey": null
              }
            ],
            "storageKey": null
          },
          (v5/*: any*/)
        ],
        "storageKey": "orderedSet(id:\"example\")"
      }
    ]
  },
  "params": {
    "cacheID": "332b298d5f32a9bb1d41f1c3cdb7d084",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "featuredEventsOrderedSet": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "OrderedSet"
        },
        "featuredEventsOrderedSet.id": (v10/*: any*/),
        "featuredEventsOrderedSet.items": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "OrderedSetItem"
        },
        "featuredEventsOrderedSet.items.__isNode": (v11/*: any*/),
        "featuredEventsOrderedSet.items.__typename": (v11/*: any*/),
        "featuredEventsOrderedSet.items.href": (v12/*: any*/),
        "featuredEventsOrderedSet.items.id": (v10/*: any*/),
        "featuredEventsOrderedSet.items.image": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Image"
        },
        "featuredEventsOrderedSet.items.image.large": (v13/*: any*/),
        "featuredEventsOrderedSet.items.image.large.src": (v11/*: any*/),
        "featuredEventsOrderedSet.items.image.large.srcSet": (v11/*: any*/),
        "featuredEventsOrderedSet.items.image.small": (v13/*: any*/),
        "featuredEventsOrderedSet.items.image.small.height": (v14/*: any*/),
        "featuredEventsOrderedSet.items.image.small.src": (v11/*: any*/),
        "featuredEventsOrderedSet.items.image.small.srcSet": (v11/*: any*/),
        "featuredEventsOrderedSet.items.image.small.width": (v14/*: any*/),
        "featuredEventsOrderedSet.items.internalID": (v12/*: any*/),
        "featuredEventsOrderedSet.items.subtitle": (v12/*: any*/),
        "featuredEventsOrderedSet.items.title": (v12/*: any*/),
        "homePage": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "HomePage"
        },
        "homePage.heroUnits": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "HomePageHeroUnit"
        },
        "homePage.heroUnits.backgroundImageURL": (v12/*: any*/),
        "homePage.heroUnits.creditLine": (v12/*: any*/),
        "homePage.heroUnits.heading": (v12/*: any*/),
        "homePage.heroUnits.href": (v12/*: any*/),
        "homePage.heroUnits.id": (v10/*: any*/),
        "homePage.heroUnits.internalID": (v10/*: any*/),
        "homePage.heroUnits.linkText": (v12/*: any*/),
        "homePage.heroUnits.subtitle": (v12/*: any*/),
        "homePage.heroUnits.title": (v12/*: any*/)
      }
    },
    "name": "HomeApp_Test_Query",
    "operationKind": "query",
    "text": "query HomeApp_Test_Query {\n  homePage {\n    ...HomeApp_homePage\n  }\n  featuredEventsOrderedSet: orderedSet(id: \"example\") {\n    ...HomeApp_featuredEventsOrderedSet\n    id\n  }\n}\n\nfragment HomeApp_featuredEventsOrderedSet on OrderedSet {\n  ...HomeFeaturedEventsRail_orderedSet\n}\n\nfragment HomeApp_homePage on HomePage {\n  ...HomeHeroUnits_homePage\n}\n\nfragment HomeFeaturedEventsRail_orderedSet on OrderedSet {\n  items {\n    __typename\n    ... on FeaturedLink {\n      internalID\n      title\n      subtitle\n      href\n      image {\n        small: cropped(width: 95, height: 63, version: [\"main\", \"wide\", \"large_rectangle\"]) {\n          src\n          srcSet\n          width\n          height\n        }\n        large: cropped(width: 445, height: 297, version: [\"main\", \"wide\", \"large_rectangle\"]) {\n          src\n          srcSet\n        }\n      }\n      id\n    }\n    ... on Node {\n      __isNode: __typename\n      id\n    }\n    ... on Profile {\n      id\n    }\n  }\n}\n\nfragment HomeHeroUnit_heroUnit on HomePageHeroUnit {\n  backgroundImageURL\n  heading\n  title\n  subtitle\n  linkText\n  href\n  creditLine\n}\n\nfragment HomeHeroUnits_homePage on HomePage {\n  heroUnits(platform: DESKTOP) {\n    internalID\n    ...HomeHeroUnit_heroUnit\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "c68ccd47af7ec30810d0ca752960e251";

export default node;
