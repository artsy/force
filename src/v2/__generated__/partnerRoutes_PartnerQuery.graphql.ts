/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type partnerRoutes_PartnerQueryVariables = {
    partnerId: string;
};
export type partnerRoutes_PartnerQueryResponse = {
    readonly partner: {
        readonly " $fragmentRefs": FragmentRefs<"PartnerApp_partner">;
    } | null;
};
export type partnerRoutes_PartnerQuery = {
    readonly response: partnerRoutes_PartnerQueryResponse;
    readonly variables: partnerRoutes_PartnerQueryVariables;
};



/*
query partnerRoutes_PartnerQuery(
  $partnerId: String!
) {
  partner(id: $partnerId) @principalField {
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
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "partnerId",
    "type": "String!"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "partnerId"
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "partnerRoutes_PartnerQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
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
        "storageKey": null
      }
    ],
    "type": "Query"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "partnerRoutes_PartnerQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
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
        "storageKey": null
      }
    ]
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "partnerRoutes_PartnerQuery",
    "operationKind": "query",
    "text": "query partnerRoutes_PartnerQuery(\n  $partnerId: String!\n) {\n  partner(id: $partnerId) @principalField {\n    ...PartnerApp_partner\n    id\n  }\n}\n\nfragment NavigationTabs_partner on Partner {\n  slug\n}\n\nfragment PartnerApp_partner on Partner {\n  name\n  ...NavigationTabs_partner\n}\n"
  }
};
})();
(node as any).hash = 'b065b69c18af67164cd46d476357078f';
export default node;
