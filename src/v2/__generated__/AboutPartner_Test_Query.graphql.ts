/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type AboutPartner_Test_QueryVariables = {};
export type AboutPartner_Test_QueryResponse = {
    readonly partner: {
        readonly " $fragmentRefs": FragmentRefs<"AboutPartner_partner">;
    } | null;
};
export type AboutPartner_Test_Query = {
    readonly response: AboutPartner_Test_QueryResponse;
    readonly variables: AboutPartner_Test_QueryVariables;
};



/*
query AboutPartner_Test_Query {
  partner(id: "unit-london") @principalField {
    ...AboutPartner_partner
    id
  }
}

fragment AboutPartner_partner on Partner {
  profile {
    fullBio
    id
  }
  website
  vatNumber
  fullProfileEligible
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "unit-london"
  }
],
v1 = {
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
    "name": "AboutPartner_Test_Query",
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
            "name": "AboutPartner_partner"
          }
        ],
        "storageKey": "partner(id:\"unit-london\")"
      }
    ],
    "type": "Query"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "AboutPartner_Test_Query",
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
            "concreteType": "Profile",
            "kind": "LinkedField",
            "name": "profile",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "fullBio",
                "storageKey": null
              },
              (v1/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "website",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "vatNumber",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "fullProfileEligible",
            "storageKey": null
          },
          (v1/*: any*/)
        ],
        "storageKey": "partner(id:\"unit-london\")"
      }
    ]
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "AboutPartner_Test_Query",
    "operationKind": "query",
    "text": "query AboutPartner_Test_Query {\n  partner(id: \"unit-london\") @principalField {\n    ...AboutPartner_partner\n    id\n  }\n}\n\nfragment AboutPartner_partner on Partner {\n  profile {\n    fullBio\n    id\n  }\n  website\n  vatNumber\n  fullProfileEligible\n}\n"
  }
};
})();
(node as any).hash = '13305afd5f8a7db8136e9db18578c429';
export default node;
