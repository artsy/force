/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type PageApp_Test_QueryVariables = {};
export type PageApp_Test_QueryResponse = {
    readonly page: {
        readonly " $fragmentRefs": FragmentRefs<"PageApp_page">;
    };
};
export type PageApp_Test_Query = {
    readonly response: PageApp_Test_QueryResponse;
    readonly variables: PageApp_Test_QueryVariables;
};



/*
query PageApp_Test_Query {
  page(id: "example") {
    ...PageApp_page
    id
  }
}

fragment PageApp_page on Page {
  internalID
  name
  content(format: HTML)
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
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "PageApp_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "Page",
        "kind": "LinkedField",
        "name": "page",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "PageApp_page"
          }
        ],
        "storageKey": "page(id:\"example\")"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "PageApp_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "Page",
        "kind": "LinkedField",
        "name": "page",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "internalID",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "name",
            "storageKey": null
          },
          {
            "alias": null,
            "args": [
              {
                "kind": "Literal",
                "name": "format",
                "value": "HTML"
              }
            ],
            "kind": "ScalarField",
            "name": "content",
            "storageKey": "content(format:\"HTML\")"
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "id",
            "storageKey": null
          }
        ],
        "storageKey": "page(id:\"example\")"
      }
    ]
  },
  "params": {
    "cacheID": "ce1e321e59737765254acd134c8b3fa7",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "page": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "Page"
        },
        "page.content": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "String"
        },
        "page.id": (v1/*: any*/),
        "page.internalID": (v1/*: any*/),
        "page.name": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "String"
        }
      }
    },
    "name": "PageApp_Test_Query",
    "operationKind": "query",
    "text": "query PageApp_Test_Query {\n  page(id: \"example\") {\n    ...PageApp_page\n    id\n  }\n}\n\nfragment PageApp_page on Page {\n  internalID\n  name\n  content(format: HTML)\n}\n"
  }
};
})();
(node as any).hash = 'fb8c6643c53847e5ba946f1ce0a0205c';
export default node;
