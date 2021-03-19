/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type PartnerApp_Test_QueryVariables = {};
export type PartnerApp_Test_QueryResponse = {
    readonly partner: {
        readonly " $fragmentRefs": FragmentRefs<"PartnerApp_partner">;
    } | null;
};
export type PartnerApp_Test_Query = {
    readonly response: PartnerApp_Test_QueryResponse;
    readonly variables: PartnerApp_Test_QueryVariables;
};



/*
query PartnerApp_Test_Query {
  partner(id: "example") {
    ...PartnerApp_partner
    id
  }
}

fragment NavigationTabs_partner on Partner {
  slug
}

fragment PartnerApp_partner on Partner {
  name
  ...NavigationTabs_partner
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "example"
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "PartnerApp_Test_Query",
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
            "name": "PartnerApp_partner"
          }
        ],
        "storageKey": "partner(id:\"example\")"
      }
    ],
    "type": "Query"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "PartnerApp_Test_Query",
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
            "name": "slug",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "id",
            "storageKey": null
          }
        ],
        "storageKey": "partner(id:\"example\")"
      }
    ]
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "PartnerApp_Test_Query",
    "operationKind": "query",
    "text": "query PartnerApp_Test_Query {\n  partner(id: \"example\") {\n    ...PartnerApp_partner\n    id\n  }\n}\n\nfragment NavigationTabs_partner on Partner {\n  slug\n}\n\nfragment PartnerApp_partner on Partner {\n  name\n  ...NavigationTabs_partner\n}\n"
  }
};
})();
(node as any).hash = '0c68d38f034c6d9a33a2e60062afa321';
export default node;
