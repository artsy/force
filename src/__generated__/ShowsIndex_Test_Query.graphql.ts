/**
 * @generated SignedSource<<d65f9d44b253e27ff626cddad7ffb3a5>>
 * @relayHash 3a21fe9aeae3cd7ccafa5a87dc6d19ec
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 3a21fe9aeae3cd7ccafa5a87dc6d19ec

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ShowsIndex_Test_Query$variables = Record<PropertyKey, never>;
export type ShowsIndex_Test_Query$data = {
  readonly featuredShows: {
    readonly " $fragmentSpreads": FragmentRefs<"ShowsIndex_featuredShows">;
  } | null | undefined;
  readonly viewer: {
    readonly " $fragmentSpreads": FragmentRefs<"ShowsIndex_viewer">;
  } | null | undefined;
};
export type ShowsIndex_Test_Query = {
  response: ShowsIndex_Test_Query$data;
  variables: ShowsIndex_Test_Query$variables;
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
    "alias": "text",
    "args": null,
    "kind": "ScalarField",
    "name": "name",
    "storageKey": null
  },
  {
    "alias": "value",
    "args": null,
    "kind": "ScalarField",
    "name": "slug",
    "storageKey": null
  }
],
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
  "name": "__typename",
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
  {
    "kind": "Literal",
    "name": "format",
    "value": "MMM D"
  }
],
v6 = {
  "kind": "Literal",
  "name": "version",
  "value": [
    "main",
    "normalized",
    "larger",
    "large"
  ]
},
v7 = [
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
  },
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
v8 = [
  (v4/*: any*/)
],
v9 = {
  "kind": "InlineFragment",
  "selections": (v8/*: any*/),
  "type": "Node",
  "abstractKey": "__isNode"
},
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
  "type": "CroppedImageUrl"
},
v13 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "Int"
},
v14 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
},
v15 = {
  "enumValues": null,
  "nullable": false,
  "plural": true,
  "type": "City"
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "ShowsIndex_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Viewer",
        "kind": "LinkedField",
        "name": "viewer",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "ShowsIndex_viewer"
          }
        ],
        "storageKey": null
      },
      {
        "alias": "featuredShows",
        "args": (v0/*: any*/),
        "concreteType": "OrderedSet",
        "kind": "LinkedField",
        "name": "orderedSet",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "ShowsIndex_featuredShows"
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
    "name": "ShowsIndex_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Viewer",
        "kind": "LinkedField",
        "name": "viewer",
        "plural": false,
        "selections": [
          {
            "alias": "allCities",
            "args": null,
            "concreteType": "City",
            "kind": "LinkedField",
            "name": "cities",
            "plural": true,
            "selections": (v1/*: any*/),
            "storageKey": null
          },
          {
            "alias": "featuredCities",
            "args": [
              {
                "kind": "Literal",
                "name": "featured",
                "value": true
              }
            ],
            "concreteType": "City",
            "kind": "LinkedField",
            "name": "cities",
            "plural": true,
            "selections": (v1/*: any*/),
            "storageKey": "cities(featured:true)"
          }
        ],
        "storageKey": null
      },
      {
        "alias": "featuredShows",
        "args": (v0/*: any*/),
        "concreteType": "OrderedSet",
        "kind": "LinkedField",
        "name": "orderedSet",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": null,
            "kind": "LinkedField",
            "name": "items",
            "plural": true,
            "selections": [
              (v3/*: any*/),
              {
                "kind": "InlineFragment",
                "selections": [
                  (v4/*: any*/),
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
                    "alias": "formattedStartAt",
                    "args": (v5/*: any*/),
                    "kind": "ScalarField",
                    "name": "startAt",
                    "storageKey": "startAt(format:\"MMM D\")"
                  },
                  {
                    "alias": "formattedEndAt",
                    "args": (v5/*: any*/),
                    "kind": "ScalarField",
                    "name": "endAt",
                    "storageKey": "endAt(format:\"MMM D\")"
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Location",
                    "kind": "LinkedField",
                    "name": "location",
                    "plural": false,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "city",
                        "storageKey": null
                      },
                      (v4/*: any*/)
                    ],
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
                    "concreteType": "Image",
                    "kind": "LinkedField",
                    "name": "coverImage",
                    "plural": false,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "title",
                        "storageKey": null
                      },
                      {
                        "alias": "large",
                        "args": [
                          {
                            "kind": "Literal",
                            "name": "height",
                            "value": 683
                          },
                          (v6/*: any*/),
                          {
                            "kind": "Literal",
                            "name": "width",
                            "value": 910
                          }
                        ],
                        "concreteType": "CroppedImageUrl",
                        "kind": "LinkedField",
                        "name": "cropped",
                        "plural": false,
                        "selections": (v7/*: any*/),
                        "storageKey": "cropped(height:683,version:[\"main\",\"normalized\",\"larger\",\"large\"],width:910)"
                      },
                      {
                        "alias": "small",
                        "args": [
                          {
                            "kind": "Literal",
                            "name": "height",
                            "value": 450
                          },
                          (v6/*: any*/),
                          {
                            "kind": "Literal",
                            "name": "width",
                            "value": 600
                          }
                        ],
                        "concreteType": "CroppedImageUrl",
                        "kind": "LinkedField",
                        "name": "cropped",
                        "plural": false,
                        "selections": (v7/*: any*/),
                        "storageKey": "cropped(height:450,version:[\"main\",\"normalized\",\"larger\",\"large\"],width:600)"
                      }
                    ],
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
                      (v3/*: any*/),
                      {
                        "kind": "InlineFragment",
                        "selections": [
                          (v2/*: any*/)
                        ],
                        "type": "Partner",
                        "abstractKey": null
                      },
                      {
                        "kind": "InlineFragment",
                        "selections": [
                          (v2/*: any*/),
                          (v4/*: any*/)
                        ],
                        "type": "ExternalPartner",
                        "abstractKey": null
                      },
                      (v9/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "type": "Show",
                "abstractKey": null
              },
              (v9/*: any*/),
              {
                "kind": "InlineFragment",
                "selections": (v8/*: any*/),
                "type": "FeaturedLink",
                "abstractKey": null
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
          (v4/*: any*/)
        ],
        "storageKey": "orderedSet(id:\"example\")"
      }
    ]
  },
  "params": {
    "id": "3a21fe9aeae3cd7ccafa5a87dc6d19ec",
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "featuredShows": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "OrderedSet"
        },
        "featuredShows.id": (v10/*: any*/),
        "featuredShows.items": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "OrderedSetItem"
        },
        "featuredShows.items.__isNode": (v11/*: any*/),
        "featuredShows.items.__typename": (v11/*: any*/),
        "featuredShows.items.coverImage": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Image"
        },
        "featuredShows.items.coverImage.large": (v12/*: any*/),
        "featuredShows.items.coverImage.large.height": (v13/*: any*/),
        "featuredShows.items.coverImage.large.src": (v11/*: any*/),
        "featuredShows.items.coverImage.large.srcSet": (v11/*: any*/),
        "featuredShows.items.coverImage.large.width": (v13/*: any*/),
        "featuredShows.items.coverImage.small": (v12/*: any*/),
        "featuredShows.items.coverImage.small.height": (v13/*: any*/),
        "featuredShows.items.coverImage.small.src": (v11/*: any*/),
        "featuredShows.items.coverImage.small.srcSet": (v11/*: any*/),
        "featuredShows.items.coverImage.small.width": (v13/*: any*/),
        "featuredShows.items.coverImage.title": (v14/*: any*/),
        "featuredShows.items.endAt": (v14/*: any*/),
        "featuredShows.items.formattedEndAt": (v14/*: any*/),
        "featuredShows.items.formattedStartAt": (v14/*: any*/),
        "featuredShows.items.href": (v14/*: any*/),
        "featuredShows.items.id": (v10/*: any*/),
        "featuredShows.items.location": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Location"
        },
        "featuredShows.items.location.city": (v14/*: any*/),
        "featuredShows.items.location.id": (v10/*: any*/),
        "featuredShows.items.name": (v14/*: any*/),
        "featuredShows.items.partner": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "PartnerTypes"
        },
        "featuredShows.items.partner.__isNode": (v11/*: any*/),
        "featuredShows.items.partner.__typename": (v11/*: any*/),
        "featuredShows.items.partner.id": (v10/*: any*/),
        "featuredShows.items.partner.name": (v14/*: any*/),
        "featuredShows.items.startAt": (v14/*: any*/),
        "featuredShows.name": (v14/*: any*/),
        "viewer": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Viewer"
        },
        "viewer.allCities": (v15/*: any*/),
        "viewer.allCities.text": (v11/*: any*/),
        "viewer.allCities.value": (v11/*: any*/),
        "viewer.featuredCities": (v15/*: any*/),
        "viewer.featuredCities.text": (v11/*: any*/),
        "viewer.featuredCities.value": (v11/*: any*/)
      }
    },
    "name": "ShowsIndex_Test_Query",
    "operationKind": "query",
    "text": null
  }
};
})();

(node as any).hash = "78ce8874a54dc95631e0249533aaf1d1";

export default node;
