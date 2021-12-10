/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArtistCurrentShowsRail_Test_QueryVariables = {};
export type ArtistCurrentShowsRail_Test_QueryResponse = {
    readonly artist: {
        readonly " $fragmentRefs": FragmentRefs<"ArtistCurrentShowsRail_artist">;
    } | null;
};
export type ArtistCurrentShowsRail_Test_Query = {
    readonly response: ArtistCurrentShowsRail_Test_QueryResponse;
    readonly variables: ArtistCurrentShowsRail_Test_QueryVariables;
};



/*
query ArtistCurrentShowsRail_Test_Query {
  artist(id: "test") {
    ...ArtistCurrentShowsRail_artist
    id
  }
}

fragment ArtistCurrentShowsRail_artist on Artist {
  internalID
  name
  slug
  showsConnection(first: 5, sort: END_AT_ASC, status: "running") {
    edges {
      node {
        coverImage {
          cropped(width: 325, height: 230) {
            width
            height
            srcSet
            src
          }
        }
        exhibitionPeriod
        href
        internalID
        name
        slug
        id
      }
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "test"
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "slug",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v5 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
},
v6 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
},
v7 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "Int"
},
v8 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "String"
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "ArtistCurrentShowsRail_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "Artist",
        "kind": "LinkedField",
        "name": "artist",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "ArtistCurrentShowsRail_artist"
          }
        ],
        "storageKey": "artist(id:\"test\")"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "ArtistCurrentShowsRail_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "Artist",
        "kind": "LinkedField",
        "name": "artist",
        "plural": false,
        "selections": [
          (v1/*: any*/),
          (v2/*: any*/),
          (v3/*: any*/),
          {
            "alias": null,
            "args": [
              {
                "kind": "Literal",
                "name": "first",
                "value": 5
              },
              {
                "kind": "Literal",
                "name": "sort",
                "value": "END_AT_ASC"
              },
              {
                "kind": "Literal",
                "name": "status",
                "value": "running"
              }
            ],
            "concreteType": "ShowConnection",
            "kind": "LinkedField",
            "name": "showsConnection",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "ShowEdge",
                "kind": "LinkedField",
                "name": "edges",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Show",
                    "kind": "LinkedField",
                    "name": "node",
                    "plural": false,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Image",
                        "kind": "LinkedField",
                        "name": "coverImage",
                        "plural": false,
                        "selections": [
                          {
                            "alias": null,
                            "args": [
                              {
                                "kind": "Literal",
                                "name": "height",
                                "value": 230
                              },
                              {
                                "kind": "Literal",
                                "name": "width",
                                "value": 325
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
                                "name": "width",
                                "storageKey": null
                              },
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "height",
                                "storageKey": null
                              },
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "srcSet",
                                "storageKey": null
                              },
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "src",
                                "storageKey": null
                              }
                            ],
                            "storageKey": "cropped(height:230,width:325)"
                          }
                        ],
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "exhibitionPeriod",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "href",
                        "storageKey": null
                      },
                      (v1/*: any*/),
                      (v2/*: any*/),
                      (v3/*: any*/),
                      (v4/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": "showsConnection(first:5,sort:\"END_AT_ASC\",status:\"running\")"
          },
          (v4/*: any*/)
        ],
        "storageKey": "artist(id:\"test\")"
      }
    ]
  },
  "params": {
    "cacheID": "7f643ecb55a9310a0bff55861380137c",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "artist": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Artist"
        },
        "artist.id": (v5/*: any*/),
        "artist.internalID": (v5/*: any*/),
        "artist.name": (v6/*: any*/),
        "artist.showsConnection": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ShowConnection"
        },
        "artist.showsConnection.edges": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "ShowEdge"
        },
        "artist.showsConnection.edges.node": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Show"
        },
        "artist.showsConnection.edges.node.coverImage": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Image"
        },
        "artist.showsConnection.edges.node.coverImage.cropped": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "CroppedImageUrl"
        },
        "artist.showsConnection.edges.node.coverImage.cropped.height": (v7/*: any*/),
        "artist.showsConnection.edges.node.coverImage.cropped.src": (v8/*: any*/),
        "artist.showsConnection.edges.node.coverImage.cropped.srcSet": (v8/*: any*/),
        "artist.showsConnection.edges.node.coverImage.cropped.width": (v7/*: any*/),
        "artist.showsConnection.edges.node.exhibitionPeriod": (v6/*: any*/),
        "artist.showsConnection.edges.node.href": (v6/*: any*/),
        "artist.showsConnection.edges.node.id": (v5/*: any*/),
        "artist.showsConnection.edges.node.internalID": (v5/*: any*/),
        "artist.showsConnection.edges.node.name": (v6/*: any*/),
        "artist.showsConnection.edges.node.slug": (v5/*: any*/),
        "artist.slug": (v5/*: any*/)
      }
    },
    "name": "ArtistCurrentShowsRail_Test_Query",
    "operationKind": "query",
    "text": "query ArtistCurrentShowsRail_Test_Query {\n  artist(id: \"test\") {\n    ...ArtistCurrentShowsRail_artist\n    id\n  }\n}\n\nfragment ArtistCurrentShowsRail_artist on Artist {\n  internalID\n  name\n  slug\n  showsConnection(first: 5, sort: END_AT_ASC, status: \"running\") {\n    edges {\n      node {\n        coverImage {\n          cropped(width: 325, height: 230) {\n            width\n            height\n            srcSet\n            src\n          }\n        }\n        exhibitionPeriod\n        href\n        internalID\n        name\n        slug\n        id\n      }\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '71aa6c6728c5b37aa5e6ddcf67e50900';
export default node;
