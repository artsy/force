/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type InquiryBasicInfoQueryVariables = {
    id: string;
};
export type InquiryBasicInfoQueryResponse = {
    readonly artwork: {
        readonly " $fragmentRefs": FragmentRefs<"InquiryBasicInfo_artwork">;
    } | null;
    readonly me: {
        readonly " $fragmentRefs": FragmentRefs<"InquiryBasicInfo_me">;
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
  me {
    ...InquiryBasicInfo_me
    id
  }
}

fragment InquiryBasicInfo_artwork on Artwork {
  partner {
    name
    id
  }
}

fragment InquiryBasicInfo_me on Me {
  location {
    display
    id
  }
  phone
  profession
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "id"
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
      },
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
            "name": "InquiryBasicInfo_me"
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
      },
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
            "concreteType": "MyLocation",
            "kind": "LinkedField",
            "name": "location",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "display",
                "storageKey": null
              },
              (v2/*: any*/)
            ],
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
            "kind": "ScalarField",
            "name": "profession",
            "storageKey": null
          },
          (v2/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "b19a3cf4c7a4fca9fc7280ffc8a1a166",
    "id": null,
    "metadata": {},
    "name": "InquiryBasicInfoQuery",
    "operationKind": "query",
    "text": "query InquiryBasicInfoQuery(\n  $id: String!\n) {\n  artwork(id: $id) {\n    ...InquiryBasicInfo_artwork\n    id\n  }\n  me {\n    ...InquiryBasicInfo_me\n    id\n  }\n}\n\nfragment InquiryBasicInfo_artwork on Artwork {\n  partner {\n    name\n    id\n  }\n}\n\nfragment InquiryBasicInfo_me on Me {\n  location {\n    display\n    id\n  }\n  phone\n  profession\n}\n"
  }
};
})();
(node as any).hash = '587675ba2f1e1d08b0c7b66a9b254b9c';
export default node;
