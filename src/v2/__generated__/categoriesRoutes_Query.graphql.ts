/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
export type categoriesRoutes_QueryVariables = {};
export type categoriesRoutes_QueryResponse = {
    readonly geneFamiliesConnection: {
        readonly edges: ReadonlyArray<{
            readonly node: {
                readonly id: string;
                readonly slug: string;
                readonly name: string;
                readonly genes: ReadonlyArray<{
                    readonly id: string;
                    readonly slug: string;
                    readonly name: string | null;
                    readonly displayName: string | null;
                    readonly isPublished: boolean | null;
                } | null> | null;
                readonly featuredGeneLinks: ReadonlyArray<{
                    readonly href: string;
                    readonly title: string;
                    readonly image: {
                        readonly url: string | null;
                    } | null;
                } | null> | null;
            } | null;
        } | null> | null;
    } | null;
};
export type categoriesRoutes_Query = {
    readonly response: categoriesRoutes_QueryResponse;
    readonly variables: categoriesRoutes_QueryVariables;
};



/*
query categoriesRoutes_Query {
  geneFamiliesConnection(first: 20) {
    edges {
      node {
        id
        slug
        name
        genes {
          id
          slug
          name
          displayName
          isPublished
        }
        featuredGeneLinks {
          href
          title
          image {
            url(version: "large_rectangle")
          }
        }
      }
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "slug",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v3 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Literal",
        "name": "first",
        "value": 20
      }
    ],
    "concreteType": "GeneFamilyConnection",
    "kind": "LinkedField",
    "name": "geneFamiliesConnection",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "GeneFamilyEdge",
        "kind": "LinkedField",
        "name": "edges",
        "plural": true,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "GeneFamily",
            "kind": "LinkedField",
            "name": "node",
            "plural": false,
            "selections": [
              (v0/*: any*/),
              (v1/*: any*/),
              (v2/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "Gene",
                "kind": "LinkedField",
                "name": "genes",
                "plural": true,
                "selections": [
                  (v0/*: any*/),
                  (v1/*: any*/),
                  (v2/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "displayName",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "isPublished",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "FeaturedGeneLink",
                "kind": "LinkedField",
                "name": "featuredGeneLinks",
                "plural": true,
                "selections": [
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
                    "kind": "ScalarField",
                    "name": "title",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Image",
                    "kind": "LinkedField",
                    "name": "image",
                    "plural": false,
                    "selections": [
                      {
                        "alias": null,
                        "args": [
                          {
                            "kind": "Literal",
                            "name": "version",
                            "value": "large_rectangle"
                          }
                        ],
                        "kind": "ScalarField",
                        "name": "url",
                        "storageKey": "url(version:\"large_rectangle\")"
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "storageKey": "geneFamiliesConnection(first:20)"
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "categoriesRoutes_Query",
    "selections": (v3/*: any*/),
    "type": "Query"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "categoriesRoutes_Query",
    "selections": (v3/*: any*/)
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "categoriesRoutes_Query",
    "operationKind": "query",
    "text": "query categoriesRoutes_Query {\n  geneFamiliesConnection(first: 20) {\n    edges {\n      node {\n        id\n        slug\n        name\n        genes {\n          id\n          slug\n          name\n          displayName\n          isPublished\n        }\n        featuredGeneLinks {\n          href\n          title\n          image {\n            url(version: \"large_rectangle\")\n          }\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '24b219b2446172b21575aa3b43705e30';
export default node;
