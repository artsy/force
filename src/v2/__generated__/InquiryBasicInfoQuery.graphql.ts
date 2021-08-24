/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type InquiryBasicInfoQueryVariables = {
    id: string;
};
export type InquiryBasicInfoQueryResponse = {
    readonly artwork: {
        readonly " $fragmentRefs": FragmentRefs<"InquiryBasicInfo_artwork">;
    } | null;
};
export type InquiryBasicInfoQuery = {
    readonly response: InquiryBasicInfoQueryResponse;
    readonly variables: InquiryBasicInfoQueryVariables;
};



/*
query InquiryBasicInfoQuery(
  $id: String!
) {
  artwork(id: $id) {
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
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "id",
    "type": "String!"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "id"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "InquiryBasicInfoQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
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
        "storageKey": null
      }
    ],
    "type": "Query"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "InquiryBasicInfoQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
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
              (v2/*: any*/)
            ],
            "storageKey": null
          },
          (v2/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "InquiryBasicInfoQuery",
    "operationKind": "query",
    "text": "query InquiryBasicInfoQuery(\n  $id: String!\n) {\n  artwork(id: $id) {\n    ...InquiryBasicInfo_artwork\n    id\n  }\n}\n\nfragment InquiryBasicInfo_artwork on Artwork {\n  partner {\n    name\n    id\n  }\n}\n"
  }
};
})();
(node as any).hash = 'd4e1bd142973cb3a3292f49632e59583';
export default node;
