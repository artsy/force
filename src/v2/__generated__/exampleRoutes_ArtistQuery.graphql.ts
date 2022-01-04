/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type exampleRoutes_ArtistQueryVariables = {
    slug: string;
};
export type exampleRoutes_ArtistQueryResponse = {
    readonly artist: {
        readonly id: string;
        readonly " $fragmentRefs": FragmentRefs<"ExampleArtistRoute_artist">;
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
    ...ExampleArtistRoute_artist
  }
}

fragment ExampleArtistRoute_artist on Artist {
  ...FollowArtistButton_artist
  name
  bio
  internalID
  slug
}

fragment FollowArtistButton_artist on Artist {
  id
  internalID
  name
  slug
  is_followed: isFollowed
  counts {
    follows
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
            "name": "ExampleArtistRoute_artist"
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
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
            "args": null,
            "kind": "ScalarField",
            "name": "slug",
            "storageKey": null
          },
          {
            "alias": "is_followed",
            "args": null,
            "kind": "ScalarField",
            "name": "isFollowed",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "ArtistCounts",
            "kind": "LinkedField",
            "name": "counts",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "follows",
                "storageKey": null
              }
            ],
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
    "cacheID": "a31a791b95ddb0601d1bf4417b158aef",
    "id": null,
    "metadata": {},
    "name": "exampleRoutes_ArtistQuery",
    "operationKind": "query",
    "text": "query exampleRoutes_ArtistQuery(\n  $slug: String!\n) {\n  artist(id: $slug) @principalField {\n    id\n    ...ExampleArtistRoute_artist\n  }\n}\n\nfragment ExampleArtistRoute_artist on Artist {\n  ...FollowArtistButton_artist\n  name\n  bio\n  internalID\n  slug\n}\n\nfragment FollowArtistButton_artist on Artist {\n  id\n  internalID\n  name\n  slug\n  is_followed: isFollowed\n  counts {\n    follows\n  }\n}\n"
  }
};
})();
(node as any).hash = 'f240123309eb71f60ebf184aef275d94';
export default node;
