/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type categoriesRoutes_QueryVariables = {};
export type categoriesRoutes_QueryResponse = {
    readonly geneFamiliesConnection: {
        readonly " $fragmentRefs": FragmentRefs<"CategoriesApp_geneFamiliesConnection">;
    } | null;
};
export type categoriesRoutes_Query = {
    readonly response: categoriesRoutes_QueryResponse;
    readonly variables: categoriesRoutes_QueryVariables;
};



/*
query categoriesRoutes_Query {
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
  id
  slug
  name
  genes {
    isPublished
    id
    displayName
    name
    slug
  }
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
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "categoriesRoutes_Query",
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
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "categoriesRoutes_Query",
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
                    "concreteType": "Gene",
                    "kind": "LinkedField",
                    "name": "genes",
                    "plural": true,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "isPublished",
                        "storageKey": null
                      },
                      (v3/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "displayName",
                        "storageKey": null
                      },
                      (v2/*: any*/),
                      (v1/*: any*/)
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
    "cacheID": "31d0b3b2fccaa7842340fd274b369df3",
    "id": null,
    "metadata": {},
    "name": "categoriesRoutes_Query",
    "operationKind": "query",
    "text": "query categoriesRoutes_Query {\n  geneFamiliesConnection(first: 20) {\n    ...CategoriesApp_geneFamiliesConnection\n  }\n}\n\nfragment CategoriesApp_geneFamiliesConnection on GeneFamilyConnection {\n  ...StickyNav_geneFamiliesConnection\n  ...GeneFamilies_geneFamiliesConnection\n}\n\nfragment GeneFamilies_geneFamiliesConnection on GeneFamilyConnection {\n  edges {\n    node {\n      internalID\n      ...GeneFamily_geneFamily\n      id\n    }\n  }\n}\n\nfragment GeneFamily_geneFamily on GeneFamily {\n  id\n  slug\n  name\n  genes {\n    isPublished\n    id\n    displayName\n    name\n    slug\n  }\n}\n\nfragment StickyNav_geneFamiliesConnection on GeneFamilyConnection {\n  edges {\n    node {\n      internalID\n      slug\n      name\n      id\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '483513cb4356510874f412b71a6fd773';
export default node;
