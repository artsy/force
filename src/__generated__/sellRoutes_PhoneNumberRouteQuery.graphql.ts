/**
 * @generated SignedSource<<232e35dffe9d19a79cfac2f0a2aa6ce5>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type sellRoutes_PhoneNumberRouteQuery$variables = {
  id: string;
};
export type sellRoutes_PhoneNumberRouteQuery$data = {
  readonly me: {
    readonly " $fragmentSpreads": FragmentRefs<"PhoneNumberRoute_me">;
  } | null | undefined;
  readonly submission: {
    readonly " $fragmentSpreads": FragmentRefs<"PhoneNumberRoute_submission">;
  } | null | undefined;
};
export type sellRoutes_PhoneNumberRouteQuery = {
  response: sellRoutes_PhoneNumberRouteQuery$data;
  variables: sellRoutes_PhoneNumberRouteQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "id"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "id"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "sellRoutes_PhoneNumberRouteQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "ConsignmentSubmission",
        "kind": "LinkedField",
        "name": "submission",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "PhoneNumberRoute_submission"
          }
        ],
        "storageKey": null
      },
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
            "name": "PhoneNumberRoute_me"
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
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "sellRoutes_PhoneNumberRouteQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "ConsignmentSubmission",
        "kind": "LinkedField",
        "name": "submission",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "userPhone",
            "storageKey": null
          },
          (v2/*: any*/)
        ],
        "storageKey": null
      },
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
            "name": "internalID",
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
                "name": "countryCode",
                "storageKey": null
              },
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
          (v2/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "0d19e836d077c8c1a2baa0584d2731e2",
    "id": null,
    "metadata": {},
    "name": "sellRoutes_PhoneNumberRouteQuery",
    "operationKind": "query",
    "text": "query sellRoutes_PhoneNumberRouteQuery(\n  $id: ID!\n) {\n  submission(id: $id) @principalField {\n    ...PhoneNumberRoute_submission\n    id\n  }\n  me {\n    ...PhoneNumberRoute_me\n    id\n  }\n}\n\nfragment PhoneNumberRoute_me on Me {\n  internalID\n  phoneNumber {\n    countryCode\n    regionCode\n    display(format: NATIONAL)\n    originalNumber\n  }\n}\n\nfragment PhoneNumberRoute_submission on ConsignmentSubmission {\n  userPhone\n}\n"
  }
};
})();

(node as any).hash = "2f2d86cfeebe72cc425b2279e385f247";

export default node;
