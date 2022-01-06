/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type articleRoutes_TopLevelQueryVariables = {
    slug: string;
};
export type articleRoutes_TopLevelQueryResponse = {
    readonly editorialArticle: {
        readonly title: string | null;
    } | null;
};
export type articleRoutes_TopLevelQuery = {
    readonly response: articleRoutes_TopLevelQueryResponse;
    readonly variables: articleRoutes_TopLevelQueryVariables;
};



/*
query articleRoutes_TopLevelQuery(
  $slug: String!
) {
  editorialArticle(id: $slug) {
    title
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "slug"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "id",
        "variableName": "slug"
      }
    ],
    "concreteType": "EditorialAnon1089",
    "kind": "LinkedField",
    "name": "editorialArticle",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "title",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "articleRoutes_TopLevelQuery",
    "selections": (v1/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "articleRoutes_TopLevelQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "9f5d1ffbf2fe81ac0a8993725f59edf1",
    "id": null,
    "metadata": {},
    "name": "articleRoutes_TopLevelQuery",
    "operationKind": "query",
    "text": "query articleRoutes_TopLevelQuery(\n  $slug: String!\n) {\n  editorialArticle(id: $slug) {\n    title\n  }\n}\n"
  }
};
})();
(node as any).hash = '8dc33ea531d8777da369ea2bba15e742';
export default node;
