/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type PartnerHeader_Test_QueryVariables = {};
export type PartnerHeader_Test_QueryResponse = {
    readonly partner: {
        readonly " $fragmentRefs": FragmentRefs<"PartnerHeader_partner">;
    } | null;
};
export type PartnerHeader_Test_QueryRawResponse = {
    readonly partner: ({
        readonly name: string | null;
        readonly type: string | null;
        readonly slug: string;
        readonly profile: ({
            readonly icon: ({
                readonly resized: ({
                    readonly src: string;
                    readonly srcSet: string;
                }) | null;
            }) | null;
            readonly id: string;
            readonly slug: string;
            readonly name: string | null;
            readonly internalID: string;
            readonly is_followed: boolean | null;
        }) | null;
        readonly locations: ({
            readonly totalCount: number | null;
            readonly edges: ReadonlyArray<({
                readonly node: ({
                    readonly city: string | null;
                    readonly id: string;
                }) | null;
            }) | null> | null;
        }) | null;
        readonly id: string;
    }) | null;
};
export type PartnerHeader_Test_Query = {
    readonly response: PartnerHeader_Test_QueryResponse;
    readonly variables: PartnerHeader_Test_QueryVariables;
    readonly rawResponse: PartnerHeader_Test_QueryRawResponse;
};



/*
query PartnerHeader_Test_Query {
  partner(id: "white-cube") {
    ...PartnerHeader_partner
    id
  }
}

fragment FollowProfileButton_profile on Profile {
  id
  slug
  name
  internalID
  is_followed: isFollowed
}

fragment PartnerHeader_partner on Partner {
  name
  type
  slug
  profile {
    icon {
      resized(width: 80, height: 80, version: "square140") {
        src
        srcSet
      }
    }
    ...FollowProfileButton_profile
    id
  }
  locations: locationsConnection(first: 20) {
    totalCount
    edges {
      node {
        city
        id
      }
    }
  }
}
*/

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
  "name": "name",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "slug",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v4 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
},
v5 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
},
v6 = {
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
          (v1/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "type",
            "storageKey": null
          },
          (v2/*: any*/),
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
              (v3/*: any*/),
              (v2/*: any*/),
              (v1/*: any*/),
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
                      (v3/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": "locationsConnection(first:20)"
          },
          (v3/*: any*/)
        ],
        "storageKey": "partner(id:\"white-cube\")"
      }
    ]
  },
  "params": {
    "cacheID": "787df13f06f3422cee9fe1286bd9e366",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "partner": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Partner"
        },
        "partner.id": (v4/*: any*/),
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
        "partner.locations.edges.node.city": (v5/*: any*/),
        "partner.locations.edges.node.id": (v4/*: any*/),
        "partner.locations.totalCount": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Int"
        },
        "partner.name": (v5/*: any*/),
        "partner.profile": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Profile"
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
        "partner.profile.icon.resized.src": (v6/*: any*/),
        "partner.profile.icon.resized.srcSet": (v6/*: any*/),
        "partner.profile.id": (v4/*: any*/),
        "partner.profile.internalID": (v4/*: any*/),
        "partner.profile.is_followed": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Boolean"
        },
        "partner.profile.name": (v5/*: any*/),
        "partner.profile.slug": (v4/*: any*/),
        "partner.slug": (v4/*: any*/),
        "partner.type": (v5/*: any*/)
      }
    },
    "name": "PartnerHeader_Test_Query",
    "operationKind": "query",
    "text": "query PartnerHeader_Test_Query {\n  partner(id: \"white-cube\") {\n    ...PartnerHeader_partner\n    id\n  }\n}\n\nfragment FollowProfileButton_profile on Profile {\n  id\n  slug\n  name\n  internalID\n  is_followed: isFollowed\n}\n\nfragment PartnerHeader_partner on Partner {\n  name\n  type\n  slug\n  profile {\n    icon {\n      resized(width: 80, height: 80, version: \"square140\") {\n        src\n        srcSet\n      }\n    }\n    ...FollowProfileButton_profile\n    id\n  }\n  locations: locationsConnection(first: 20) {\n    totalCount\n    edges {\n      node {\n        city\n        id\n      }\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '943e764421e6e26489f307efbdbdc041';
export default node;
