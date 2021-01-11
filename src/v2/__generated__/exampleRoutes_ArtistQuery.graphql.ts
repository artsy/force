/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type exampleRoutes_ArtistQueryVariables = {
    slug: string;
};
export type exampleRoutes_ArtistQueryResponse = {
    readonly artist: {
        readonly id: string;
        readonly " $fragmentRefs": FragmentRefs<"ExampleArtistApp_artist">;
    } | null;
};
export type exampleRoutes_ArtistQuery = {
    readonly response: exampleRoutes_ArtistQueryResponse;
    readonly variables: exampleRoutes_ArtistQueryVariables;
};



/*
query exampleRoutes_ArtistQuery(
  $slug: String!
) {
  artist(id: $slug) @principalField {
    id
    ...ExampleArtistApp_artist
  }
}

fragment ExampleArtistApp_artist on Artist {
  name
  bio
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
    "name": "exampleRoutes_ArtistQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Artist",
        "kind": "LinkedField",
        "name": "artist",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "ExampleArtistApp_artist"
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
    "name": "exampleRoutes_ArtistQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Artist",
        "kind": "LinkedField",
        "name": "artist",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "name",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "bio",
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
    "name": "exampleRoutes_ArtistQuery",
    "operationKind": "query",
    "text": "query exampleRoutes_ArtistQuery(\n  $slug: String!\n) {\n  artist(id: $slug) @principalField {\n    id\n    ...ExampleArtistApp_artist\n  }\n}\n\nfragment ExampleArtistApp_artist on Artist {\n  name\n  bio\n}\n"
  }
};
})();
(node as any).hash = '84fb1c95d07f623f0ae2b2c99b19265f';
export default node;
