/**
 * @generated SignedSource<<95b3fb4ad92e1b01d9ff4e40c97dc7f8>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type NavBarMenuItemFeaturedLinkQuery$variables = {
  key: string;
};
export type NavBarMenuItemFeaturedLinkQuery$data = {
  readonly orderedSets: ReadonlyArray<{
    readonly " $fragmentSpreads": FragmentRefs<"NavBarMenuItemFeaturedLink_orderedSet">;
  } | null | undefined> | null | undefined;
};
export type NavBarMenuItemFeaturedLinkQuery = {
  response: NavBarMenuItemFeaturedLinkQuery$data;
  variables: NavBarMenuItemFeaturedLinkQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "key"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "key",
    "variableName": "key"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
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
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "NavBarMenuItemFeaturedLinkQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "OrderedSet",
        "kind": "LinkedField",
        "name": "orderedSets",
        "plural": true,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "NavBarMenuItemFeaturedLink_orderedSet"
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
    "name": "NavBarMenuItemFeaturedLinkQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "OrderedSet",
        "kind": "LinkedField",
        "name": "orderedSets",
        "plural": true,
        "selections": [
          (v2/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "itemType",
            "storageKey": null
          },
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
                  (v2/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "title",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": [
                      {
                        "kind": "Literal",
                        "name": "format",
                        "value": "PLAIN"
                      }
                    ],
                    "kind": "ScalarField",
                    "name": "subtitle",
                    "storageKey": "subtitle(format:\"PLAIN\")"
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
                        "alias": null,
                        "args": [
                          {
                            "kind": "Literal",
                            "name": "height",
                            "value": 400
                          },
                          {
                            "kind": "Literal",
                            "name": "version",
                            "value": [
                              "main",
                              "wide",
                              "large_rectangle"
                            ]
                          }
                        ],
                        "concreteType": "ResizedImageUrl",
                        "kind": "LinkedField",
                        "name": "resized",
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
                        "storageKey": "resized(height:400,version:[\"main\",\"wide\",\"large_rectangle\"])"
                      }
                    ],
                    "storageKey": null
                  },
                  (v3/*: any*/)
                ],
                "type": "FeaturedLink",
                "abstractKey": null
              },
              {
                "kind": "InlineFragment",
                "selections": (v4/*: any*/),
                "type": "Node",
                "abstractKey": "__isNode"
              },
              {
                "kind": "InlineFragment",
                "selections": (v4/*: any*/),
                "type": "Profile",
                "abstractKey": null
              },
              {
                "kind": "InlineFragment",
                "selections": (v4/*: any*/),
                "type": "Video",
                "abstractKey": null
              }
            ],
            "storageKey": null
          },
          (v3/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "8ffd6a533c3588b80447c096624d1a60",
    "id": null,
    "metadata": {},
    "name": "NavBarMenuItemFeaturedLinkQuery",
    "operationKind": "query",
    "text": "query NavBarMenuItemFeaturedLinkQuery(\n  $key: String!\n) {\n  orderedSets(key: $key) {\n    ...NavBarMenuItemFeaturedLink_orderedSet\n    id\n  }\n}\n\nfragment NavBarMenuItemFeaturedLink_orderedSet on OrderedSet {\n  internalID\n  itemType\n  items {\n    __typename\n    ... on FeaturedLink {\n      internalID\n      title\n      subtitle(format: PLAIN)\n      href\n      image {\n        resized(height: 400, version: [\"main\", \"wide\", \"large_rectangle\"]) {\n          src\n          srcSet\n        }\n      }\n      id\n    }\n    ... on Node {\n      __isNode: __typename\n      id\n    }\n    ... on Profile {\n      id\n    }\n    ... on Video {\n      id\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "d1d897f62f005927f75405d9e0db887a";

export default node;
