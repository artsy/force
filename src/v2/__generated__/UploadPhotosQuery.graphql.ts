/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
export type UploadPhotosQueryVariables = {};
export type UploadPhotosQueryResponse = {
    readonly submission: {
        readonly id: string;
    } | null;
};
export type UploadPhotosQuery = {
    readonly response: UploadPhotosQueryResponse;
    readonly variables: UploadPhotosQueryVariables;
};



/*
query UploadPhotosQuery {
  submission(id: "") {
    id
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Literal",
        "name": "id",
        "value": ""
      }
    ],
    "concreteType": "ConsignmentSubmission",
    "kind": "LinkedField",
    "name": "submission",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "id",
        "storageKey": null
      }
    ],
    "storageKey": "submission(id:\"\")"
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "UploadPhotosQuery",
    "selections": (v0/*: any*/),
    "type": "Query"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "UploadPhotosQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "UploadPhotosQuery",
    "operationKind": "query",
    "text": "query UploadPhotosQuery {\n  submission(id: \"\") {\n    id\n  }\n}\n"
  }
};
})();
(node as any).hash = '6d1cae658b2459df58ce5e4f506bcfaf';
export default node;
