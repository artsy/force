/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ContactInformation_SubmissionFlowTest_QueryVariables = {
    externalId?: string | null | undefined;
};
export type ContactInformation_SubmissionFlowTest_QueryResponse = {
    readonly me: {
        readonly " $fragmentRefs": FragmentRefs<"ContactInformation_me">;
    } | null;
    readonly submission: {
        readonly " $fragmentRefs": FragmentRefs<"ContactInformation_submission">;
    } | null;
};
export type ContactInformation_SubmissionFlowTest_Query = {
    readonly response: ContactInformation_SubmissionFlowTest_QueryResponse;
    readonly variables: ContactInformation_SubmissionFlowTest_QueryVariables;
};



/*
query ContactInformation_SubmissionFlowTest_Query(
  $externalId: ID
) {
  me {
    ...ContactInformation_me
    id
  }
  submission(id: $externalId) {
    ...ContactInformation_submission
    id
  }
}

fragment ContactInformation_me on Me {
  internalID
  name
  email
  phone
  phoneNumber {
    isValid
    international: display(format: INTERNATIONAL)
    national: display(format: NATIONAL)
    regionCode
  }
}

fragment ContactInformation_submission on ConsignmentSubmission {
  id
  externalId
}
*/

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
    "name": "id",
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
                "name": "isValid",
                "storageKey": null
              },
              {
                "alias": "international",
                "args": [
                  {
                    "kind": "Literal",
                    "name": "format",
                    "value": "INTERNATIONAL"
                  }
                ],
                "kind": "ScalarField",
                "name": "display",
                "storageKey": "display(format:\"INTERNATIONAL\")"
              },
              {
                "alias": "national",
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
          (v2/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "externalId",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "5c916dbda5b57a8cf592575b9f2dd3ac",
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
        "me.phoneNumber.international": (v3/*: any*/),
        "me.phoneNumber.isValid": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Boolean"
        },
        "me.phoneNumber.national": (v3/*: any*/),
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
    "text": "query ContactInformation_SubmissionFlowTest_Query(\n  $externalId: ID\n) {\n  me {\n    ...ContactInformation_me\n    id\n  }\n  submission(id: $externalId) {\n    ...ContactInformation_submission\n    id\n  }\n}\n\nfragment ContactInformation_me on Me {\n  internalID\n  name\n  email\n  phone\n  phoneNumber {\n    isValid\n    international: display(format: INTERNATIONAL)\n    national: display(format: NATIONAL)\n    regionCode\n  }\n}\n\nfragment ContactInformation_submission on ConsignmentSubmission {\n  id\n  externalId\n}\n"
  }
};
})();
(node as any).hash = '63a8362b8f7c72ba59d83e2186b97ad0';
export default node;
