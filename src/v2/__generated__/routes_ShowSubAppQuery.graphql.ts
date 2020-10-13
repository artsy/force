/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type routes_ShowSubAppQueryVariables = {
    slug: string;
};
export type routes_ShowSubAppQueryResponse = {
    readonly show: {
        readonly " $fragmentRefs": FragmentRefs<"ShowSubApp_show">;
    } | null;
};
export type routes_ShowSubAppQuery = {
    readonly response: routes_ShowSubAppQueryResponse;
    readonly variables: routes_ShowSubAppQueryVariables;
};



/*
query routes_ShowSubAppQuery(
  $slug: String!
) {
  show(id: $slug) {
    ...ShowSubApp_show
    id
  }
}

fragment ShowMeta_show on Show {
  name
  slug
  metaDescription: description
  metaImage {
    src: url(version: "large")
  }
}

fragment ShowSubApp_show on Show {
  id
  internalID
  slug
  name
  href
  partner {
    __typename
    ... on Partner {
      name
    }
    ... on ExternalPartner {
      name
      id
    }
    ... on Node {
      id
    }
  }
  ...ShowMeta_show
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "slug",
    "type": "String!"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "slug"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v4 = [
  (v3/*: any*/)
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "routes_ShowSubAppQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Show",
        "kind": "LinkedField",
        "name": "show",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "ShowSubApp_show"
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
    "name": "routes_ShowSubAppQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Show",
        "kind": "LinkedField",
        "name": "show",
        "plural": false,
        "selections": [
          (v2/*: any*/),
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
            "name": "slug",
            "storageKey": null
          },
          (v3/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "href",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": null,
            "kind": "LinkedField",
            "name": "partner",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "__typename",
                "storageKey": null
              },
              (v2/*: any*/),
              {
                "kind": "InlineFragment",
                "selections": (v4/*: any*/),
                "type": "Partner"
              },
              {
                "kind": "InlineFragment",
                "selections": (v4/*: any*/),
                "type": "ExternalPartner"
              }
            ],
            "storageKey": null
          },
          {
            "alias": "metaDescription",
            "args": null,
            "kind": "ScalarField",
            "name": "description",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Image",
            "kind": "LinkedField",
            "name": "metaImage",
            "plural": false,
            "selections": [
              {
                "alias": "src",
                "args": [
                  {
                    "kind": "Literal",
                    "name": "version",
                    "value": "large"
                  }
                ],
                "kind": "ScalarField",
                "name": "url",
                "storageKey": "url(version:\"large\")"
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
    "id": null,
    "metadata": {},
    "name": "routes_ShowSubAppQuery",
    "operationKind": "query",
    "text": "query routes_ShowSubAppQuery(\n  $slug: String!\n) {\n  show(id: $slug) {\n    ...ShowSubApp_show\n    id\n  }\n}\n\nfragment ShowMeta_show on Show {\n  name\n  slug\n  metaDescription: description\n  metaImage {\n    src: url(version: \"large\")\n  }\n}\n\nfragment ShowSubApp_show on Show {\n  id\n  internalID\n  slug\n  name\n  href\n  partner {\n    __typename\n    ... on Partner {\n      name\n    }\n    ... on ExternalPartner {\n      name\n      id\n    }\n    ... on Node {\n      id\n    }\n  }\n  ...ShowMeta_show\n}\n"
  }
};
})();
(node as any).hash = '7a7f53253dff9b5b41d81574761e4f61';
export default node;
