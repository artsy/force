/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type SettingsEditSettingsInformation_Test_QueryVariables = {};
export type SettingsEditSettingsInformation_Test_QueryResponse = {
    readonly me: {
        readonly " $fragmentRefs": FragmentRefs<"SettingsEditSettingsInformation_me">;
    } | null;
};
export type SettingsEditSettingsInformation_Test_Query = {
    readonly response: SettingsEditSettingsInformation_Test_QueryResponse;
    readonly variables: SettingsEditSettingsInformation_Test_QueryVariables;
};



/*
query SettingsEditSettingsInformation_Test_Query {
  me {
    ...SettingsEditSettingsInformation_me
    id
  }
}

fragment SettingsEditSettingsInformation_me on Me {
  email
  name
  paddleNumber
  phone
}
*/

const node: ConcreteRequest = (function(){
var v0 = {
  "type": "String",
  "enumValues": null,
  "plural": false,
  "nullable": true
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
    "type": "Query"
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
            "kind": "ScalarField",
            "name": "phone",
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
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "me": {
          "type": "Me",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "me.id": {
          "type": "ID",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "me.email": (v0/*: any*/),
        "me.name": (v0/*: any*/),
        "me.paddleNumber": (v0/*: any*/),
        "me.phone": (v0/*: any*/)
      }
    },
    "name": "SettingsEditSettingsInformation_Test_Query",
    "operationKind": "query",
    "text": "query SettingsEditSettingsInformation_Test_Query {\n  me {\n    ...SettingsEditSettingsInformation_me\n    id\n  }\n}\n\nfragment SettingsEditSettingsInformation_me on Me {\n  email\n  name\n  paddleNumber\n  phone\n}\n"
  }
};
})();
(node as any).hash = 'b34e4f94a15cfd0e169130136cbd6d62';
export default node;
