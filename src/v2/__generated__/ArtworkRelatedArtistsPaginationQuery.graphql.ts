/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArtworkRelatedArtistsPaginationQueryVariables = {
    count: number;
    cursor?: string | null;
    artworkID: string;
};
export type ArtworkRelatedArtistsPaginationQueryResponse = {
    readonly artwork: {
        readonly " $fragmentRefs": FragmentRefs<"ArtworkRelatedArtists_artwork">;
    } | null;
};
export type ArtworkRelatedArtistsPaginationQuery = {
    readonly response: ArtworkRelatedArtistsPaginationQueryResponse;
    readonly variables: ArtworkRelatedArtistsPaginationQueryVariables;
};



/*
query ArtworkRelatedArtistsPaginationQuery(
  $count: Int!
  $cursor: String
  $artworkID: String!
) {
  artwork(id: $artworkID) {
    ...ArtworkRelatedArtists_artwork_1G22uz
    id
  }
}

fragment ArtistCard_artist on Artist {
  name
  slug
  href
  image {
    cropped(width: 400, height: 300) {
      url
    }
  }
  formatted_nationality_and_birthday: formattedNationalityAndBirthday
  ...FollowArtistButton_artist
}

fragment ArtworkRelatedArtists_artwork_1G22uz on Artwork {
  slug
  artist {
    href
    related {
      artistsConnection(kind: MAIN, first: $count, after: $cursor) {
        pageInfo {
          hasNextPage
          endCursor
        }
        edges {
          node {
            ...ArtistCard_artist
            id
            __typename
          }
          cursor
        }
      }
    }
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
    "name": "count",
    "type": "Int!",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "cursor",
    "type": "String",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "artworkID",
    "type": "String!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "artworkID"
  }
],
v2 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "slug",
  "args": null,
  "storageKey": null
},
v3 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "href",
  "args": null,
  "storageKey": null
},
v4 = [
  {
    "kind": "Variable",
    "name": "after",
    "variableName": "cursor"
  },
  {
    "kind": "Variable",
    "name": "first",
    "variableName": "count"
  },
  {
    "kind": "Literal",
    "name": "kind",
    "value": "MAIN"
  }
],
v5 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "ArtworkRelatedArtistsPaginationQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "artwork",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "Artwork",
        "plural": false,
        "selections": [
          {
            "kind": "FragmentSpread",
            "name": "ArtworkRelatedArtists_artwork",
            "args": [
              {
                "kind": "Variable",
                "name": "count",
                "variableName": "count"
              },
              {
                "kind": "Variable",
                "name": "cursor",
                "variableName": "cursor"
              }
            ]
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "ArtworkRelatedArtistsPaginationQuery",
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "artwork",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "Artwork",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "artist",
            "storageKey": null,
            "args": null,
            "concreteType": "Artist",
            "plural": false,
            "selections": [
              (v3/*: any*/),
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "related",
                "storageKey": null,
                "args": null,
                "concreteType": "ArtistRelatedData",
                "plural": false,
                "selections": [
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "artistsConnection",
                    "storageKey": null,
                    "args": (v4/*: any*/),
                    "concreteType": "ArtistConnection",
                    "plural": false,
                    "selections": [
                      {
                        "kind": "LinkedField",
                        "alias": null,
                        "name": "pageInfo",
                        "storageKey": null,
                        "args": null,
                        "concreteType": "PageInfo",
                        "plural": false,
                        "selections": [
                          {
                            "kind": "ScalarField",
                            "alias": null,
                            "name": "hasNextPage",
                            "args": null,
                            "storageKey": null
                          },
                          {
                            "kind": "ScalarField",
                            "alias": null,
                            "name": "endCursor",
                            "args": null,
                            "storageKey": null
                          }
                        ]
                      },
                      {
                        "kind": "LinkedField",
                        "alias": null,
                        "name": "edges",
                        "storageKey": null,
                        "args": null,
                        "concreteType": "ArtistEdge",
                        "plural": true,
                        "selections": [
                          {
                            "kind": "LinkedField",
                            "alias": null,
                            "name": "node",
                            "storageKey": null,
                            "args": null,
                            "concreteType": "Artist",
                            "plural": false,
                            "selections": [
                              {
                                "kind": "ScalarField",
                                "alias": null,
                                "name": "name",
                                "args": null,
                                "storageKey": null
                              },
                              (v2/*: any*/),
                              (v3/*: any*/),
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
                                    "kind": "LinkedField",
                                    "alias": null,
                                    "name": "cropped",
                                    "storageKey": "cropped(height:300,width:400)",
                                    "args": [
                                      {
                                        "kind": "Literal",
                                        "name": "height",
                                        "value": 300
                                      },
                                      {
                                        "kind": "Literal",
                                        "name": "width",
                                        "value": 400
                                      }
                                    ],
                                    "concreteType": "CroppedImageUrl",
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
                                  }
                                ]
                              },
                              {
                                "kind": "ScalarField",
                                "alias": "formatted_nationality_and_birthday",
                                "name": "formattedNationalityAndBirthday",
                                "args": null,
                                "storageKey": null
                              },
                              (v5/*: any*/),
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
                              },
                              {
                                "kind": "ScalarField",
                                "alias": null,
                                "name": "__typename",
                                "args": null,
                                "storageKey": null
                              }
                            ]
                          },
                          {
                            "kind": "ScalarField",
                            "alias": null,
                            "name": "cursor",
                            "args": null,
                            "storageKey": null
                          }
                        ]
                      }
                    ]
                  },
                  {
                    "kind": "LinkedHandle",
                    "alias": null,
                    "name": "artistsConnection",
                    "args": (v4/*: any*/),
                    "handle": "connection",
                    "key": "ArtworkRelatedArtists_artistsConnection",
                    "filters": [
                      "kind"
                    ]
                  }
                ]
              },
              (v5/*: any*/)
            ]
          },
          (v5/*: any*/)
        ]
      }
    ]
  },
  "params": {
    "operationKind": "query",
    "name": "ArtworkRelatedArtistsPaginationQuery",
    "id": null,
    "text": "query ArtworkRelatedArtistsPaginationQuery(\n  $count: Int!\n  $cursor: String\n  $artworkID: String!\n) {\n  artwork(id: $artworkID) {\n    ...ArtworkRelatedArtists_artwork_1G22uz\n    id\n  }\n}\n\nfragment ArtistCard_artist on Artist {\n  name\n  slug\n  href\n  image {\n    cropped(width: 400, height: 300) {\n      url\n    }\n  }\n  formatted_nationality_and_birthday: formattedNationalityAndBirthday\n  ...FollowArtistButton_artist\n}\n\nfragment ArtworkRelatedArtists_artwork_1G22uz on Artwork {\n  slug\n  artist {\n    href\n    related {\n      artistsConnection(kind: MAIN, first: $count, after: $cursor) {\n        pageInfo {\n          hasNextPage\n          endCursor\n        }\n        edges {\n          node {\n            ...ArtistCard_artist\n            id\n            __typename\n          }\n          cursor\n        }\n      }\n    }\n    id\n  }\n}\n\nfragment FollowArtistButton_artist on Artist {\n  id\n  internalID\n  name\n  is_followed: isFollowed\n  counts {\n    follows\n  }\n}\n",
    "metadata": {}
  }
};
})();
(node as any).hash = '13d2fdc8bc0e1a6015918727e1fa807f';
export default node;
