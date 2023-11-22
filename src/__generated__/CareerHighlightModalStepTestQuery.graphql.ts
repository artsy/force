/**
 * @generated SignedSource<<50a110316e9b5beaebba6b04b3167e5b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CareerHighlightModalStepTestQuery$variables = Record<PropertyKey, never>;
export type CareerHighlightModalStepTestQuery$data = {
  readonly me: {
    readonly myCollectionInfo: {
      readonly BIENNIAL: ReadonlyArray<{
        readonly " $fragmentSpreads": FragmentRefs<"CareerHighlightModalStep_careerHighlight">;
      }>;
    } | null | undefined;
  } | null | undefined;
};
export type CareerHighlightModalStepTestQuery = {
  response: CareerHighlightModalStepTestQuery$data;
  variables: CareerHighlightModalStepTestQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "kind",
    "value": "BIENNIAL"
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v2 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
},
v3 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "FormattedNumber"
},
v4 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "String"
},
v5 = {
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
    "name": "CareerHighlightModalStepTestQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Me",
        "kind": "LinkedField",
        "name": "me",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "MyCollectionInfo",
            "kind": "LinkedField",
            "name": "myCollectionInfo",
            "plural": false,
            "selections": [
              {
                "alias": "BIENNIAL",
                "args": (v0/*: any*/),
                "concreteType": "ArtistInsight",
                "kind": "LinkedField",
                "name": "artistInsights",
                "plural": true,
                "selections": [
                  {
                    "args": null,
                    "kind": "FragmentSpread",
                    "name": "CareerHighlightModalStep_careerHighlight"
                  }
                ],
                "storageKey": "artistInsights(kind:\"BIENNIAL\")"
              }
            ],
            "storageKey": null
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
    "name": "CareerHighlightModalStepTestQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Me",
        "kind": "LinkedField",
        "name": "me",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "MyCollectionInfo",
            "kind": "LinkedField",
            "name": "myCollectionInfo",
            "plural": false,
            "selections": [
              {
                "alias": "BIENNIAL",
                "args": (v0/*: any*/),
                "concreteType": "ArtistInsight",
                "kind": "LinkedField",
                "name": "artistInsights",
                "plural": true,
                "selections": [
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
                                "selections": [
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
                                "storageKey": "cropped(height:45,width:45)"
                              }
                            ],
                            "storageKey": null
                          },
                          (v1/*: any*/)
                        ],
                        "storageKey": null
                      },
                      (v1/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": "artistInsights(kind:\"BIENNIAL\")"
              }
            ],
            "storageKey": null
          },
          (v1/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "9736ad43e1b18dfecef049590e7ad505",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "me": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Me"
        },
        "me.id": (v2/*: any*/),
        "me.myCollectionInfo": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "MyCollectionInfo"
        },
        "me.myCollectionInfo.BIENNIAL": {
          "enumValues": null,
          "nullable": false,
          "plural": true,
          "type": "ArtistInsight"
        },
        "me.myCollectionInfo.BIENNIAL.artist": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Artist"
        },
        "me.myCollectionInfo.BIENNIAL.artist.counts": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArtistCounts"
        },
        "me.myCollectionInfo.BIENNIAL.artist.counts.artworks": (v3/*: any*/),
        "me.myCollectionInfo.BIENNIAL.artist.counts.forSaleArtworks": (v3/*: any*/),
        "me.myCollectionInfo.BIENNIAL.artist.coverArtwork": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Artwork"
        },
        "me.myCollectionInfo.BIENNIAL.artist.coverArtwork.avatar": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Image"
        },
        "me.myCollectionInfo.BIENNIAL.artist.coverArtwork.avatar.cropped": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "CroppedImageUrl"
        },
        "me.myCollectionInfo.BIENNIAL.artist.coverArtwork.avatar.cropped.src": (v4/*: any*/),
        "me.myCollectionInfo.BIENNIAL.artist.coverArtwork.avatar.cropped.srcSet": (v4/*: any*/),
        "me.myCollectionInfo.BIENNIAL.artist.coverArtwork.id": (v2/*: any*/),
        "me.myCollectionInfo.BIENNIAL.artist.formattedNationalityAndBirthday": (v5/*: any*/),
        "me.myCollectionInfo.BIENNIAL.artist.href": (v5/*: any*/),
        "me.myCollectionInfo.BIENNIAL.artist.id": (v2/*: any*/),
        "me.myCollectionInfo.BIENNIAL.artist.initials": (v5/*: any*/),
        "me.myCollectionInfo.BIENNIAL.artist.internalID": (v2/*: any*/),
        "me.myCollectionInfo.BIENNIAL.artist.name": (v5/*: any*/),
        "me.myCollectionInfo.BIENNIAL.artist.slug": (v2/*: any*/)
      }
    },
    "name": "CareerHighlightModalStepTestQuery",
    "operationKind": "query",
    "text": "query CareerHighlightModalStepTestQuery {\n  me {\n    myCollectionInfo {\n      BIENNIAL: artistInsights(kind: BIENNIAL) {\n        ...CareerHighlightModalStep_careerHighlight\n      }\n    }\n    id\n  }\n}\n\nfragment CareerHighlightModalStep_careerHighlight on ArtistInsight {\n  artist {\n    ...EntityHeaderArtist_artist\n    id\n  }\n}\n\nfragment EntityHeaderArtist_artist on Artist {\n  internalID\n  href\n  slug\n  name\n  initials\n  formattedNationalityAndBirthday\n  counts {\n    artworks\n    forSaleArtworks\n  }\n  coverArtwork {\n    avatar: image {\n      cropped(width: 45, height: 45) {\n        src\n        srcSet\n      }\n    }\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "457e74767756e569e3274df8b3744ef9";

export default node;
