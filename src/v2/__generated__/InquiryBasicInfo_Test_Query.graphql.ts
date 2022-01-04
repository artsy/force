/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type InquiryBasicInfo_Test_QueryVariables = {};
export type InquiryBasicInfo_Test_QueryResponse = {
    readonly artwork: {
        readonly " $fragmentRefs": FragmentRefs<"InquiryBasicInfo_artwork">;
    } | null;
    readonly me: {
        readonly " $fragmentRefs": FragmentRefs<"InquiryBasicInfo_me">;
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
},
v2 = {
  "type": "ID",
  "enumValues": null,
  "plural": false,
  "nullable": true
},
v3 = {
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
              (v1/*: any*/)
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
          (v1/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "artwork": {
          "type": "Artwork",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "me": {
          "type": "Me",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "artwork.id": (v2/*: any*/),
        "me.id": (v2/*: any*/),
        "artwork.partner": {
          "type": "Partner",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "me.location": {
          "type": "MyLocation",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "me.phone": (v3/*: any*/),
        "me.profession": (v3/*: any*/),
        "artwork.partner.name": (v3/*: any*/),
        "artwork.partner.id": (v2/*: any*/),
        "me.location.display": (v3/*: any*/),
        "me.location.id": (v2/*: any*/)
      }
    },
    "name": "InquiryBasicInfo_Test_Query",
    "operationKind": "query",
    "text": "query InquiryBasicInfo_Test_Query {\n  artwork(id: \"example\") {\n    ...InquiryBasicInfo_artwork\n    id\n  }\n  me {\n    ...InquiryBasicInfo_me\n    id\n  }\n}\n\nfragment InquiryBasicInfo_artwork on Artwork {\n  partner {\n    name\n    id\n  }\n}\n\nfragment InquiryBasicInfo_me on Me {\n  location {\n    display\n    id\n  }\n  phone\n  profession\n}\n"
  }
};
})();
(node as any).hash = '365e94690199b0fa004e41d220f5bfac';
export default node;
