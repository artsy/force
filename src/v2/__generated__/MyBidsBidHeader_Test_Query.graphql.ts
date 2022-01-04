/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type MyBidsBidHeader_Test_QueryVariables = {};
export type MyBidsBidHeader_Test_QueryResponse = {
    readonly sale: {
        readonly " $fragmentRefs": FragmentRefs<"MyBidsBidHeader_sale">;
    } | null;
};
export type MyBidsBidHeader_Test_Query = {
    readonly response: MyBidsBidHeader_Test_QueryResponse;
    readonly variables: MyBidsBidHeader_Test_QueryVariables;
};



/*
query MyBidsBidHeader_Test_Query {
  sale(id: "foo") {
    ...MyBidsBidHeader_sale
    id
  }
}

fragment MyBidsBidHeader_sale on Sale {
  coverImage {
    cropped(width: 330, height: 100) {
      src
      srcSet
    }
  }
  formattedStartDateTime
  name
  partner {
    name
    id
  }
  slug
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "foo"
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v3 = {
  "type": "ID",
  "enumValues": null,
  "plural": false,
  "nullable": true
},
v4 = {
  "type": "String",
  "enumValues": null,
  "plural": false,
  "nullable": true
},
v5 = {
  "type": "String",
  "enumValues": null,
  "plural": false,
  "nullable": false
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "MyBidsBidHeader_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "Sale",
        "kind": "LinkedField",
        "name": "sale",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "MyBidsBidHeader_sale"
          }
        ],
        "storageKey": "sale(id:\"foo\")"
      }
    ],
    "type": "Query"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "MyBidsBidHeader_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "Sale",
        "kind": "LinkedField",
        "name": "sale",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "Image",
            "kind": "LinkedField",
            "name": "coverImage",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": [
                  {
                    "kind": "Literal",
                    "name": "height",
                    "value": 100
                  },
                  {
                    "kind": "Literal",
                    "name": "width",
                    "value": 330
                  }
                ],
                "concreteType": "CroppedImageUrl",
                "kind": "LinkedField",
                "name": "cropped",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "src",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "srcSet",
                    "storageKey": null
                  }
                ],
                "storageKey": "cropped(height:100,width:330)"
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "formattedStartDateTime",
            "storageKey": null
          },
          (v1/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "Partner",
            "kind": "LinkedField",
            "name": "partner",
            "plural": false,
            "selections": [
              (v1/*: any*/),
              (v2/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "slug",
            "storageKey": null
          },
          (v2/*: any*/)
        ],
        "storageKey": "sale(id:\"foo\")"
      }
    ]
  },
  "params": {
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "sale": {
          "type": "Sale",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "sale.id": (v3/*: any*/),
        "sale.coverImage": {
          "type": "Image",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "sale.formattedStartDateTime": (v4/*: any*/),
        "sale.name": (v4/*: any*/),
        "sale.partner": {
          "type": "Partner",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "sale.slug": {
          "type": "ID",
          "enumValues": null,
          "plural": false,
          "nullable": false
        },
        "sale.coverImage.cropped": {
          "type": "CroppedImageUrl",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "sale.partner.name": (v4/*: any*/),
        "sale.partner.id": (v3/*: any*/),
        "sale.coverImage.cropped.src": (v5/*: any*/),
        "sale.coverImage.cropped.srcSet": (v5/*: any*/)
      }
    },
    "name": "MyBidsBidHeader_Test_Query",
    "operationKind": "query",
    "text": "query MyBidsBidHeader_Test_Query {\n  sale(id: \"foo\") {\n    ...MyBidsBidHeader_sale\n    id\n  }\n}\n\nfragment MyBidsBidHeader_sale on Sale {\n  coverImage {\n    cropped(width: 330, height: 100) {\n      src\n      srcSet\n    }\n  }\n  formattedStartDateTime\n  name\n  partner {\n    name\n    id\n  }\n  slug\n}\n"
  }
};
})();
(node as any).hash = '4389c2883e34a4aad235bf3d192a0b5f';
export default node;
