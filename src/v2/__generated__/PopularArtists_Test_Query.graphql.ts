/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type PopularArtists_Test_QueryVariables = {};
export type PopularArtists_Test_QueryResponse = {
    readonly highlights: {
        readonly popular_artists: ReadonlyArray<{
            readonly " $fragmentRefs": FragmentRefs<"PopularArtists_popular_artists">;
        } | null> | null;
    } | null;
};
export type PopularArtists_Test_Query = {
    readonly response: PopularArtists_Test_QueryResponse;
    readonly variables: PopularArtists_Test_QueryVariables;
};



/*
query PopularArtists_Test_Query {
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
],
v1 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "PopularArtists_Test_Query",
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
    "name": "PopularArtists_Test_Query",
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
    "cacheID": "8a67856d2ac5c3c976471b862cdafef1",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "highlights": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Highlights"
        },
        "highlights.popular_artists": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "Artist"
        },
        "highlights.popular_artists.id": (v1/*: any*/),
        "highlights.popular_artists.image": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Image"
        },
        "highlights.popular_artists.image.cropped": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "CroppedImageUrl"
        },
        "highlights.popular_artists.image.cropped.url": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "String"
        },
        "highlights.popular_artists.internalID": (v1/*: any*/),
        "highlights.popular_artists.name": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "String"
        },
        "highlights.popular_artists.slug": (v1/*: any*/)
      }
    },
    "name": "PopularArtists_Test_Query",
    "operationKind": "query",
    "text": "query PopularArtists_Test_Query {\n  highlights {\n    popular_artists: popularArtists(excludeFollowedArtists: true) {\n      ...PopularArtists_popular_artists\n      id\n    }\n  }\n}\n\nfragment PopularArtists_popular_artists on Artist {\n  slug\n  internalID\n  id\n  name\n  image {\n    cropped(width: 100, height: 100) {\n      url\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '0b9ed094ef8d045e39741250da915e19';
export default node;
