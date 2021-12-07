/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
export type SettingsEditSettingsEmailPreferencesQueryVariables = {};
export type SettingsEditSettingsEmailPreferencesQueryResponse = {
    readonly me: {
        readonly emailFrequency: string | null;
        readonly id: string;
    } | null;
};
export type SettingsEditSettingsEmailPreferencesQuery = {
    readonly response: SettingsEditSettingsEmailPreferencesQueryResponse;
    readonly variables: SettingsEditSettingsEmailPreferencesQueryVariables;
};



/*
query SettingsEditSettingsEmailPreferencesQuery {
  me {
    emailFrequency
    id
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
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
        "name": "emailFrequency",
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
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "SettingsEditSettingsEmailPreferencesQuery",
    "selections": (v0/*: any*/),
    "type": "Query"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "SettingsEditSettingsEmailPreferencesQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "SettingsEditSettingsEmailPreferencesQuery",
    "operationKind": "query",
    "text": "query SettingsEditSettingsEmailPreferencesQuery {\n  me {\n    emailFrequency\n    id\n  }\n}\n"
  }
};
})();
(node as any).hash = 'be4b3ea5fc13fa68e139afc93581d384';
export default node;
