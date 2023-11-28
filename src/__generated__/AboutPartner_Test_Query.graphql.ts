/**
 * @generated SignedSource<<168c7d11b9a55aa863c244ec1506e788>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type AboutPartner_Test_Query$variables = Record<PropertyKey, never>;
export type AboutPartner_Test_Query$data = {
  readonly partner: {
    readonly " $fragmentSpreads": FragmentRefs<"AboutPartner_partner">;
  } | null | undefined;
};
export type AboutPartner_Test_Query = {
  response: AboutPartner_Test_Query$data;
  variables: AboutPartner_Test_Query$variables;
};

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
    "type": "Query",
    "abstractKey": null
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
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "bio",
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
            "name": "displayFullPartnerPage",
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
            "name": "internalID",
            "storageKey": null
          },
          (v1/*: any*/)
        ],
        "storageKey": "partner(id:\"unit-london\")"
      }
    ]
  },
  "params": {
    "cacheID": "8976284eb30d3ed62a610b15d83a157d",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "partner": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Partner"
        },
        "partner.displayFullPartnerPage": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Boolean"
        },
        "partner.id": (v2/*: any*/),
        "partner.internalID": (v2/*: any*/),
        "partner.profile": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Profile"
        },
        "partner.profile.bio": (v3/*: any*/),
        "partner.profile.fullBio": (v3/*: any*/),
        "partner.profile.id": (v2/*: any*/),
        "partner.slug": (v2/*: any*/),
        "partner.vatNumber": (v3/*: any*/),
        "partner.website": (v3/*: any*/)
      }
    },
    "name": "AboutPartner_Test_Query",
    "operationKind": "query",
    "text": "query AboutPartner_Test_Query {\n  partner(id: \"unit-london\") @principalField {\n    ...AboutPartner_partner\n    id\n  }\n}\n\nfragment AboutPartner_partner on Partner {\n  profile {\n    fullBio\n    bio\n    id\n  }\n  website\n  vatNumber\n  displayFullPartnerPage\n  slug\n  internalID\n}\n"
  }
};
})();

(node as any).hash = "502ee49997d2a6376b9f5147418508e7";

export default node;
