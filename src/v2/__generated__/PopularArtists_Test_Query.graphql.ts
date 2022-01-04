/* tslint:disable */
/* eslint-disable */

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
  "type": "ID",
  "enumValues": null,
  "plural": false,
  "nullable": false
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
    "type": "Query"
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
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "highlights": {
          "type": "Highlights",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "highlights.popular_artists": {
          "type": "Artist",
          "enumValues": null,
          "plural": true,
          "nullable": true
        },
        "highlights.popular_artists.id": (v1/*: any*/),
        "highlights.popular_artists.slug": (v1/*: any*/),
        "highlights.popular_artists.internalID": (v1/*: any*/),
        "highlights.popular_artists.name": {
          "type": "String",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "highlights.popular_artists.image": {
          "type": "Image",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "highlights.popular_artists.image.cropped": {
          "type": "CroppedImageUrl",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "highlights.popular_artists.image.cropped.url": {
          "type": "String",
          "enumValues": null,
          "plural": false,
          "nullable": false
        }
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
