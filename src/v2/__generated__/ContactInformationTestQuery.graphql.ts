/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ContactInformationTestQueryVariables = {};
export type ContactInformationTestQueryResponse = {
    readonly me: {
        readonly " $fragmentRefs": FragmentRefs<"ContactInformation_me">;
    } | null;
};
export type ContactInformationTestQuery = {
    readonly response: ContactInformationTestQueryResponse;
    readonly variables: ContactInformationTestQueryVariables;
};



/*
query ContactInformationTestQuery {
  me {
    ...ContactInformation_me
    id
  }
}

fragment ContactInformation_me on Me {
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
    "name": "ContactInformationTestQuery",
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
      }
    ],
    "type": "Query"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "ContactInformationTestQuery",
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
        "me.name": (v0/*: any*/),
        "me.email": (v0/*: any*/),
        "me.phone": (v0/*: any*/),
        "me.phoneNumber": {
          "type": "PhoneNumberType",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "me.phoneNumber.isValid": {
          "type": "Boolean",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "me.phoneNumber.international": (v0/*: any*/),
        "me.phoneNumber.national": (v0/*: any*/),
        "me.phoneNumber.regionCode": (v0/*: any*/)
      }
    },
    "name": "ContactInformationTestQuery",
    "operationKind": "query",
    "text": "query ContactInformationTestQuery {\n  me {\n    ...ContactInformation_me\n    id\n  }\n}\n\nfragment ContactInformation_me on Me {\n  name\n  email\n  phone\n  phoneNumber {\n    isValid\n    international: display(format: INTERNATIONAL)\n    national: display(format: NATIONAL)\n    regionCode\n  }\n}\n"
  }
};
})();
(node as any).hash = '9c1bf7f75f2780e1bbfe696235d8c373';
export default node;
