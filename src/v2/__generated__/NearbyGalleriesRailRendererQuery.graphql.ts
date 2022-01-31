/**
 * @generated SignedSource<<7369ae27434a1f568dafe1acdcf8603f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type NearbyGalleriesRailRendererQuery$variables = {
  near: string;
};
export type NearbyGalleriesRailRendererQuery$data = {
  readonly partnersConnection: {
    readonly edges: ReadonlyArray<{
      readonly " $fragmentSpreads": FragmentRefs<"NearbyGalleriesRail_partners">;
    } | null> | null;
  } | null;
};
export type NearbyGalleriesRailRendererQuery = {
  variables: NearbyGalleriesRailRendererQuery$variables;
  response: NearbyGalleriesRailRendererQuery$data;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "near"
  }
],
v1 = [
  {
    "kind": "Literal",
    "name": "defaultProfilePublic",
    "value": true
  },
  {
    "kind": "Literal",
    "name": "eligibleForListing",
    "value": true
  },
  {
    "kind": "Literal",
    "name": "first",
    "value": 12
  },
  {
    "kind": "Variable",
    "name": "near",
    "variableName": "near"
  },
  {
    "kind": "Literal",
    "name": "sort",
    "value": "RANDOM_SCORE_DESC"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "slug",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "NearbyGalleriesRailRendererQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "PartnerConnection",
        "kind": "LinkedField",
        "name": "partnersConnection",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "PartnerEdge",
            "kind": "LinkedField",
            "name": "edges",
            "plural": true,
            "selections": [
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "NearbyGalleriesRail_partners"
              }
            ],
            "storageKey": null
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
    "name": "NearbyGalleriesRailRendererQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "PartnerConnection",
        "kind": "LinkedField",
        "name": "partnersConnection",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "PartnerEdge",
            "kind": "LinkedField",
            "name": "edges",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "Partner",
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  (v2/*: any*/),
                  (v3/*: any*/),
                  (v4/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "type",
                    "storageKey": null
                  },
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
                        "name": "image",
                        "plural": false,
                        "selections": [
                          {
                            "alias": null,
                            "args": [
                              {
                                "kind": "Literal",
                                "name": "height",
                                "value": 300
                              },
                              {
                                "kind": "Literal",
                                "name": "version",
                                "value": "wide"
                              },
                              {
                                "kind": "Literal",
                                "name": "width",
                                "value": 400
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
                            "storageKey": "cropped(height:300,version:\"wide\",width:400)"
                          }
                        ],
                        "storageKey": null
                      },
                      (v2/*: any*/),
                      (v3/*: any*/),
                      (v4/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "internalID",
                        "storageKey": null
                      },
                      {
                        "alias": "is_followed",
                        "args": null,
                        "kind": "ScalarField",
                        "name": "isFollowed",
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": [
                      {
                        "kind": "Literal",
                        "name": "first",
                        "value": 20
                      }
                    ],
                    "concreteType": "LocationConnection",
                    "kind": "LinkedField",
                    "name": "locationsConnection",
                    "plural": false,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "LocationEdge",
                        "kind": "LinkedField",
                        "name": "edges",
                        "plural": true,
                        "selections": [
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "Location",
                            "kind": "LinkedField",
                            "name": "node",
                            "plural": false,
                            "selections": [
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "city",
                                "storageKey": null
                              },
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "displayCountry",
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
                    "storageKey": "locationsConnection(first:20)"
                  }
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
    "cacheID": "5193a97423d4ca698c0232317cb26923",
    "id": null,
    "metadata": {},
    "name": "NearbyGalleriesRailRendererQuery",
    "operationKind": "query",
    "text": "query NearbyGalleriesRailRendererQuery(\n  $near: String!\n) {\n  partnersConnection(first: 12, near: $near, eligibleForListing: true, defaultProfilePublic: true, sort: RANDOM_SCORE_DESC) {\n    edges {\n      ...NearbyGalleriesRail_partners\n    }\n  }\n}\n\nfragment FollowProfileButton_profile on Profile {\n  id\n  slug\n  name\n  internalID\n  is_followed: isFollowed\n}\n\nfragment NearbyGalleriesRail_partners on PartnerEdge {\n  node {\n    id\n    slug\n    ...NearbyGalleryCard_partner\n  }\n}\n\nfragment NearbyGalleryCard_partner on Partner {\n  name\n  slug\n  type\n  profile {\n    image {\n      cropped(height: 300, width: 400, version: \"wide\") {\n        src\n        srcSet\n      }\n    }\n    ...FollowProfileButton_profile\n    id\n  }\n  locationsConnection(first: 20) {\n    edges {\n      node {\n        city\n        displayCountry\n        id\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "e1a8202ed2c0aaba45d3bf3481b9ddc3";

export default node;
