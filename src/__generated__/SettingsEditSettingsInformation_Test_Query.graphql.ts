/**
 * @generated SignedSource<<9a16bea8d9b90f3483073abed3068de2>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SettingsEditSettingsInformation_Test_Query$variables = Record<PropertyKey, never>;
export type SettingsEditSettingsInformation_Test_Query$data = {
  readonly me: {
    readonly " $fragmentSpreads": FragmentRefs<"SettingsEditSettingsInformation_me">;
  } | null | undefined;
};
export type SettingsEditSettingsInformation_Test_Query = {
  response: SettingsEditSettingsInformation_Test_Query$data;
  variables: SettingsEditSettingsInformation_Test_Query$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
},
v1 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Float"
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "SettingsEditSettingsInformation_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Me",
        "kind": "LinkedField",
        "name": "me",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "SettingsEditSettingsInformation_me"
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
    "name": "SettingsEditSettingsInformation_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Me",
        "kind": "LinkedField",
        "name": "me",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "email",
            "storageKey": null
          },
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
            "name": "paddleNumber",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "PhoneNumberType",
            "kind": "LinkedField",
            "name": "phoneNumber",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "regionCode",
                "storageKey": null
              },
              {
                "alias": null,
                "args": [
                  {
                    "kind": "Literal",
                    "name": "format",
                    "value": "NATIONAL"
                  }
                ],
                "kind": "ScalarField",
                "name": "display",
                "storageKey": "display(format:\"NATIONAL\")"
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "originalNumber",
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "priceRange",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "priceRangeMin",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "priceRangeMax",
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
    "cacheID": "c9072bdccf0e6d6364977b9f61f4670e",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "me": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Me"
        },
        "me.email": (v0/*: any*/),
        "me.id": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "ID"
        },
        "me.name": (v0/*: any*/),
        "me.paddleNumber": (v0/*: any*/),
        "me.phoneNumber": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "PhoneNumberType"
        },
        "me.phoneNumber.display": (v0/*: any*/),
        "me.phoneNumber.originalNumber": (v0/*: any*/),
        "me.phoneNumber.regionCode": (v0/*: any*/),
        "me.priceRange": (v0/*: any*/),
        "me.priceRangeMax": (v1/*: any*/),
        "me.priceRangeMin": (v1/*: any*/)
      }
    },
    "name": "SettingsEditSettingsInformation_Test_Query",
    "operationKind": "query",
    "text": "query SettingsEditSettingsInformation_Test_Query {\n  me {\n    ...SettingsEditSettingsInformation_me\n    id\n  }\n}\n\nfragment SettingsEditSettingsInformation_me on Me {\n  email\n  name\n  paddleNumber\n  phoneNumber {\n    regionCode\n    display(format: NATIONAL)\n    originalNumber\n  }\n  priceRange\n  priceRangeMin\n  priceRangeMax\n}\n"
  }
};
})();

(node as any).hash = "b34e4f94a15cfd0e169130136cbd6d62";

export default node;
