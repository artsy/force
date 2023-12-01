/**
 * @generated SignedSource<<6f1bba1f2e913cec9d37a9c7dc59d8e4>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PartnerHeader_Test_Query$variables = Record<PropertyKey, never>;
export type PartnerHeader_Test_Query$data = {
  readonly partner: {
    readonly " $fragmentSpreads": FragmentRefs<"PartnerHeader_partner">;
  } | null | undefined;
};
export type PartnerHeader_Test_Query$rawResponse = {
  readonly partner: {
    readonly id: string;
    readonly locations: {
      readonly edges: ReadonlyArray<{
        readonly node: {
          readonly city: string | null | undefined;
          readonly id: string;
        } | null | undefined;
      } | null | undefined> | null | undefined;
      readonly totalCount: number | null | undefined;
    } | null | undefined;
    readonly name: string | null | undefined;
    readonly profile: {
      readonly counts: {
        readonly follows: any | null | undefined;
      } | null | undefined;
      readonly icon: {
        readonly resized: {
          readonly src: string;
          readonly srcSet: string;
        } | null | undefined;
      } | null | undefined;
      readonly id: string;
      readonly internalID: string;
    } | null | undefined;
    readonly slug: string;
    readonly type: string | null | undefined;
  } | null | undefined;
};
export type PartnerHeader_Test_Query = {
  rawResponse: PartnerHeader_Test_Query$rawResponse;
  response: PartnerHeader_Test_Query$data;
  variables: PartnerHeader_Test_Query$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "white-cube"
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v2 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
},
v3 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
},
v4 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "String"
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "PartnerHeader_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "Partner",
        "kind": "LinkedField",
        "name": "partner",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "PartnerHeader_partner"
          }
        ],
        "storageKey": "partner(id:\"white-cube\")"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "PartnerHeader_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "Partner",
        "kind": "LinkedField",
        "name": "partner",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "name",
            "storageKey": null
          },
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
            "kind": "ScalarField",
            "name": "slug",
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
                "concreteType": "ProfileCounts",
                "kind": "LinkedField",
                "name": "counts",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "follows",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
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
                "concreteType": "Image",
                "kind": "LinkedField",
                "name": "icon",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": [
                      {
                        "kind": "Literal",
                        "name": "height",
                        "value": 80
                      },
                      {
                        "kind": "Literal",
                        "name": "version",
                        "value": "square140"
                      },
                      {
                        "kind": "Literal",
                        "name": "width",
                        "value": 80
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
                    "storageKey": "resized(height:80,version:\"square140\",width:80)"
                  }
                ],
                "storageKey": null
              },
              (v1/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": "locations",
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
                "kind": "ScalarField",
                "name": "totalCount",
                "storageKey": null
              },
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
                      (v1/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": "locationsConnection(first:20)"
          },
          (v1/*: any*/)
        ],
        "storageKey": "partner(id:\"white-cube\")"
      }
    ]
  },
  "params": {
    "cacheID": "524ed91e14607eab719c86e65873356c",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "partner": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Partner"
        },
        "partner.id": (v2/*: any*/),
        "partner.locations": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "LocationConnection"
        },
        "partner.locations.edges": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "LocationEdge"
        },
        "partner.locations.edges.node": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Location"
        },
        "partner.locations.edges.node.city": (v3/*: any*/),
        "partner.locations.edges.node.id": (v2/*: any*/),
        "partner.locations.totalCount": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Int"
        },
        "partner.name": (v3/*: any*/),
        "partner.profile": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Profile"
        },
        "partner.profile.counts": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ProfileCounts"
        },
        "partner.profile.counts.follows": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "FormattedNumber"
        },
        "partner.profile.icon": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Image"
        },
        "partner.profile.icon.resized": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ResizedImageUrl"
        },
        "partner.profile.icon.resized.src": (v4/*: any*/),
        "partner.profile.icon.resized.srcSet": (v4/*: any*/),
        "partner.profile.id": (v2/*: any*/),
        "partner.profile.internalID": (v2/*: any*/),
        "partner.slug": (v2/*: any*/),
        "partner.type": (v3/*: any*/)
      }
    },
    "name": "PartnerHeader_Test_Query",
    "operationKind": "query",
    "text": "query PartnerHeader_Test_Query {\n  partner(id: \"white-cube\") {\n    ...PartnerHeader_partner\n    id\n  }\n}\n\nfragment PartnerHeader_partner on Partner {\n  name\n  type\n  slug\n  profile {\n    counts {\n      follows\n    }\n    internalID\n    icon {\n      resized(width: 80, height: 80, version: \"square140\") {\n        src\n        srcSet\n      }\n    }\n    id\n  }\n  locations: locationsConnection(first: 20) {\n    totalCount\n    edges {\n      node {\n        city\n        id\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "943e764421e6e26489f307efbdbdc041";

export default node;
