/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
export type OpenInquiryModalButtonQueryVariables = {
    artworkID: string;
};
export type OpenInquiryModalButtonQueryResponse = {
    readonly artwork: {
        readonly isOfferableFromInquiry: boolean | null;
    } | null;
};
export type OpenInquiryModalButtonQuery = {
    readonly response: OpenInquiryModalButtonQueryResponse;
    readonly variables: OpenInquiryModalButtonQueryVariables;
};



/*
query OpenInquiryModalButtonQuery(
  $artworkID: String!
) {
  artwork(id: $artworkID) {
    isOfferableFromInquiry
    id
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "artworkID",
    "type": "String!"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "artworkID"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isOfferableFromInquiry",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "OpenInquiryModalButtonQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Artwork",
        "kind": "LinkedField",
        "name": "artwork",
        "plural": false,
        "selections": [
          (v2/*: any*/)
        ],
        "storageKey": null
      }
    ],
    "type": "Query"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "OpenInquiryModalButtonQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Artwork",
        "kind": "LinkedField",
        "name": "artwork",
        "plural": false,
        "selections": [
          (v2/*: any*/),
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
    "metadata": {},
    "name": "OpenInquiryModalButtonQuery",
    "operationKind": "query",
    "text": "query OpenInquiryModalButtonQuery(\n  $artworkID: String!\n) {\n  artwork(id: $artworkID) {\n    isOfferableFromInquiry\n    id\n  }\n}\n"
  }
};
})();
(node as any).hash = '2972c543f93e98b7922227aa3d26d036';
export default node;
