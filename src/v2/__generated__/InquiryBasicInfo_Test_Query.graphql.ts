/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type InquiryBasicInfo_Test_QueryVariables = {};
export type InquiryBasicInfo_Test_QueryResponse = {
    readonly artwork: {
        readonly " $fragmentRefs": FragmentRefs<"InquiryBasicInfo_artwork">;
    } | null;
};
export type InquiryBasicInfo_Test_Query = {
    readonly response: InquiryBasicInfo_Test_QueryResponse;
    readonly variables: InquiryBasicInfo_Test_QueryVariables;
};



/*
query InquiryBasicInfo_Test_Query {
  artwork(id: "example") {
    ...InquiryBasicInfo_artwork
    id
  }
}

fragment InquiryBasicInfo_artwork on Artwork {
  partner {
    name
    id
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "example"
  }
],
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
    "name": "InquiryBasicInfo_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "Artwork",
        "kind": "LinkedField",
        "name": "artwork",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "InquiryBasicInfo_artwork"
          }
        ],
        "storageKey": "artwork(id:\"example\")"
      }
    ],
    "type": "Query"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "InquiryBasicInfo_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "Artwork",
        "kind": "LinkedField",
        "name": "artwork",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "Partner",
            "kind": "LinkedField",
            "name": "partner",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "name",
                "storageKey": null
              },
              (v1/*: any*/)
            ],
            "storageKey": null
          },
          (v1/*: any*/)
        ],
        "storageKey": "artwork(id:\"example\")"
      }
    ]
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "InquiryBasicInfo_Test_Query",
    "operationKind": "query",
    "text": "query InquiryBasicInfo_Test_Query {\n  artwork(id: \"example\") {\n    ...InquiryBasicInfo_artwork\n    id\n  }\n}\n\nfragment InquiryBasicInfo_artwork on Artwork {\n  partner {\n    name\n    id\n  }\n}\n"
  }
};
})();
(node as any).hash = '61f4f81b0f53ae5d817f4f98a2b58592';
export default node;
