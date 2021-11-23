/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type settingsRoutes_SettingsEditSettingsRouteQueryVariables = {};
export type settingsRoutes_SettingsEditSettingsRouteQueryResponse = {
    readonly me: {
        readonly " $fragmentRefs": FragmentRefs<"SettingsEditSettingsRoute_me">;
    } | null;
};
export type settingsRoutes_SettingsEditSettingsRouteQuery = {
    readonly response: settingsRoutes_SettingsEditSettingsRouteQueryResponse;
    readonly variables: settingsRoutes_SettingsEditSettingsRouteQueryVariables;
};



/*
query settingsRoutes_SettingsEditSettingsRouteQuery {
  me {
    ...SettingsEditSettingsRoute_me
    id
  }
}

fragment SettingsEditSettingsInformation_me on Me {
  email
  name
  paddleNumber
  phone
}

fragment SettingsEditSettingsRoute_me on Me {
  ...SettingsEditSettingsInformation_me
}
*/

const node: ConcreteRequest = {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "settingsRoutes_SettingsEditSettingsRouteQuery",
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
            "name": "SettingsEditSettingsRoute_me"
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
    "name": "settingsRoutes_SettingsEditSettingsRouteQuery",
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
    "metadata": {},
    "name": "settingsRoutes_SettingsEditSettingsRouteQuery",
    "operationKind": "query",
    "text": "query settingsRoutes_SettingsEditSettingsRouteQuery {\n  me {\n    ...SettingsEditSettingsRoute_me\n    id\n  }\n}\n\nfragment SettingsEditSettingsInformation_me on Me {\n  email\n  name\n  paddleNumber\n  phone\n}\n\nfragment SettingsEditSettingsRoute_me on Me {\n  ...SettingsEditSettingsInformation_me\n}\n"
  }
};
(node as any).hash = '87f56be623fa0ca771be8d9298fd830e';
export default node;
