/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type settingsRoutes_SettingsEditProfileRouteQueryVariables = {};
export type settingsRoutes_SettingsEditProfileRouteQueryResponse = {
    readonly me: {
        readonly " $fragmentRefs": FragmentRefs<"SettingsEditProfileRoute_me">;
    } | null;
};
export type settingsRoutes_SettingsEditProfileRouteQuery = {
    readonly response: settingsRoutes_SettingsEditProfileRouteQueryResponse;
    readonly variables: settingsRoutes_SettingsEditProfileRouteQueryVariables;
};



/*
query settingsRoutes_SettingsEditProfileRouteQuery {
  me {
    ...SettingsEditProfileRoute_me
    id
  }
}

fragment SettingsEditProfileRoute_me on Me {
  ...UserInformation_me
  email
  name
  paddleNumber
  phone
  internalID
}

fragment UserInformation_me on Me {
  email
  name
  paddleNumber
  phone
  internalID
}
*/

const node: ConcreteRequest = {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "settingsRoutes_SettingsEditProfileRouteQuery",
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
            "name": "SettingsEditProfileRoute_me"
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
    "name": "settingsRoutes_SettingsEditProfileRouteQuery",
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
            "name": "internalID",
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
    "name": "settingsRoutes_SettingsEditProfileRouteQuery",
    "operationKind": "query",
    "text": "query settingsRoutes_SettingsEditProfileRouteQuery {\n  me {\n    ...SettingsEditProfileRoute_me\n    id\n  }\n}\n\nfragment SettingsEditProfileRoute_me on Me {\n  ...UserInformation_me\n  email\n  name\n  paddleNumber\n  phone\n  internalID\n}\n\nfragment UserInformation_me on Me {\n  email\n  name\n  paddleNumber\n  phone\n  internalID\n}\n"
  }
};
(node as any).hash = 'fccb8f8aa271809e4c65c8d30166e79d';
export default node;
