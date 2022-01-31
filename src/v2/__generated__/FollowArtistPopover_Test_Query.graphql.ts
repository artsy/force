/**
 * @generated SignedSource<<e8ced3ff58b0c03ef2e6a6e9930cd968>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type FollowArtistPopover_Test_Query$variables = {
  artistID: string;
};
export type FollowArtistPopover_Test_Query$data = {
  readonly artist: {
    readonly " $fragmentSpreads": FragmentRefs<"FollowArtistPopover_artist">;
  } | null;
};
export type FollowArtistPopover_Test_Query$rawResponse = {
  readonly artist: {
    readonly related: {
      readonly suggestedConnection: {
        readonly edges: ReadonlyArray<{
          readonly node: {
            readonly id: string;
            readonly internalID: string;
            readonly name: string | null;
            readonly formattedNationalityAndBirthday: string | null;
            readonly image: {
              readonly cropped: {
                readonly url: string;
              } | null;
            } | null;
          } | null;
        } | null> | null;
      } | null;
    } | null;
    readonly id: string;
  } | null;
};
export type FollowArtistPopover_Test_Query = {
  variables: FollowArtistPopover_Test_Query$variables;
  response: FollowArtistPopover_Test_Query$data;
  rawResponse: FollowArtistPopover_Test_Query$rawResponse;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "artistID"
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
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Artist"
},
v4 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
},
v5 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
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
    "type": "Query",
    "abstractKey": null
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
    "cacheID": "02a44b171ccaae157487cd93f020d71d",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "artist": (v3/*: any*/),
        "artist.id": (v4/*: any*/),
        "artist.related": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArtistRelatedData"
        },
        "artist.related.suggestedConnection": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArtistConnection"
        },
        "artist.related.suggestedConnection.edges": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "ArtistEdge"
        },
        "artist.related.suggestedConnection.edges.node": (v3/*: any*/),
        "artist.related.suggestedConnection.edges.node.formattedNationalityAndBirthday": (v5/*: any*/),
        "artist.related.suggestedConnection.edges.node.id": (v4/*: any*/),
        "artist.related.suggestedConnection.edges.node.image": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Image"
        },
        "artist.related.suggestedConnection.edges.node.image.cropped": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "CroppedImageUrl"
        },
        "artist.related.suggestedConnection.edges.node.image.cropped.url": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "String"
        },
        "artist.related.suggestedConnection.edges.node.internalID": (v4/*: any*/),
        "artist.related.suggestedConnection.edges.node.name": (v5/*: any*/)
      }
    },
    "name": "FollowArtistPopover_Test_Query",
    "operationKind": "query",
    "text": "query FollowArtistPopover_Test_Query(\n  $artistID: String!\n) {\n  artist(id: $artistID) {\n    ...FollowArtistPopover_artist\n    id\n  }\n}\n\nfragment FollowArtistPopoverRow_artist on Artist {\n  internalID\n  name\n  formattedNationalityAndBirthday\n  image {\n    cropped(width: 45, height: 45) {\n      url\n    }\n  }\n}\n\nfragment FollowArtistPopover_artist on Artist {\n  related {\n    suggestedConnection(first: 3, excludeFollowedArtists: true) {\n      edges {\n        node {\n          id\n          internalID\n          ...FollowArtistPopoverRow_artist\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "70db3c337bc950f984734cba24990a60";

export default node;
