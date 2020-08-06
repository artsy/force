/* tslint:disable */

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
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "PopularArtistsQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "highlights",
        "storageKey": null,
        "args": null,
        "concreteType": "Highlights",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": "popular_artists",
            "name": "popularArtists",
            "storageKey": "popularArtists(excludeFollowedArtists:true)",
            "args": (v0/*: any*/),
            "concreteType": "Artist",
            "plural": true,
            "selections": [
              {
                "kind": "FragmentSpread",
                "name": "PopularArtists_popular_artists",
                "args": null
              }
            ]
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "PopularArtistsQuery",
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "highlights",
        "storageKey": null,
        "args": null,
        "concreteType": "Highlights",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": "popular_artists",
            "name": "popularArtists",
            "storageKey": "popularArtists(excludeFollowedArtists:true)",
            "args": (v0/*: any*/),
            "concreteType": "Artist",
            "plural": true,
            "selections": [
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
                "name": "internalID",
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
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "cropped",
                    "storageKey": "cropped(height:100,width:100)",
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
              }
            ]
          }
        ]
      }
    ]
  },
  "params": {
    "operationKind": "query",
    "name": "PopularArtistsQuery",
    "id": null,
    "text": "query PopularArtistsQuery {\n  highlights {\n    popular_artists: popularArtists(excludeFollowedArtists: true) {\n      ...PopularArtists_popular_artists\n      id\n    }\n  }\n}\n\nfragment PopularArtists_popular_artists on Artist {\n  slug\n  internalID\n  id\n  name\n  image {\n    cropped(width: 100, height: 100) {\n      url\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
(node as any).hash = 'cbe0b4e03381b6e2672e9f842bfbd0d2';
export default node;
