/**
 * @generated SignedSource<<888c5341e4a9f0ca1d613b68619fb4d7>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ContactInformation_SubmissionFlowTest_Query$variables = {
  externalId?: string | null | undefined;
};
export type ContactInformation_SubmissionFlowTest_Query$data = {
  readonly me: {
    readonly " $fragmentSpreads": FragmentRefs<"ContactInformation_me">;
  } | null | undefined;
  readonly submission: {
    readonly " $fragmentSpreads": FragmentRefs<"ContactInformation_submission">;
  } | null | undefined;
};
export type ContactInformation_SubmissionFlowTest_Query = {
  response: ContactInformation_SubmissionFlowTest_Query$data;
  variables: ContactInformation_SubmissionFlowTest_Query$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "externalId"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "externalId",
    "variableName": "externalId"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v3 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
},
v4 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "ContactInformation_SubmissionFlowTest_Query",
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
            "name": "ContactInformation_me"
          }
        ],
        "storageKey": null
      },
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
            "name": "ContactInformation_submission"
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
    "name": "ContactInformation_SubmissionFlowTest_Query",
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
          (v2/*: any*/)
        ],
        "storageKey": null
      },
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
            "name": "externalId",
            "storageKey": null
          },
          (v2/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "4cabf7f3fe975f7b2860fdf99bf9937b",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "me": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Me"
        },
        "me.email": (v3/*: any*/),
        "me.id": (v4/*: any*/),
        "me.internalID": (v4/*: any*/),
        "me.name": (v3/*: any*/),
        "me.phone": (v3/*: any*/),
        "me.phoneNumber": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "PhoneNumberType"
        },
        "me.phoneNumber.regionCode": (v3/*: any*/),
        "submission": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ConsignmentSubmission"
        },
        "submission.externalId": (v4/*: any*/),
        "submission.id": (v4/*: any*/)
      }
    },
    "name": "ContactInformation_SubmissionFlowTest_Query",
    "operationKind": "query",
    "text": "query ContactInformation_SubmissionFlowTest_Query(\n  $externalId: ID\n) {\n  me {\n    ...ContactInformation_me\n    id\n  }\n  submission(externalId: $externalId) {\n    ...ContactInformation_submission\n    id\n  }\n}\n\nfragment ContactInformationForm_me on Me {\n  internalID\n  name\n  email\n  phone\n  phoneNumber {\n    regionCode\n  }\n}\n\nfragment ContactInformation_me on Me {\n  internalID\n  name\n  email\n  phone\n  phoneNumber {\n    regionCode\n  }\n  ...ContactInformationForm_me\n}\n\nfragment ContactInformation_submission on ConsignmentSubmission {\n  externalId\n}\n"
  }
};
})();

(node as any).hash = "3a25683fc533f44cedfd5528a565c3f7";

export default node;
