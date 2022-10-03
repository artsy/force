/**
 * @generated SignedSource<<02780ed86029befe715b6154bdbc1de3>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type InquiryFairsYouAttendQuery$variables = {
  term: string;
};
export type InquiryFairsYouAttendQuery$data = {
  readonly external: {
    readonly fairs: ReadonlyArray<{
      readonly internalID: string;
      readonly name: string;
    }>;
  };
};
export type InquiryFairsYouAttendQuery = {
  response: InquiryFairsYouAttendQuery$data;
  variables: InquiryFairsYouAttendQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "term"
  }
],
v1 = [
  {
    "kind": "Literal",
    "name": "size",
    "value": 5
  },
  {
    "kind": "Variable",
    "name": "term",
    "variableName": "term"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "InquiryFairsYouAttendQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "External",
        "kind": "LinkedField",
        "name": "external",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": (v1/*: any*/),
            "concreteType": "ExternalFair",
            "kind": "LinkedField",
            "name": "fairs",
            "plural": true,
            "selections": [
              (v2/*: any*/),
              (v3/*: any*/)
            ],
            "storageKey": null
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
    "name": "InquiryFairsYouAttendQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "External",
        "kind": "LinkedField",
        "name": "external",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": (v1/*: any*/),
            "concreteType": "ExternalFair",
            "kind": "LinkedField",
            "name": "fairs",
            "plural": true,
            "selections": [
              (v2/*: any*/),
              (v3/*: any*/),
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
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "7bd3834b6124959e25c744547cedec8d",
    "id": null,
    "metadata": {},
    "name": "InquiryFairsYouAttendQuery",
    "operationKind": "query",
    "text": "query InquiryFairsYouAttendQuery(\n  $term: String!\n) {\n  external {\n    fairs(size: 5, term: $term) {\n      internalID\n      name\n      id\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "8054b7dee581b03378483646085411fc";

export default node;
