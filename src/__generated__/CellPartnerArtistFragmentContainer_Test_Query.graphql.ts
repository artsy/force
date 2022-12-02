/**
 * @generated SignedSource<<d2d8a4687a3c7ce02369ec815a3cdf42>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CellPartnerArtistFragmentContainer_Test_Query$variables = {};
export type CellPartnerArtistFragmentContainer_Test_Query$data = {
  readonly partner: {
    readonly artistsConnection: {
      readonly edges: ReadonlyArray<{
        readonly " $fragmentSpreads": FragmentRefs<"CellPartnerArtist_partnerArtist">;
      } | null> | null;
    } | null;
  } | null;
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
  "type": "Image"
},
v6 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "CroppedImageUrl"
},
v7 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "String"
},
v8 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "FormattedNumber"
},
v9 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
},
v10 = {
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
    "cacheID": "1b323a8de34df6b8cfcef024ddecfe03",
    "id": null,
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
        "partner.artistsConnection.edges.artist.avatar": (v5/*: any*/),
        "partner.artistsConnection.edges.artist.avatar.cropped": (v6/*: any*/),
        "partner.artistsConnection.edges.artist.avatar.cropped.src": (v7/*: any*/),
        "partner.artistsConnection.edges.artist.avatar.cropped.srcSet": (v7/*: any*/),
        "partner.artistsConnection.edges.artist.counts": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArtistCounts"
        },
        "partner.artistsConnection.edges.artist.counts.artworks": (v8/*: any*/),
        "partner.artistsConnection.edges.artist.counts.forSaleArtworks": (v8/*: any*/),
        "partner.artistsConnection.edges.artist.formattedNationalityAndBirthday": (v9/*: any*/),
        "partner.artistsConnection.edges.artist.href": (v9/*: any*/),
        "partner.artistsConnection.edges.artist.id": (v10/*: any*/),
        "partner.artistsConnection.edges.artist.initials": (v9/*: any*/),
        "partner.artistsConnection.edges.artist.internalID": (v10/*: any*/),
        "partner.artistsConnection.edges.artist.name": (v9/*: any*/),
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
        "partner.artistsConnection.edges.artworksConnection.edges.node": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Artwork"
        },
        "partner.artistsConnection.edges.artworksConnection.edges.node.id": (v10/*: any*/),
        "partner.artistsConnection.edges.artworksConnection.edges.node.image": (v5/*: any*/),
        "partner.artistsConnection.edges.artworksConnection.edges.node.image.cropped": (v6/*: any*/),
        "partner.artistsConnection.edges.artworksConnection.edges.node.image.cropped.src": (v7/*: any*/),
        "partner.artistsConnection.edges.artworksConnection.edges.node.image.cropped.srcSet": (v7/*: any*/),
        "partner.artistsConnection.edges.id": (v10/*: any*/),
        "partner.artistsConnection.edges.partner": (v4/*: any*/),
        "partner.artistsConnection.edges.partner.id": (v10/*: any*/),
        "partner.artistsConnection.edges.partner.slug": (v10/*: any*/),
        "partner.id": (v10/*: any*/)
      }
    },
    "name": "CellPartnerArtistFragmentContainer_Test_Query",
    "operationKind": "query",
    "text": "query CellPartnerArtistFragmentContainer_Test_Query {\n  partner(id: \"foo\") {\n    artistsConnection {\n      edges {\n        ...CellPartnerArtist_partnerArtist\n        id\n      }\n    }\n    id\n  }\n}\n\nfragment CellPartnerArtist_partnerArtist on ArtistPartnerEdge {\n  artworksConnection(first: 1) {\n    edges {\n      node {\n        image {\n          cropped(width: 445, height: 334, version: [\"larger\", \"large\"]) {\n            src\n            srcSet\n          }\n        }\n        id\n      }\n    }\n  }\n  artist {\n    ...EntityHeaderArtist_artist\n    internalID\n    slug\n    name\n    href\n    initials\n    id\n  }\n  partner {\n    slug\n    id\n  }\n}\n\nfragment EntityHeaderArtist_artist on Artist {\n  internalID\n  href\n  slug\n  name\n  initials\n  formattedNationalityAndBirthday\n  counts {\n    artworks\n    forSaleArtworks\n  }\n  avatar: image {\n    cropped(width: 45, height: 45) {\n      src\n      srcSet\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "9adc8330829375454583382fb8004261";

export default node;
