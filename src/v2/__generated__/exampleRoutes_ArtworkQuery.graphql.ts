/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type exampleRoutes_ArtworkQueryVariables = {
    slug: string;
};
export type exampleRoutes_ArtworkQueryResponse = {
    readonly artwork: {
        readonly id: string;
        readonly " $fragmentRefs": FragmentRefs<"ExampleArtworkApp_artwork">;
    } | null;
};
export type exampleRoutes_ArtworkQuery = {
    readonly response: exampleRoutes_ArtworkQueryResponse;
    readonly variables: exampleRoutes_ArtworkQueryVariables;
};



/*
query exampleRoutes_ArtworkQuery(
  $slug: String!
) {
  artwork(id: $slug) {
    id
    ...ExampleArtworkApp_artwork
  }
}

fragment ExampleArtworkApp_artwork on Artwork {
  title
  artistNames
  medium
  imageUrl
  date
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
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "exampleRoutes_ArtworkQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Artwork",
        "kind": "LinkedField",
        "name": "artwork",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "ExampleArtworkApp_artwork"
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
    "name": "exampleRoutes_ArtworkQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Artwork",
        "kind": "LinkedField",
        "name": "artwork",
        "plural": false,
        "selections": [
          (v2/*: any*/),
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
            "kind": "ScalarField",
            "name": "artistNames",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "medium",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "imageUrl",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "date",
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
    "name": "exampleRoutes_ArtworkQuery",
    "operationKind": "query",
    "text": "query exampleRoutes_ArtworkQuery(\n  $slug: String!\n) {\n  artwork(id: $slug) {\n    id\n    ...ExampleArtworkApp_artwork\n  }\n}\n\nfragment ExampleArtworkApp_artwork on Artwork {\n  title\n  artistNames\n  medium\n  imageUrl\n  date\n}\n"
  }
};
})();
(node as any).hash = 'da115c64db3be7296145b17049a36d41';
export default node;
