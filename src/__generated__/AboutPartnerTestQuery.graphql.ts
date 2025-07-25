/**
 * @generated SignedSource<<3ba21531f8aaf553b0bde29b0970cef7>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type AboutPartnerTestQuery$variables = Record<PropertyKey, never>;
export type AboutPartnerTestQuery$data = {
  readonly partner: {
    readonly " $fragmentSpreads": FragmentRefs<"AboutPartner_partner">;
  } | null | undefined;
};
export type AboutPartnerTestQuery = {
  response: AboutPartnerTestQuery$data;
  variables: AboutPartnerTestQuery$variables;
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
    "name": "AboutPartnerTestQuery",
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
    "name": "AboutPartnerTestQuery",
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
    "cacheID": "24179e8f36a934c4accaf134f5f53ae2",
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
        "partner.website": (v3/*: any*/)
      }
    },
    "name": "AboutPartnerTestQuery",
    "operationKind": "query",
    "text": "query AboutPartnerTestQuery {\n  partner(id: \"unit-london\") @principalField {\n    ...AboutPartner_partner\n    id\n  }\n}\n\nfragment AboutPartner_partner on Partner {\n  profile {\n    fullBio\n    bio\n    id\n  }\n  website\n  displayFullPartnerPage\n  slug\n  internalID\n}\n"
  }
};
})();

(node as any).hash = "72ef314bc61d956562144a9f782b1657";

export default node;
