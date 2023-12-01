/**
 * @generated SignedSource<<53008fbf9bea5d02c788caa51a22ee26>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtistRelatedArtistsRailQuery$variables = {
  slug: string;
};
export type ArtistRelatedArtistsRailQuery$data = {
  readonly artist: {
    readonly " $fragmentSpreads": FragmentRefs<"ArtistRelatedArtistsRail_artist">;
  } | null | undefined;
};
export type ArtistRelatedArtistsRailQuery = {
  response: ArtistRelatedArtistsRailQuery$data;
  variables: ArtistRelatedArtistsRailQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "slug"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "slug"
  }
],
v2 = [
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
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "ArtistRelatedArtistsRailQuery",
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
            "name": "ArtistRelatedArtistsRail_artist"
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
    "name": "ArtistRelatedArtistsRailQuery",
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
                    "name": "first",
                    "value": 12
                  },
                  {
                    "kind": "Literal",
                    "name": "kind",
                    "value": "MAIN"
                  }
                ],
                "concreteType": "ArtistConnection",
                "kind": "LinkedField",
                "name": "artistsConnection",
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
                                    "selections": (v2/*: any*/),
                                    "storageKey": "cropped(height:45,width:45)"
                                  }
                                ],
                                "storageKey": null
                              },
                              (v3/*: any*/),
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
                                    "selections": (v2/*: any*/),
                                    "storageKey": "cropped(height:334,version:[\"larger\",\"large\"],width:445)"
                                  }
                                ],
                                "storageKey": null
                              }
                            ],
                            "storageKey": null
                          },
                          (v3/*: any*/)
                        ],
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": "artistsConnection(first:12,kind:\"MAIN\")"
              }
            ],
            "storageKey": null
          },
          (v3/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "6a02e45fe596b3f618a387630c9080b5",
    "id": null,
    "metadata": {},
    "name": "ArtistRelatedArtistsRailQuery",
    "operationKind": "query",
    "text": "query ArtistRelatedArtistsRailQuery(\n  $slug: String!\n) {\n  artist(id: $slug) {\n    ...ArtistRelatedArtistsRail_artist\n    id\n  }\n}\n\nfragment ArtistRelatedArtistsRail_artist on Artist {\n  related {\n    artistsConnection(kind: MAIN, first: 12) {\n      edges {\n        node {\n          ...CellArtist_artist\n          internalID\n          slug\n          href\n          id\n        }\n      }\n    }\n  }\n}\n\nfragment CellArtist_artist on Artist {\n  ...EntityHeaderArtist_artist\n  internalID\n  slug\n  name\n  href\n  initials\n  coverArtwork {\n    image {\n      cropped(width: 445, height: 334, version: [\"larger\", \"large\"]) {\n        src\n        srcSet\n      }\n    }\n    id\n  }\n}\n\nfragment EntityHeaderArtist_artist on Artist {\n  internalID\n  href\n  slug\n  name\n  initials\n  formattedNationalityAndBirthday\n  counts {\n    artworks\n    forSaleArtworks\n  }\n  coverArtwork {\n    avatar: image {\n      cropped(width: 45, height: 45) {\n        src\n        srcSet\n      }\n    }\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "b1c36c43ce75912bdf69405f7b37dd92";

export default node;
