/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type FollowArtistPopover_Test_QueryVariables = {
    artistID: string;
};
export type FollowArtistPopover_Test_QueryResponse = {
    readonly artist: {
        readonly " $fragmentRefs": FragmentRefs<"FollowArtistPopover_artist">;
    } | null;
};
export type FollowArtistPopover_Test_QueryRawResponse = {
    readonly artist: ({
        readonly related: ({
            readonly suggestedConnection: ({
                readonly edges: ReadonlyArray<({
                    readonly node: ({
                        readonly id: string;
                        readonly internalID: string;
                        readonly name: string | null;
                        readonly formattedNationalityAndBirthday: string | null;
                        readonly image: ({
                            readonly cropped: ({
                                readonly url: string;
                            }) | null;
                        }) | null;
                    }) | null;
                }) | null> | null;
            }) | null;
        }) | null;
        readonly id: string | null;
    }) | null;
};
export type FollowArtistPopover_Test_Query = {
    readonly response: FollowArtistPopover_Test_QueryResponse;
    readonly variables: FollowArtistPopover_Test_QueryVariables;
    readonly rawResponse: FollowArtistPopover_Test_QueryRawResponse;
};



/*
query FollowArtistPopover_Test_Query(
  $artistID: String!
) {
  artist(id: $artistID) {
    ...FollowArtistPopover_artist
    id
  }
}

fragment FollowArtistPopoverRow_artist on Artist {
  internalID
  name
  formattedNationalityAndBirthday
  image {
    cropped(width: 45, height: 45) {
      url
    }
  }
}

fragment FollowArtistPopover_artist on Artist {
  related {
    suggestedConnection(first: 3, excludeFollowedArtists: true) {
      edges {
        node {
          id
          internalID
          ...FollowArtistPopoverRow_artist
        }
      }
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "artistID",
    "type": "String!"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "artistID"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v3 = {
  "type": "Artist",
  "enumValues": null,
  "plural": false,
  "nullable": true
},
v4 = {
  "type": "ID",
  "enumValues": null,
  "plural": false,
  "nullable": false
},
v5 = {
  "type": "String",
  "enumValues": null,
  "plural": false,
  "nullable": true
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "FollowArtistPopover_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Artist",
        "kind": "LinkedField",
        "name": "artist",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "FollowArtistPopover_artist"
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
    "name": "FollowArtistPopover_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Artist",
        "kind": "LinkedField",
        "name": "artist",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "ArtistRelatedData",
            "kind": "LinkedField",
            "name": "related",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": [
                  {
                    "kind": "Literal",
                    "name": "excludeFollowedArtists",
                    "value": true
                  },
                  {
                    "kind": "Literal",
                    "name": "first",
                    "value": 3
                  }
                ],
                "concreteType": "ArtistConnection",
                "kind": "LinkedField",
                "name": "suggestedConnection",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "ArtistEdge",
                    "kind": "LinkedField",
                    "name": "edges",
                    "plural": true,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Artist",
                        "kind": "LinkedField",
                        "name": "node",
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
                            "name": "formattedNationalityAndBirthday",
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
                                    "value": 45
                                  },
                                  {
                                    "kind": "Literal",
                                    "name": "width",
                                    "value": 45
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
                                "storageKey": "cropped(height:45,width:45)"
                              }
                            ],
                            "storageKey": null
                          }
                        ],
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": "suggestedConnection(excludeFollowedArtists:true,first:3)"
              }
            ],
            "storageKey": null
          },
          (v2/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "artist": (v3/*: any*/),
        "artist.id": {
          "type": "ID",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "artist.related": {
          "type": "ArtistRelatedData",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "artist.related.suggestedConnection": {
          "type": "ArtistConnection",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "artist.related.suggestedConnection.edges": {
          "type": "ArtistEdge",
          "enumValues": null,
          "plural": true,
          "nullable": true
        },
        "artist.related.suggestedConnection.edges.node": (v3/*: any*/),
        "artist.related.suggestedConnection.edges.node.id": (v4/*: any*/),
        "artist.related.suggestedConnection.edges.node.internalID": (v4/*: any*/),
        "artist.related.suggestedConnection.edges.node.name": (v5/*: any*/),
        "artist.related.suggestedConnection.edges.node.formattedNationalityAndBirthday": (v5/*: any*/),
        "artist.related.suggestedConnection.edges.node.image": {
          "type": "Image",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "artist.related.suggestedConnection.edges.node.image.cropped": {
          "type": "CroppedImageUrl",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "artist.related.suggestedConnection.edges.node.image.cropped.url": {
          "type": "String",
          "enumValues": null,
          "plural": false,
          "nullable": false
        }
      }
    },
    "name": "FollowArtistPopover_Test_Query",
    "operationKind": "query",
    "text": "query FollowArtistPopover_Test_Query(\n  $artistID: String!\n) {\n  artist(id: $artistID) {\n    ...FollowArtistPopover_artist\n    id\n  }\n}\n\nfragment FollowArtistPopoverRow_artist on Artist {\n  internalID\n  name\n  formattedNationalityAndBirthday\n  image {\n    cropped(width: 45, height: 45) {\n      url\n    }\n  }\n}\n\nfragment FollowArtistPopover_artist on Artist {\n  related {\n    suggestedConnection(first: 3, excludeFollowedArtists: true) {\n      edges {\n        node {\n          id\n          internalID\n          ...FollowArtistPopoverRow_artist\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '70db3c337bc950f984734cba24990a60';
export default node;
