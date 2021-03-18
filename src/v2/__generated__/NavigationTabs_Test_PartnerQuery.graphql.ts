/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type NavigationTabs_Test_PartnerQueryVariables = {};
export type NavigationTabs_Test_PartnerQueryResponse = {
    readonly partner: {
        readonly " $fragmentRefs": FragmentRefs<"NavigationTabs_partner">;
    } | null;
};
export type NavigationTabs_Test_PartnerQueryRawResponse = {
    readonly partner: ({
        readonly slug: string;
        readonly id: string | null;
    }) | null;
};
export type NavigationTabs_Test_PartnerQuery = {
    readonly response: NavigationTabs_Test_PartnerQueryResponse;
    readonly variables: NavigationTabs_Test_PartnerQueryVariables;
    readonly rawResponse: NavigationTabs_Test_PartnerQueryRawResponse;
};



/*
query NavigationTabs_Test_PartnerQuery {
  partner(id: "white-cube") {
    ...NavigationTabs_partner
    id
  }
}

fragment NavigationTabs_partner on Partner {
  slug
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "white-cube"
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "NavigationTabs_Test_PartnerQuery",
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
            "name": "NavigationTabs_partner"
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
    "name": "NavigationTabs_Test_PartnerQuery",
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
        "storageKey": "partner(id:\"white-cube\")"
      }
    ]
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "NavigationTabs_Test_PartnerQuery",
    "operationKind": "query",
    "text": "query NavigationTabs_Test_PartnerQuery {\n  partner(id: \"white-cube\") {\n    ...NavigationTabs_partner\n    id\n  }\n}\n\nfragment NavigationTabs_partner on Partner {\n  slug\n}\n"
  }
};
})();
(node as any).hash = 'c84bdc912b3f9fed0de3f5762759a1ed';
export default node;
