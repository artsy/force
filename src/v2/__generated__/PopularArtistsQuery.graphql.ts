/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type PopularArtistsQueryVariables = {};
export type PopularArtistsQueryResponse = {
    readonly highlights: {
        readonly popular_artists: ReadonlyArray<{
            readonly " $fragmentRefs": FragmentRefs<"PopularArtists_popular_artists">;
        } | null> | null;
    } | null;
};
export type PopularArtistsQuery = {
    readonly response: PopularArtistsQueryResponse;
    readonly variables: PopularArtistsQueryVariables;
};



/*
query PopularArtistsQuery {
  highlights {
    popular_artists: popularArtists(excludeFollowedArtists: true) {
      ...PopularArtists_popular_artists
      id
    }
  }
}

fragment PopularArtists_popular_artists on Artist {
  slug
  internalID
  id
  name
  image {
    cropped(width: 100, height: 100) {
      url
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "excludeFollowedArtists",
    "value": true
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "PopularArtistsQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Highlights",
        "kind": "LinkedField",
        "name": "highlights",
        "plural": false,
        "selections": [
          {
            "alias": "popular_artists",
            "args": (v0/*: any*/),
            "concreteType": "Artist",
            "kind": "LinkedField",
            "name": "popularArtists",
            "plural": true,
            "selections": [
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "PopularArtists_popular_artists"
              }
            ],
            "storageKey": "popularArtists(excludeFollowedArtists:true)"
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
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "PopularArtistsQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Highlights",
        "kind": "LinkedField",
        "name": "highlights",
        "plural": false,
        "selections": [
          {
            "alias": "popular_artists",
            "args": (v0/*: any*/),
            "concreteType": "Artist",
            "kind": "LinkedField",
            "name": "popularArtists",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "slug",
                "storageKey": null
              },
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
                "name": "id",
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
                        "value": 100
                      },
                      {
                        "kind": "Literal",
                        "name": "width",
                        "value": 100
                      }
                    ],
                    "concreteType": "CroppedImageUrl",
                    "kind": "LinkedField",
                    "name": "cropped",
                    "plural": false,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "url",
                        "storageKey": null
                      }
                    ],
                    "storageKey": "cropped(height:100,width:100)"
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": "popularArtists(excludeFollowedArtists:true)"
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "7f9109304527935bedf3529e8c6d6b77",
    "id": null,
    "metadata": {},
    "name": "PopularArtistsQuery",
    "operationKind": "query",
    "text": "query PopularArtistsQuery {\n  highlights {\n    popular_artists: popularArtists(excludeFollowedArtists: true) {\n      ...PopularArtists_popular_artists\n      id\n    }\n  }\n}\n\nfragment PopularArtists_popular_artists on Artist {\n  slug\n  internalID\n  id\n  name\n  image {\n    cropped(width: 100, height: 100) {\n      url\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = 'cbe0b4e03381b6e2672e9f842bfbd0d2';
export default node;
