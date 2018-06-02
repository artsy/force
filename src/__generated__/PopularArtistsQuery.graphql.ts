/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
export type PopularArtistsQueryVariables = {
};
export type PopularArtistsQueryResponse = {
    readonly popular_artists: ({
    }) | null;
};



/*
query PopularArtistsQuery {
  popular_artists(exclude_followed_artists: true) {
    ...PopularArtistsContent_popular_artists
  }
}

fragment PopularArtistsContent_popular_artists on PopularArtists {
  artists {
    id
    _id
    __id
    name
    image {
      cropped(width: 100, height: 100) {
        url
      }
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "exclude_followed_artists",
    "value": true,
    "type": "Boolean"
  }
];
return {
  "kind": "Request",
  "operationKind": "query",
  "name": "PopularArtistsQuery",
  "id": null,
  "text": "query PopularArtistsQuery {\n  popular_artists(exclude_followed_artists: true) {\n    ...PopularArtistsContent_popular_artists\n  }\n}\n\nfragment PopularArtistsContent_popular_artists on PopularArtists {\n  artists {\n    id\n    _id\n    __id\n    name\n    image {\n      cropped(width: 100, height: 100) {\n        url\n      }\n    }\n  }\n}\n",
  "metadata": {},
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
        "name": "popular_artists",
        "storageKey": "popular_artists(exclude_followed_artists:true)",
        "args": v0,
        "concreteType": "PopularArtists",
        "plural": false,
        "selections": [
          {
            "kind": "FragmentSpread",
            "name": "PopularArtistsContent_popular_artists",
            "args": null
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
        "name": "popular_artists",
        "storageKey": "popular_artists(exclude_followed_artists:true)",
        "args": v0,
        "concreteType": "PopularArtists",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "artists",
            "storageKey": null,
            "args": null,
            "concreteType": "Artist",
            "plural": true,
            "selections": [
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
                "name": "_id",
                "args": null,
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "__id",
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
                        "value": 100,
                        "type": "Int!"
                      },
                      {
                        "kind": "Literal",
                        "name": "width",
                        "value": 100,
                        "type": "Int!"
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
  }
};
})();
(node as any).hash = '6d83082e5c6129f5dfcdf118bb6f5462';
export default node;
