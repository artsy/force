/**
 * @generated SignedSource<<88607f8520cf9a7bb95121af9bd0d49e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type MeetTheSpecialists_test_Query$variables = Record<PropertyKey, never>;
export type MeetTheSpecialists_test_Query$data = {
  readonly staticContent: {
    readonly " $fragmentSpreads": FragmentRefs<"MeetTheSpecialists_staticContent">;
  } | null | undefined;
};
export type MeetTheSpecialists_test_Query = {
  response: MeetTheSpecialists_test_Query$data;
  variables: MeetTheSpecialists_test_Query$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "String"
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "MeetTheSpecialists_test_Query",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "StaticContent",
        "kind": "LinkedField",
        "name": "staticContent",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "MeetTheSpecialists_staticContent"
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
    "name": "MeetTheSpecialists_test_Query",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "StaticContent",
        "kind": "LinkedField",
        "name": "staticContent",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "SpecialistBio",
            "kind": "LinkedField",
            "name": "specialistBios",
            "plural": true,
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
                "name": "firstName",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "jobTitle",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "bio",
                "storageKey": null
              },
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
                "concreteType": "Image",
                "kind": "LinkedField",
                "name": "image",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "imageURL",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
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
    "cacheID": "64a32c10105b00047b593bc10c15f50c",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "staticContent": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "StaticContent"
        },
        "staticContent.id": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "ID"
        },
        "staticContent.specialistBios": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "SpecialistBio"
        },
        "staticContent.specialistBios.bio": (v0/*: any*/),
        "staticContent.specialistBios.email": (v0/*: any*/),
        "staticContent.specialistBios.firstName": (v0/*: any*/),
        "staticContent.specialistBios.image": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "Image"
        },
        "staticContent.specialistBios.image.imageURL": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "String"
        },
        "staticContent.specialistBios.jobTitle": (v0/*: any*/),
        "staticContent.specialistBios.name": (v0/*: any*/)
      }
    },
    "name": "MeetTheSpecialists_test_Query",
    "operationKind": "query",
    "text": "query MeetTheSpecialists_test_Query {\n  staticContent {\n    ...MeetTheSpecialists_staticContent\n    id\n  }\n}\n\nfragment MeetTheSpecialists_staticContent on StaticContent {\n  specialistBios {\n    name\n    firstName\n    jobTitle\n    bio\n    email\n    image {\n      imageURL\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "f01de7f28b84d77c3487cbdc5097554a";

export default node;
