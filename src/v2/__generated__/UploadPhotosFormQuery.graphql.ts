/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
export type UploadPhotosFormQueryVariables = {};
export type UploadPhotosFormQueryResponse = {
    readonly submission: {
        readonly id: string;
    } | null;
};
export type UploadPhotosFormQuery = {
    readonly response: UploadPhotosFormQueryResponse;
    readonly variables: UploadPhotosFormQueryVariables;
};



/*
query UploadPhotosFormQuery {
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
    "name": "UploadPhotosFormQuery",
    "selections": (v0/*: any*/),
    "type": "Query"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "UploadPhotosFormQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "UploadPhotosFormQuery",
    "operationKind": "query",
    "text": "query UploadPhotosFormQuery {\n  submission(id: \"\") {\n    id\n  }\n}\n"
  }
};
})();
(node as any).hash = '8fe97311dcd3af39a27241c7d7763404';
export default node;
