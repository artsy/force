/**
 * @generated SignedSource<<ef945efa0be77939ba417e1fae2917ba>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ConsignmentInquiry_Test_Query$variables = Record<PropertyKey, never>;
export type ConsignmentInquiry_Test_Query$data = {
  readonly me: {
    readonly " $fragmentSpreads": FragmentRefs<"ConsignmentInquiry_me">;
  } | null | undefined;
  readonly viewer: {
    readonly " $fragmentSpreads": FragmentRefs<"ConsignmentInquiry_viewer">;
  } | null | undefined;
};
export type ConsignmentInquiry_Test_Query = {
  response: ConsignmentInquiry_Test_Query$data;
  variables: ConsignmentInquiry_Test_Query$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "email",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v2 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
},
v3 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
},
v4 = {
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
    "name": "ConsignmentInquiry_Test_Query",
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
            "name": "ConsignmentInquiry_me"
          }
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "Viewer",
        "kind": "LinkedField",
        "name": "viewer",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "ConsignmentInquiry_viewer"
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
    "name": "ConsignmentInquiry_Test_Query",
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
            "name": "internalID",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "name",
            "storageKey": null
          },
          (v0/*: any*/),
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
              }
            ],
            "storageKey": null
          },
          (v1/*: any*/)
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "Viewer",
        "kind": "LinkedField",
        "name": "viewer",
        "plural": false,
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
                    "name": "firstName",
                    "storageKey": null
                  },
                  (v0/*: any*/)
                ],
                "storageKey": null
              },
              (v1/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "6becda9717f11814aa0c339445779049",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "me": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Me"
        },
        "me.email": (v2/*: any*/),
        "me.id": (v3/*: any*/),
        "me.internalID": (v3/*: any*/),
        "me.name": (v2/*: any*/),
        "me.phone": (v2/*: any*/),
        "me.phoneNumber": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "PhoneNumberType"
        },
        "me.phoneNumber.regionCode": (v2/*: any*/),
        "viewer": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Viewer"
        },
        "viewer.staticContent": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "StaticContent"
        },
        "viewer.staticContent.id": (v3/*: any*/),
        "viewer.staticContent.specialistBios": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "SpecialistBio"
        },
        "viewer.staticContent.specialistBios.email": (v4/*: any*/),
        "viewer.staticContent.specialistBios.firstName": (v4/*: any*/)
      }
    },
    "name": "ConsignmentInquiry_Test_Query",
    "operationKind": "query",
    "text": "query ConsignmentInquiry_Test_Query {\n  me {\n    ...ConsignmentInquiry_me\n    id\n  }\n  viewer {\n    ...ConsignmentInquiry_viewer\n  }\n}\n\nfragment ConsignmentInquiry_me on Me {\n  internalID\n  name\n  email\n  phone\n  phoneNumber {\n    regionCode\n  }\n}\n\nfragment ConsignmentInquiry_viewer on Viewer {\n  staticContent {\n    specialistBios {\n      firstName\n      email\n    }\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "72130e1a90c6c50cc7935b77b9a29200";

export default node;
