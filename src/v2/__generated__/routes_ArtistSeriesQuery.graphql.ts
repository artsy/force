/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type routes_ArtistSeriesQueryVariables = {
    slug: string;
};
export type routes_ArtistSeriesQueryResponse = {
    readonly artistSeries: {
        readonly " $fragmentRefs": FragmentRefs<"ArtistSeriesApp_artistSeries">;
    } | null;
};
export type routes_ArtistSeriesQuery = {
    readonly response: routes_ArtistSeriesQueryResponse;
    readonly variables: routes_ArtistSeriesQueryVariables;
};



/*
query routes_ArtistSeriesQuery(
  $slug: ID!
) {
  artistSeries(id: $slug) {
    ...ArtistSeriesApp_artistSeries
  }
}

fragment ArtistSeriesApp_artistSeries on ArtistSeries {
  ...ArtistSeriesHeader_artistSeries
}

fragment ArtistSeriesHeader_artistSeries on ArtistSeries {
  title
  description
  artists(size: 1) {
    name
    image {
      url
    }
    href
    slug
    ...FollowArtistButton_artist
    id
  }
}

fragment FollowArtistButton_artist on Artist {
  id
  internalID
  name
  is_followed: isFollowed
  counts {
    follows
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "slug",
    "type": "ID!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "slug"
  }
];
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "routes_ArtistSeriesQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "artistSeries",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "ArtistSeries",
        "plural": false,
        "selections": [
          {
            "kind": "FragmentSpread",
            "name": "ArtistSeriesApp_artistSeries",
            "args": null
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "routes_ArtistSeriesQuery",
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "artistSeries",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "ArtistSeries",
        "plural": false,
        "selections": [
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "title",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "description",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "artists",
            "storageKey": "artists(size:1)",
            "args": [
              {
                "kind": "Literal",
                "name": "size",
                "value": 1
              }
            ],
            "concreteType": "Artist",
            "plural": true,
            "selections": [
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "name",
                "args": null,
                "storageKey": null
              },
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "image",
                "storageKey": null,
                "args": null,
                "concreteType": "Image",
                "plural": false,
                "selections": [
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "url",
                    "args": null,
                    "storageKey": null
                  }
                ]
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "href",
                "args": null,
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "slug",
                "args": null,
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "id",
                "args": null,
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "internalID",
                "args": null,
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": "is_followed",
                "name": "isFollowed",
                "args": null,
                "storageKey": null
              },
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "counts",
                "storageKey": null,
                "args": null,
                "concreteType": "ArtistCounts",
                "plural": false,
                "selections": [
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "follows",
                    "args": null,
                    "storageKey": null
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  "params": {
    "operationKind": "query",
    "name": "routes_ArtistSeriesQuery",
    "id": null,
    "text": "query routes_ArtistSeriesQuery(\n  $slug: ID!\n) {\n  artistSeries(id: $slug) {\n    ...ArtistSeriesApp_artistSeries\n  }\n}\n\nfragment ArtistSeriesApp_artistSeries on ArtistSeries {\n  ...ArtistSeriesHeader_artistSeries\n}\n\nfragment ArtistSeriesHeader_artistSeries on ArtistSeries {\n  title\n  description\n  artists(size: 1) {\n    name\n    image {\n      url\n    }\n    href\n    slug\n    ...FollowArtistButton_artist\n    id\n  }\n}\n\nfragment FollowArtistButton_artist on Artist {\n  id\n  internalID\n  name\n  is_followed: isFollowed\n  counts {\n    follows\n  }\n}\n",
    "metadata": {}
  }
};
})();
(node as any).hash = '3e46b82bc00c38774bff9d41bbbe1c2c';
export default node;
