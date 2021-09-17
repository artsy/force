/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type InquiryGalleriesYouWorkWithQueryVariables = {
    term: string;
};
export type InquiryGalleriesYouWorkWithQueryResponse = {
    readonly external: {
        readonly galleries: ReadonlyArray<{
            readonly internalID: string;
            readonly name: string;
        }>;
    };
};
export type InquiryGalleriesYouWorkWithQuery = {
    readonly response: InquiryGalleriesYouWorkWithQueryResponse;
    readonly variables: InquiryGalleriesYouWorkWithQueryVariables;
};



/*
query InquiryGalleriesYouWorkWithQuery(
  $term: String!
) {
  external {
    galleries(size: 5, term: $term) {
      internalID
      name
      id
    }
  }
}
*/

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
    "name": "InquiryGalleriesYouWorkWithQuery",
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
            "concreteType": "ExternalGallery",
            "kind": "LinkedField",
            "name": "galleries",
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
    "name": "InquiryGalleriesYouWorkWithQuery",
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
            "concreteType": "ExternalGallery",
            "kind": "LinkedField",
            "name": "galleries",
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
    "cacheID": "2485b5959c0c92377d226d04a934e45e",
    "id": null,
    "metadata": {},
    "name": "InquiryGalleriesYouWorkWithQuery",
    "operationKind": "query",
    "text": "query InquiryGalleriesYouWorkWithQuery(\n  $term: String!\n) {\n  external {\n    galleries(size: 5, term: $term) {\n      internalID\n      name\n      id\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = 'a809931107dcaaaa65313f438b066f42';
export default node;
