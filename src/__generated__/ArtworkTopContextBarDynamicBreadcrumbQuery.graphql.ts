/**
 * @generated SignedSource<<3d63e9e48cf50413759fcdb08b66cfdf>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtworkContextEnum = "FAIR" | "SALE" | "SHOW" | "%future added value";
export type ArtworkTopContextBarDynamicBreadcrumbQuery$variables = {
  contextMatchId: string;
  contextMatchType: ArtworkContextEnum;
  id: string;
};
export type ArtworkTopContextBarDynamicBreadcrumbQuery$data = {
  readonly artwork: {
    readonly " $fragmentSpreads": FragmentRefs<"ArtworkTopContextBarDynamicBreadcrumb_artwork">;
  } | null | undefined;
};
export type ArtworkTopContextBarDynamicBreadcrumbQuery = {
  response: ArtworkTopContextBarDynamicBreadcrumbQuery$data;
  variables: ArtworkTopContextBarDynamicBreadcrumbQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "contextMatchId"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "contextMatchType"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "id"
},
v3 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "id"
  }
],
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
  "name": "name",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v8 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "url",
    "storageKey": null
  }
],
v9 = [
  (v5/*: any*/),
  (v6/*: any*/)
],
v10 = {
  "kind": "InlineFragment",
  "selections": [
    (v6/*: any*/)
  ],
  "type": "Node",
  "abstractKey": "__isNode"
};
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "ArtworkTopContextBarDynamicBreadcrumbQuery",
    "selections": [
      {
        "alias": null,
        "args": (v3/*: any*/),
        "concreteType": "Artwork",
        "kind": "LinkedField",
        "name": "artwork",
        "plural": false,
        "selections": [
          {
            "args": [
              {
                "kind": "Variable",
                "name": "contextMatchId",
                "variableName": "contextMatchId"
              },
              {
                "kind": "Variable",
                "name": "contextMatchType",
                "variableName": "contextMatchType"
              }
            ],
            "kind": "FragmentSpread",
            "name": "ArtworkTopContextBarDynamicBreadcrumb_artwork"
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
    "argumentDefinitions": [
      (v2/*: any*/),
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Operation",
    "name": "ArtworkTopContextBarDynamicBreadcrumbQuery",
    "selections": [
      {
        "alias": null,
        "args": (v3/*: any*/),
        "concreteType": "Artwork",
        "kind": "LinkedField",
        "name": "artwork",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "internalID",
            "storageKey": null
          },
          (v4/*: any*/),
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
            "concreteType": "Artist",
            "kind": "LinkedField",
            "name": "artist",
            "plural": false,
            "selections": [
              (v5/*: any*/),
              (v4/*: any*/),
              (v6/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": [
              {
                "kind": "Variable",
                "name": "id",
                "variableName": "contextMatchId"
              },
              {
                "kind": "Variable",
                "name": "type",
                "variableName": "contextMatchType"
              }
            ],
            "concreteType": null,
            "kind": "LinkedField",
            "name": "contextMatch",
            "plural": false,
            "selections": [
              (v7/*: any*/),
              {
                "kind": "InlineFragment",
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "registrationEndsAt",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "isRegistrationClosed",
                    "storageKey": null
                  },
                  (v5/*: any*/),
                  (v4/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "isAuction",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "isBenefit",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "isGalleryAuction",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Image",
                    "kind": "LinkedField",
                    "name": "coverImage",
                    "plural": false,
                    "selections": (v8/*: any*/),
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Partner",
                    "kind": "LinkedField",
                    "name": "partner",
                    "plural": false,
                    "selections": (v9/*: any*/),
                    "storageKey": null
                  }
                ],
                "type": "Sale",
                "abstractKey": null
              },
              {
                "kind": "InlineFragment",
                "selections": [
                  (v5/*: any*/),
                  (v4/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Profile",
                    "kind": "LinkedField",
                    "name": "profile",
                    "plural": false,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Image",
                        "kind": "LinkedField",
                        "name": "icon",
                        "plural": false,
                        "selections": (v8/*: any*/),
                        "storageKey": null
                      },
                      (v6/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "type": "Fair",
                "abstractKey": null
              },
              {
                "kind": "InlineFragment",
                "selections": [
                  (v5/*: any*/),
                  (v4/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "status",
                    "storageKey": null
                  },
                  {
                    "alias": "thumbnail",
                    "args": null,
                    "concreteType": "Image",
                    "kind": "LinkedField",
                    "name": "coverImage",
                    "plural": false,
                    "selections": (v8/*: any*/),
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
                      (v7/*: any*/),
                      {
                        "kind": "InlineFragment",
                        "selections": [
                          (v5/*: any*/)
                        ],
                        "type": "Partner",
                        "abstractKey": null
                      },
                      {
                        "kind": "InlineFragment",
                        "selections": (v9/*: any*/),
                        "type": "ExternalPartner",
                        "abstractKey": null
                      },
                      (v10/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "type": "Show",
                "abstractKey": null
              },
              (v10/*: any*/)
            ],
            "storageKey": null
          },
          (v6/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "409362b225fe9a1c683a09c1aa156c2d",
    "id": null,
    "metadata": {},
    "name": "ArtworkTopContextBarDynamicBreadcrumbQuery",
    "operationKind": "query",
    "text": "query ArtworkTopContextBarDynamicBreadcrumbQuery(\n  $id: String!\n  $contextMatchId: String!\n  $contextMatchType: ArtworkContextEnum!\n) {\n  artwork(id: $id) {\n    ...ArtworkTopContextBarDynamicBreadcrumb_artwork_3kwL1T\n    id\n  }\n}\n\nfragment ArtworkTopContextBarBreadcrumb_artwork on Artwork {\n  internalID\n  href\n  title\n  artist {\n    name\n    href\n    id\n  }\n}\n\nfragment ArtworkTopContextBarDynamicBreadcrumb_artwork_3kwL1T on Artwork {\n  ...ArtworkTopContextBarBreadcrumb_artwork\n  contextMatch(id: $contextMatchId, type: $contextMatchType) {\n    __typename\n    ...RegistrationAuctionTimer_sale\n    ... on Sale {\n      name\n      href\n      isAuction\n      isBenefit\n      isGalleryAuction\n      coverImage {\n        url\n      }\n      partner {\n        name\n        id\n      }\n    }\n    ... on Fair {\n      name\n      href\n      profile {\n        icon {\n          url\n        }\n        id\n      }\n    }\n    ... on Show {\n      name\n      href\n      status\n      thumbnail: coverImage {\n        url\n      }\n      partner {\n        __typename\n        ... on Partner {\n          name\n        }\n        ... on ExternalPartner {\n          name\n          id\n        }\n        ... on Node {\n          __isNode: __typename\n          id\n        }\n      }\n    }\n    ... on Node {\n      __isNode: __typename\n      id\n    }\n  }\n}\n\nfragment RegistrationAuctionTimer_sale on Sale {\n  registrationEndsAt\n  isRegistrationClosed\n}\n"
  }
};
})();

(node as any).hash = "66f70cdf761fe2e6c2001ce6d9b039af";

export default node;
