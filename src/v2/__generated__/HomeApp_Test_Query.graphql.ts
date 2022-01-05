/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type HomeApp_Test_QueryVariables = {};
export type HomeApp_Test_QueryResponse = {
    readonly homePage: {
        readonly " $fragmentRefs": FragmentRefs<"HomeApp_homePage">;
    } | null;
    readonly featuredEventsOrderedSet: {
        readonly " $fragmentRefs": FragmentRefs<"HomeApp_featuredEventsOrderedSet">;
    } | null;
};
export type HomeApp_Test_Query = {
    readonly response: HomeApp_Test_QueryResponse;
    readonly variables: HomeApp_Test_QueryVariables;
};



/*
query HomeApp_Test_Query {
  homePage {
    ...HomeApp_homePage
  }
  featuredEventsOrderedSet: orderedSet(id: "example") {
    ...HomeApp_featuredEventsOrderedSet
    id
  }
}

fragment HomeApp_featuredEventsOrderedSet on OrderedSet {
  ...HomeFeaturedEventsRail_orderedSet
}

fragment HomeApp_homePage on HomePage {
  ...HomeHeroUnits_homePage
}

fragment HomeFeaturedEventsRail_orderedSet on OrderedSet {
  items {
    __typename
    ... on FeaturedLink {
      internalID
      title
      subtitle
      href
      image {
        small: cropped(width: 95, height: 63, version: ["main", "wide", "large_rectangle"]) {
          src
          srcSet
          width
          height
        }
        large: cropped(width: 445, height: 297, version: ["main", "wide", "large_rectangle"]) {
          src
          srcSet
        }
      }
      id
    }
    ... on Node {
      id
    }
    ... on Profile {
      id
    }
  }
}

fragment HomeHeroUnit_heroUnit on HomePageHeroUnit {
  backgroundImageURL
  heading
  title
  subtitle
  linkText
  href
  creditLine
}

fragment HomeHeroUnits_homePage on HomePage {
  heroUnits(platform: DESKTOP) {
    internalID
    ...HomeHeroUnit_heroUnit
    id
  }
}
*/

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
v9 = {
  "type": "ID",
  "enumValues": null,
  "plural": false,
  "nullable": true
},
v10 = {
  "type": "String",
  "enumValues": null,
  "plural": false,
  "nullable": false
},
v11 = {
  "type": "String",
  "enumValues": null,
  "plural": false,
  "nullable": true
},
v12 = {
  "type": "CroppedImageUrl",
  "enumValues": null,
  "plural": false,
  "nullable": true
},
v13 = {
  "type": "Int",
  "enumValues": null,
  "plural": false,
  "nullable": false
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
    "type": "Query"
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
              (v5/*: any*/),
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
                  }
                ],
                "type": "FeaturedLink"
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
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "homePage": {
          "type": "HomePage",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "featuredEventsOrderedSet": {
          "type": "OrderedSet",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "featuredEventsOrderedSet.id": (v9/*: any*/),
        "homePage.heroUnits": {
          "type": "HomePageHeroUnit",
          "enumValues": null,
          "plural": true,
          "nullable": true
        },
        "featuredEventsOrderedSet.items": {
          "type": "OrderedSetItem",
          "enumValues": null,
          "plural": true,
          "nullable": true
        },
        "homePage.heroUnits.internalID": {
          "type": "ID",
          "enumValues": null,
          "plural": false,
          "nullable": false
        },
        "homePage.heroUnits.id": (v9/*: any*/),
        "featuredEventsOrderedSet.items.__typename": (v10/*: any*/),
        "homePage.heroUnits.backgroundImageURL": (v11/*: any*/),
        "homePage.heroUnits.heading": (v11/*: any*/),
        "homePage.heroUnits.title": (v11/*: any*/),
        "homePage.heroUnits.subtitle": (v11/*: any*/),
        "homePage.heroUnits.linkText": (v11/*: any*/),
        "homePage.heroUnits.href": (v11/*: any*/),
        "homePage.heroUnits.creditLine": (v11/*: any*/),
        "featuredEventsOrderedSet.items.internalID": (v11/*: any*/),
        "featuredEventsOrderedSet.items.title": (v11/*: any*/),
        "featuredEventsOrderedSet.items.subtitle": (v11/*: any*/),
        "featuredEventsOrderedSet.items.href": (v11/*: any*/),
        "featuredEventsOrderedSet.items.image": {
          "type": "Image",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "featuredEventsOrderedSet.items.id": (v9/*: any*/),
        "featuredEventsOrderedSet.items.image.small": (v12/*: any*/),
        "featuredEventsOrderedSet.items.image.large": (v12/*: any*/),
        "featuredEventsOrderedSet.items.image.small.src": (v10/*: any*/),
        "featuredEventsOrderedSet.items.image.small.srcSet": (v10/*: any*/),
        "featuredEventsOrderedSet.items.image.small.width": (v13/*: any*/),
        "featuredEventsOrderedSet.items.image.small.height": (v13/*: any*/),
        "featuredEventsOrderedSet.items.image.large.src": (v10/*: any*/),
        "featuredEventsOrderedSet.items.image.large.srcSet": (v10/*: any*/)
      }
    },
    "name": "HomeApp_Test_Query",
    "operationKind": "query",
    "text": "query HomeApp_Test_Query {\n  homePage {\n    ...HomeApp_homePage\n  }\n  featuredEventsOrderedSet: orderedSet(id: \"example\") {\n    ...HomeApp_featuredEventsOrderedSet\n    id\n  }\n}\n\nfragment HomeApp_featuredEventsOrderedSet on OrderedSet {\n  ...HomeFeaturedEventsRail_orderedSet\n}\n\nfragment HomeApp_homePage on HomePage {\n  ...HomeHeroUnits_homePage\n}\n\nfragment HomeFeaturedEventsRail_orderedSet on OrderedSet {\n  items {\n    __typename\n    ... on FeaturedLink {\n      internalID\n      title\n      subtitle\n      href\n      image {\n        small: cropped(width: 95, height: 63, version: [\"main\", \"wide\", \"large_rectangle\"]) {\n          src\n          srcSet\n          width\n          height\n        }\n        large: cropped(width: 445, height: 297, version: [\"main\", \"wide\", \"large_rectangle\"]) {\n          src\n          srcSet\n        }\n      }\n      id\n    }\n    ... on Node {\n      id\n    }\n    ... on Profile {\n      id\n    }\n  }\n}\n\nfragment HomeHeroUnit_heroUnit on HomePageHeroUnit {\n  backgroundImageURL\n  heading\n  title\n  subtitle\n  linkText\n  href\n  creditLine\n}\n\nfragment HomeHeroUnits_homePage on HomePage {\n  heroUnits(platform: DESKTOP) {\n    internalID\n    ...HomeHeroUnit_heroUnit\n    id\n  }\n}\n"
  }
};
})();
(node as any).hash = 'c68ccd47af7ec30810d0ca752960e251';
export default node;
