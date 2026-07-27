/**
 * @generated SignedSource<<d58b96eed1dcef9598ed7b7b3a958c8f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type GlobeMapMexicoCityQuery$variables = Record<PropertyKey, never>;
export type GlobeMapMexicoCityQuery$data = {
  readonly viewer: {
    readonly partnersConnection: {
      readonly edges: ReadonlyArray<{
        readonly node: {
          readonly internalID: string;
          readonly locationsConnection: {
            readonly edges: ReadonlyArray<{
              readonly node: {
                readonly city: string | null | undefined;
                readonly coordinates: {
                  readonly lat: number | null | undefined;
                  readonly lng: number | null | undefined;
                } | null | undefined;
                readonly country: string | null | undefined;
                readonly internalID: string;
                readonly publiclyViewable: boolean | null | undefined;
              } | null | undefined;
            } | null | undefined> | null | undefined;
          } | null | undefined;
          readonly name: string | null | undefined;
          readonly slug: string;
        } | null | undefined;
      } | null | undefined> | null | undefined;
    } | null | undefined;
  } | null | undefined;
};
export type GlobeMapMexicoCityQuery = {
  response: GlobeMapMexicoCityQuery$data;
  variables: GlobeMapMexicoCityQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
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
    "value": 100
  },
  {
    "kind": "Literal",
    "name": "near",
    "value": "19.4326,-99.1332"
  },
  {
    "kind": "Literal",
    "name": "sort",
    "value": "RANDOM_SCORE_DESC"
  },
  {
    "kind": "Literal",
    "name": "type",
    "value": [
      "GALLERY"
    ]
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
  "name": "name",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "slug",
  "storageKey": null
},
v4 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 10
  }
],
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "city",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "country",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "publiclyViewable",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "concreteType": "LatLng",
  "kind": "LinkedField",
  "name": "coordinates",
  "plural": false,
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "lat",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "lng",
      "storageKey": null
    }
  ],
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "GlobeMapMexicoCityQuery",
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
            "alias": null,
            "args": (v0/*: any*/),
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
                      (v1/*: any*/),
                      (v2/*: any*/),
                      (v3/*: any*/),
                      {
                        "alias": null,
                        "args": (v4/*: any*/),
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
                                  (v1/*: any*/),
                                  (v5/*: any*/),
                                  (v6/*: any*/),
                                  (v7/*: any*/),
                                  (v8/*: any*/)
                                ],
                                "storageKey": null
                              }
                            ],
                            "storageKey": null
                          }
                        ],
                        "storageKey": "locationsConnection(first:10)"
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": "partnersConnection(defaultProfilePublic:true,eligibleForListing:true,first:100,near:\"19.4326,-99.1332\",sort:\"RANDOM_SCORE_DESC\",type:[\"GALLERY\"])"
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
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "GlobeMapMexicoCityQuery",
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
            "alias": null,
            "args": (v0/*: any*/),
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
                      (v1/*: any*/),
                      (v2/*: any*/),
                      (v3/*: any*/),
                      {
                        "alias": null,
                        "args": (v4/*: any*/),
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
                                  (v1/*: any*/),
                                  (v5/*: any*/),
                                  (v6/*: any*/),
                                  (v7/*: any*/),
                                  (v8/*: any*/),
                                  (v9/*: any*/)
                                ],
                                "storageKey": null
                              }
                            ],
                            "storageKey": null
                          }
                        ],
                        "storageKey": "locationsConnection(first:10)"
                      },
                      (v9/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": "partnersConnection(defaultProfilePublic:true,eligibleForListing:true,first:100,near:\"19.4326,-99.1332\",sort:\"RANDOM_SCORE_DESC\",type:[\"GALLERY\"])"
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "6a7f2e2fc660cfd361e89114049a33aa",
    "id": null,
    "metadata": {},
    "name": "GlobeMapMexicoCityQuery",
    "operationKind": "query",
    "text": "query GlobeMapMexicoCityQuery {\n  viewer {\n    partnersConnection(near: \"19.4326,-99.1332\", defaultProfilePublic: true, eligibleForListing: true, type: [GALLERY], sort: RANDOM_SCORE_DESC, first: 100) {\n      edges {\n        node {\n          internalID\n          name\n          slug\n          locationsConnection(first: 10) {\n            edges {\n              node {\n                internalID\n                city\n                country\n                publiclyViewable\n                coordinates {\n                  lat\n                  lng\n                }\n                id\n              }\n            }\n          }\n          id\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "20df6627eec0274eae6014ea174cd253";

export default node;
