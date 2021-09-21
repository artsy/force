/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type CategoriesApp_Test_QueryVariables = {};
export type CategoriesApp_Test_QueryResponse = {
    readonly geneFamiliesConnection: {
        readonly " $fragmentRefs": FragmentRefs<"CategoriesApp_geneFamiliesConnection">;
    } | null;
};
export type CategoriesApp_Test_Query = {
    readonly response: CategoriesApp_Test_QueryResponse;
    readonly variables: CategoriesApp_Test_QueryVariables;
};



/*
query CategoriesApp_Test_Query {
  geneFamiliesConnection(first: 20) {
    ...CategoriesApp_geneFamiliesConnection
  }
}

fragment CategoriesApp_geneFamiliesConnection on GeneFamilyConnection {
  ...StickyNav_geneFamiliesConnection
  ...GeneFamilies_geneFamiliesConnection
}

fragment GeneFamilies_geneFamiliesConnection on GeneFamilyConnection {
  edges {
    node {
      internalID
      ...GeneFamily_geneFamily
      id
    }
  }
}

fragment GeneFamily_geneFamily on GeneFamily {
  featuredGeneLinks {
    href
    title
    image {
      resized(height: 400) {
        src
        srcSet
      }
      url(version: "large_rectangle")
    }
  }
  genes {
    displayName
    href
    id
    name
    slug
    isPublished
  }
  id
  name
  slug
}

fragment StickyNav_geneFamiliesConnection on GeneFamilyConnection {
  edges {
    node {
      internalID
      slug
      name
      id
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 20
  }
],
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
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "href",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "CategoriesApp_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "GeneFamilyConnection",
        "kind": "LinkedField",
        "name": "geneFamiliesConnection",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "CategoriesApp_geneFamiliesConnection"
          }
        ],
        "storageKey": "geneFamiliesConnection(first:20)"
      }
    ],
    "type": "Query"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "CategoriesApp_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
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
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "internalID",
                    "storageKey": null
                  },
                  (v1/*: any*/),
                  (v2/*: any*/),
                  (v3/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "FeaturedGeneLink",
                    "kind": "LinkedField",
                    "name": "featuredGeneLinks",
                    "plural": true,
                    "selections": [
                      (v4/*: any*/),
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
                                "name": "height",
                                "value": 400
                              }
                            ],
                            "concreteType": "ResizedImageUrl",
                            "kind": "LinkedField",
                            "name": "resized",
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
                            "storageKey": "resized(height:400)"
                          },
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
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Gene",
                    "kind": "LinkedField",
                    "name": "genes",
                    "plural": true,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "displayName",
                        "storageKey": null
                      },
                      (v4/*: any*/),
                      (v3/*: any*/),
                      (v2/*: any*/),
                      (v1/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "isPublished",
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
    ]
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "CategoriesApp_Test_Query",
    "operationKind": "query",
    "text": "query CategoriesApp_Test_Query {\n  geneFamiliesConnection(first: 20) {\n    ...CategoriesApp_geneFamiliesConnection\n  }\n}\n\nfragment CategoriesApp_geneFamiliesConnection on GeneFamilyConnection {\n  ...StickyNav_geneFamiliesConnection\n  ...GeneFamilies_geneFamiliesConnection\n}\n\nfragment GeneFamilies_geneFamiliesConnection on GeneFamilyConnection {\n  edges {\n    node {\n      internalID\n      ...GeneFamily_geneFamily\n      id\n    }\n  }\n}\n\nfragment GeneFamily_geneFamily on GeneFamily {\n  featuredGeneLinks {\n    href\n    title\n    image {\n      resized(height: 400) {\n        src\n        srcSet\n      }\n      url(version: \"large_rectangle\")\n    }\n  }\n  genes {\n    displayName\n    href\n    id\n    name\n    slug\n    isPublished\n  }\n  id\n  name\n  slug\n}\n\nfragment StickyNav_geneFamiliesConnection on GeneFamilyConnection {\n  edges {\n    node {\n      internalID\n      slug\n      name\n      id\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '4f7c4472ca1fb6b197c14859b61fef5e';
export default node;
