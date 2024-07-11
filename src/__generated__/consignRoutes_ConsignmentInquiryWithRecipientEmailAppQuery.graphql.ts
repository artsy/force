/**
 * @generated SignedSource<<8fbf8206948093e9e0da6008cea40fc9>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type consignRoutes_ConsignmentInquiryWithRecipientEmailAppQuery$variables = Record<PropertyKey, never>;
export type consignRoutes_ConsignmentInquiryWithRecipientEmailAppQuery$data = {
  readonly me: {
    readonly " $fragmentSpreads": FragmentRefs<"ConsignmentInquiry_me">;
  } | null | undefined;
  readonly viewer: {
    readonly " $fragmentSpreads": FragmentRefs<"ConsignmentInquiry_viewer">;
  } | null | undefined;
};
export type consignRoutes_ConsignmentInquiryWithRecipientEmailAppQuery = {
  response: consignRoutes_ConsignmentInquiryWithRecipientEmailAppQuery$data;
  variables: consignRoutes_ConsignmentInquiryWithRecipientEmailAppQuery$variables;
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
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "consignRoutes_ConsignmentInquiryWithRecipientEmailAppQuery",
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
    "name": "consignRoutes_ConsignmentInquiryWithRecipientEmailAppQuery",
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
    "cacheID": "e350c45645b8507ed0e85481ab057361",
    "id": null,
    "metadata": {},
    "name": "consignRoutes_ConsignmentInquiryWithRecipientEmailAppQuery",
    "operationKind": "query",
    "text": "query consignRoutes_ConsignmentInquiryWithRecipientEmailAppQuery {\n  me {\n    ...ConsignmentInquiry_me\n    id\n  }\n  viewer {\n    ...ConsignmentInquiry_viewer\n  }\n}\n\nfragment ConsignmentInquiry_me on Me {\n  internalID\n  name\n  email\n  phone\n  phoneNumber {\n    regionCode\n  }\n}\n\nfragment ConsignmentInquiry_viewer on Viewer {\n  staticContent {\n    specialistBios {\n      firstName\n      email\n    }\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "161c00c6165e6c1b36436b173dcb692c";

export default node;
