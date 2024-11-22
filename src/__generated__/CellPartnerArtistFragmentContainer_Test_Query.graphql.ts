/**
 * @generated SignedSource<<6d5c607b1bf7ef2497c3bb125c9ba742>>
 * @relayHash 7806f9147dd6437d77aa143d20a9d623
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 7806f9147dd6437d77aa143d20a9d623

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CellPartnerArtistFragmentContainer_Test_Query$variables = Record<PropertyKey, never>;
export type CellPartnerArtistFragmentContainer_Test_Query$data = {
  readonly partner: {
    readonly artistsConnection: {
      readonly edges: ReadonlyArray<{
        readonly " $fragmentSpreads": FragmentRefs<"CellPartnerArtist_partnerArtist">;
      } | null | undefined> | null | undefined;
    } | null | undefined;
  } | null | undefined;
};
export type CellPartnerArtistFragmentContainer_Test_Query = {
  response: CellPartnerArtistFragmentContainer_Test_Query$data;
  variables: CellPartnerArtistFragmentContainer_Test_Query$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "foo"
  }
],
v1 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "src",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "srcSet",
    "storageKey": null
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
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "slug",
  "storageKey": null
},
v4 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Partner"
},
v5 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "FormattedNumber"
},
v6 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Artwork"
},
v7 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Image"
},
v8 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "CroppedImageUrl"
},
v9 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "String"
},
v10 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
},
v11 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "CellPartnerArtistFragmentContainer_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "Partner",
        "kind": "LinkedField",
        "name": "partner",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "ArtistPartnerConnection",
            "kind": "LinkedField",
            "name": "artistsConnection",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "ArtistPartnerEdge",
                "kind": "LinkedField",
                "name": "edges",
                "plural": true,
                "selections": [
                  {
                    "args": null,
                    "kind": "FragmentSpread",
                    "name": "CellPartnerArtist_partnerArtist"
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": "partner(id:\"foo\")"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "CellPartnerArtistFragmentContainer_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "Partner",
        "kind": "LinkedField",
        "name": "partner",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "ArtistPartnerConnection",
            "kind": "LinkedField",
            "name": "artistsConnection",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "ArtistPartnerEdge",
                "kind": "LinkedField",
                "name": "edges",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": [
                      {
                        "kind": "Literal",
                        "name": "first",
                        "value": 1
                      }
                    ],
                    "concreteType": "ArtworkConnection",
                    "kind": "LinkedField",
                    "name": "artworksConnection",
                    "plural": false,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "ArtworkEdge",
                        "kind": "LinkedField",
                        "name": "edges",
                        "plural": true,
                        "selections": [
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "Artwork",
                            "kind": "LinkedField",
                            "name": "node",
                            "plural": false,
                            "selections": [
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
                                        "value": 334
                                      },
                                      {
                                        "kind": "Literal",
                                        "name": "version",
                                        "value": [
                                          "larger",
                                          "large"
                                        ]
                                      },
                                      {
                                        "kind": "Literal",
                                        "name": "width",
                                        "value": 445
                                      }
                                    ],
                                    "concreteType": "CroppedImageUrl",
                                    "kind": "LinkedField",
                                    "name": "cropped",
                                    "plural": false,
                                    "selections": (v1/*: any*/),
                                    "storageKey": "cropped(height:334,version:[\"larger\",\"large\"],width:445)"
                                  }
                                ],
                                "storageKey": null
                              },
                              (v2/*: any*/)
                            ],
                            "storageKey": null
                          }
                        ],
                        "storageKey": null
                      }
                    ],
                    "storageKey": "artworksConnection(first:1)"
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Artist",
                    "kind": "LinkedField",
                    "name": "artist",
                    "plural": false,
                    "selections": [
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
                        "name": "href",
                        "storageKey": null
                      },
                      (v3/*: any*/),
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
                        "name": "initials",
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
                        "concreteType": "ArtistCounts",
                        "kind": "LinkedField",
                        "name": "counts",
                        "plural": false,
                        "selections": [
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "artworks",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "forSaleArtworks",
                            "storageKey": null
                          }
                        ],
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Artwork",
                        "kind": "LinkedField",
                        "name": "coverArtwork",
                        "plural": false,
                        "selections": [
                          {
                            "alias": "avatar",
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
                                "selections": (v1/*: any*/),
                                "storageKey": "cropped(height:45,width:45)"
                              }
                            ],
                            "storageKey": null
                          },
                          (v2/*: any*/)
                        ],
                        "storageKey": null
                      },
                      (v2/*: any*/)
                    ],
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Partner",
                    "kind": "LinkedField",
                    "name": "partner",
                    "plural": false,
                    "selections": [
                      (v3/*: any*/),
                      (v2/*: any*/)
                    ],
                    "storageKey": null
                  },
                  (v2/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          (v2/*: any*/)
        ],
        "storageKey": "partner(id:\"foo\")"
      }
    ]
  },
  "params": {
    "id": "7806f9147dd6437d77aa143d20a9d623",
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "partner": (v4/*: any*/),
        "partner.artistsConnection": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArtistPartnerConnection"
        },
        "partner.artistsConnection.edges": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "ArtistPartnerEdge"
        },
        "partner.artistsConnection.edges.artist": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Artist"
        },
        "partner.artistsConnection.edges.artist.counts": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArtistCounts"
        },
        "partner.artistsConnection.edges.artist.counts.artworks": (v5/*: any*/),
        "partner.artistsConnection.edges.artist.counts.forSaleArtworks": (v5/*: any*/),
        "partner.artistsConnection.edges.artist.coverArtwork": (v6/*: any*/),
        "partner.artistsConnection.edges.artist.coverArtwork.avatar": (v7/*: any*/),
        "partner.artistsConnection.edges.artist.coverArtwork.avatar.cropped": (v8/*: any*/),
        "partner.artistsConnection.edges.artist.coverArtwork.avatar.cropped.src": (v9/*: any*/),
        "partner.artistsConnection.edges.artist.coverArtwork.avatar.cropped.srcSet": (v9/*: any*/),
        "partner.artistsConnection.edges.artist.coverArtwork.id": (v10/*: any*/),
        "partner.artistsConnection.edges.artist.formattedNationalityAndBirthday": (v11/*: any*/),
        "partner.artistsConnection.edges.artist.href": (v11/*: any*/),
        "partner.artistsConnection.edges.artist.id": (v10/*: any*/),
        "partner.artistsConnection.edges.artist.initials": (v11/*: any*/),
        "partner.artistsConnection.edges.artist.internalID": (v10/*: any*/),
        "partner.artistsConnection.edges.artist.name": (v11/*: any*/),
        "partner.artistsConnection.edges.artist.slug": (v10/*: any*/),
        "partner.artistsConnection.edges.artworksConnection": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArtworkConnection"
        },
        "partner.artistsConnection.edges.artworksConnection.edges": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "ArtworkEdge"
        },
        "partner.artistsConnection.edges.artworksConnection.edges.node": (v6/*: any*/),
        "partner.artistsConnection.edges.artworksConnection.edges.node.id": (v10/*: any*/),
        "partner.artistsConnection.edges.artworksConnection.edges.node.image": (v7/*: any*/),
        "partner.artistsConnection.edges.artworksConnection.edges.node.image.cropped": (v8/*: any*/),
        "partner.artistsConnection.edges.artworksConnection.edges.node.image.cropped.src": (v9/*: any*/),
        "partner.artistsConnection.edges.artworksConnection.edges.node.image.cropped.srcSet": (v9/*: any*/),
        "partner.artistsConnection.edges.id": (v10/*: any*/),
        "partner.artistsConnection.edges.partner": (v4/*: any*/),
        "partner.artistsConnection.edges.partner.id": (v10/*: any*/),
        "partner.artistsConnection.edges.partner.slug": (v10/*: any*/),
        "partner.id": (v10/*: any*/)
      }
    },
    "name": "CellPartnerArtistFragmentContainer_Test_Query",
    "operationKind": "query",
    "text": null
  }
};
})();

(node as any).hash = "9adc8330829375454583382fb8004261";

export default node;
