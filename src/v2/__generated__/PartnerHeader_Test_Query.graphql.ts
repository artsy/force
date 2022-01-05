/* tslint:disable */
/* eslint-disable */

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
                    readonly id: string | null;
                }) | null;
            }) | null> | null;
        }) | null;
        readonly id: string | null;
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
  "type": "ID",
  "enumValues": null,
  "plural": false,
  "nullable": true
},
v5 = {
  "type": "String",
  "enumValues": null,
  "plural": false,
  "nullable": true
},
v6 = {
  "type": "ID",
  "enumValues": null,
  "plural": false,
  "nullable": false
},
v7 = {
  "type": "String",
  "enumValues": null,
  "plural": false,
  "nullable": false
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
    "type": "Query"
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
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "partner": {
          "type": "Partner",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "partner.id": (v4/*: any*/),
        "partner.name": (v5/*: any*/),
        "partner.type": (v5/*: any*/),
        "partner.slug": (v6/*: any*/),
        "partner.profile": {
          "type": "Profile",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "partner.locations": {
          "type": "LocationConnection",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "partner.profile.icon": {
          "type": "Image",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "partner.profile.id": (v6/*: any*/),
        "partner.locations.totalCount": {
          "type": "Int",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "partner.locations.edges": {
          "type": "LocationEdge",
          "enumValues": null,
          "plural": true,
          "nullable": true
        },
        "partner.profile.icon.resized": {
          "type": "ResizedImageUrl",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "partner.profile.slug": (v6/*: any*/),
        "partner.profile.name": (v5/*: any*/),
        "partner.profile.internalID": (v6/*: any*/),
        "partner.profile.is_followed": {
          "type": "Boolean",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "partner.locations.edges.node": {
          "type": "Location",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "partner.profile.icon.resized.src": (v7/*: any*/),
        "partner.profile.icon.resized.srcSet": (v7/*: any*/),
        "partner.locations.edges.node.city": (v5/*: any*/),
        "partner.locations.edges.node.id": (v4/*: any*/)
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
