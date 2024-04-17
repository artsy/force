/**
 * @generated SignedSource<<55c93f1404f0a9fbf7ac0b34fd5e6852>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type MyCollectionArtworkImageBrowserTestQuery$variables = Record<PropertyKey, never>;
export type MyCollectionArtworkImageBrowserTestQuery$data = {
  readonly artwork: {
    readonly " $fragmentSpreads": FragmentRefs<"MyCollectionArtworkImageBrowser_artwork">;
  } | null | undefined;
};
export type MyCollectionArtworkImageBrowserTestQuery = {
  response: MyCollectionArtworkImageBrowserTestQuery$data;
  variables: MyCollectionArtworkImageBrowserTestQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "artwork-id"
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
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "slug",
  "storageKey": null
},
v4 = [
  {
    "kind": "Literal",
    "name": "includeAll",
    "value": true
  }
],
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isDefault",
  "storageKey": null
},
v6 = {
  "kind": "Literal",
  "name": "height",
  "value": 800
},
v7 = {
  "kind": "Literal",
  "name": "version",
  "value": [
    "main",
    "normalized",
    "larger",
    "large"
  ]
},
v8 = {
  "kind": "Literal",
  "name": "width",
  "value": 800
},
v9 = [
  (v6/*: any*/),
  {
    "kind": "Literal",
    "name": "quality",
    "value": 85
  },
  (v7/*: any*/),
  (v8/*: any*/)
],
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "width",
  "storageKey": null
},
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "height",
  "storageKey": null
},
v12 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "src",
  "storageKey": null
},
v13 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "srcSet",
  "storageKey": null
},
v14 = [
  (v10/*: any*/),
  (v11/*: any*/),
  (v12/*: any*/),
  (v13/*: any*/)
],
v15 = {
  "alias": "type",
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v16 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
},
v17 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
},
v18 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "String"
},
v19 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Int"
},
v20 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "ID"
},
v21 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Boolean"
},
v22 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "Int"
},
v23 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Float"
},
v24 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Image"
},
v25 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "ResizedImageUrl"
},
v26 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "Boolean"
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "MyCollectionArtworkImageBrowserTestQuery",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "Artwork",
        "kind": "LinkedField",
        "name": "artwork",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "MyCollectionArtworkImageBrowser_artwork"
          }
        ],
        "storageKey": "artwork(id:\"artwork-id\")"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "MyCollectionArtworkImageBrowserTestQuery",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "Artwork",
        "kind": "LinkedField",
        "name": "artwork",
        "plural": false,
        "selections": [
          (v1/*: any*/),
          (v2/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "isSaved",
            "storageKey": null
          },
          (v3/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "title",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "date",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "artistNames",
            "storageKey": null
          },
          {
            "alias": "preview",
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
                    "name": "version",
                    "value": "square"
                  }
                ],
                "kind": "ScalarField",
                "name": "url",
                "storageKey": "url(version:\"square\")"
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "isSavedToList",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Sale",
            "kind": "LinkedField",
            "name": "sale",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "isAuction",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "isClosed",
                "storageKey": null
              },
              (v1/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "isLiveOpen",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "isRegistrationClosed",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "liveStartAt",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "Bidder",
                "kind": "LinkedField",
                "name": "registrationStatus",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "qualifiedForBidding",
                    "storageKey": null
                  },
                  (v1/*: any*/)
                ],
                "storageKey": null
              },
              (v3/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "registrationEndsAt",
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "downloadableImageUrl",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Artist",
            "kind": "LinkedField",
            "name": "artists",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "name",
                "storageKey": null
              },
              (v1/*: any*/)
            ],
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
            "args": (v4/*: any*/),
            "concreteType": "Image",
            "kind": "LinkedField",
            "name": "images",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "url",
                "storageKey": null
              },
              (v2/*: any*/),
              (v5/*: any*/),
              {
                "alias": "placeholder",
                "args": [
                  {
                    "kind": "Literal",
                    "name": "version",
                    "value": [
                      "small",
                      "medium"
                    ]
                  }
                ],
                "kind": "ScalarField",
                "name": "url",
                "storageKey": "url(version:[\"small\",\"medium\"])"
              },
              {
                "alias": "fallback",
                "args": (v9/*: any*/),
                "concreteType": "CroppedImageUrl",
                "kind": "LinkedField",
                "name": "cropped",
                "plural": false,
                "selections": (v14/*: any*/),
                "storageKey": "cropped(height:800,quality:85,version:[\"main\",\"normalized\",\"larger\",\"large\"],width:800)"
              },
              {
                "alias": null,
                "args": (v9/*: any*/),
                "concreteType": "ResizedImageUrl",
                "kind": "LinkedField",
                "name": "resized",
                "plural": false,
                "selections": (v14/*: any*/),
                "storageKey": "resized(height:800,quality:85,version:[\"main\",\"normalized\",\"larger\",\"large\"],width:800)"
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "versions",
                "storageKey": null
              }
            ],
            "storageKey": "images(includeAll:true)"
          },
          {
            "alias": "artworkMeta",
            "args": null,
            "concreteType": "ArtworkMeta",
            "kind": "LinkedField",
            "name": "meta",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "share",
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "widthCm",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "heightCm",
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
                  (v6/*: any*/),
                  (v7/*: any*/),
                  (v8/*: any*/)
                ],
                "concreteType": "ResizedImageUrl",
                "kind": "LinkedField",
                "name": "resized",
                "plural": false,
                "selections": [
                  (v12/*: any*/),
                  (v13/*: any*/),
                  (v10/*: any*/),
                  (v11/*: any*/)
                ],
                "storageKey": "resized(height:800,version:[\"main\",\"normalized\",\"larger\",\"large\"],width:800)"
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "isUnlisted",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "isDownloadable",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "isHangable",
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
              (v1/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "formattedMetadata",
            "storageKey": null
          },
          {
            "alias": null,
            "args": (v4/*: any*/),
            "concreteType": null,
            "kind": "LinkedField",
            "name": "figures",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "__typename",
                "storageKey": null
              },
              {
                "kind": "InlineFragment",
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "playerUrl",
                    "storageKey": null
                  },
                  {
                    "alias": "videoWidth",
                    "args": null,
                    "kind": "ScalarField",
                    "name": "width",
                    "storageKey": null
                  },
                  {
                    "alias": "videoHeight",
                    "args": null,
                    "kind": "ScalarField",
                    "name": "height",
                    "storageKey": null
                  },
                  (v1/*: any*/),
                  (v15/*: any*/)
                ],
                "type": "Video",
                "abstractKey": null
              },
              {
                "kind": "InlineFragment",
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "DeepZoom",
                    "kind": "LinkedField",
                    "name": "deepZoom",
                    "plural": false,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "DeepZoomImage",
                        "kind": "LinkedField",
                        "name": "Image",
                        "plural": false,
                        "selections": [
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "xmlns",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "Url",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "Format",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "TileSize",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "Overlap",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "DeepZoomImageSize",
                            "kind": "LinkedField",
                            "name": "Size",
                            "plural": false,
                            "selections": [
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "Width",
                                "storageKey": null
                              },
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "Height",
                                "storageKey": null
                              }
                            ],
                            "storageKey": null
                          }
                        ],
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  },
                  (v2/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "isZoomable",
                    "storageKey": null
                  },
                  (v15/*: any*/),
                  (v5/*: any*/),
                  (v10/*: any*/),
                  (v11/*: any*/)
                ],
                "type": "Image",
                "abstractKey": null
              }
            ],
            "storageKey": "figures(includeAll:true)"
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "isSetVideoAsCover",
            "storageKey": null
          }
        ],
        "storageKey": "artwork(id:\"artwork-id\")"
      }
    ]
  },
  "params": {
    "cacheID": "5a03d4ff2ef7cc82901cf928b7d85bd9",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "artwork": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Artwork"
        },
        "artwork.artistNames": (v16/*: any*/),
        "artwork.artists": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "Artist"
        },
        "artwork.artists.id": (v17/*: any*/),
        "artwork.artists.name": (v16/*: any*/),
        "artwork.artworkMeta": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArtworkMeta"
        },
        "artwork.artworkMeta.share": (v16/*: any*/),
        "artwork.date": (v16/*: any*/),
        "artwork.downloadableImageUrl": (v16/*: any*/),
        "artwork.figures": {
          "enumValues": null,
          "nullable": false,
          "plural": true,
          "type": "ArtworkFigures"
        },
        "artwork.figures.__typename": (v18/*: any*/),
        "artwork.figures.deepZoom": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "DeepZoom"
        },
        "artwork.figures.deepZoom.Image": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "DeepZoomImage"
        },
        "artwork.figures.deepZoom.Image.Format": (v16/*: any*/),
        "artwork.figures.deepZoom.Image.Overlap": (v19/*: any*/),
        "artwork.figures.deepZoom.Image.Size": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "DeepZoomImageSize"
        },
        "artwork.figures.deepZoom.Image.Size.Height": (v19/*: any*/),
        "artwork.figures.deepZoom.Image.Size.Width": (v19/*: any*/),
        "artwork.figures.deepZoom.Image.TileSize": (v19/*: any*/),
        "artwork.figures.deepZoom.Image.Url": (v16/*: any*/),
        "artwork.figures.deepZoom.Image.xmlns": (v16/*: any*/),
        "artwork.figures.height": (v19/*: any*/),
        "artwork.figures.id": (v17/*: any*/),
        "artwork.figures.internalID": (v20/*: any*/),
        "artwork.figures.isDefault": (v21/*: any*/),
        "artwork.figures.isZoomable": (v21/*: any*/),
        "artwork.figures.playerUrl": (v18/*: any*/),
        "artwork.figures.type": (v18/*: any*/),
        "artwork.figures.videoHeight": (v22/*: any*/),
        "artwork.figures.videoWidth": (v22/*: any*/),
        "artwork.figures.width": (v19/*: any*/),
        "artwork.formattedMetadata": (v16/*: any*/),
        "artwork.heightCm": (v23/*: any*/),
        "artwork.href": (v16/*: any*/),
        "artwork.id": (v17/*: any*/),
        "artwork.image": (v24/*: any*/),
        "artwork.image.resized": (v25/*: any*/),
        "artwork.image.resized.height": (v19/*: any*/),
        "artwork.image.resized.src": (v18/*: any*/),
        "artwork.image.resized.srcSet": (v18/*: any*/),
        "artwork.image.resized.width": (v19/*: any*/),
        "artwork.images": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "Image"
        },
        "artwork.images.fallback": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "CroppedImageUrl"
        },
        "artwork.images.fallback.height": (v22/*: any*/),
        "artwork.images.fallback.src": (v18/*: any*/),
        "artwork.images.fallback.srcSet": (v18/*: any*/),
        "artwork.images.fallback.width": (v22/*: any*/),
        "artwork.images.internalID": (v20/*: any*/),
        "artwork.images.isDefault": (v21/*: any*/),
        "artwork.images.placeholder": (v16/*: any*/),
        "artwork.images.resized": (v25/*: any*/),
        "artwork.images.resized.height": (v19/*: any*/),
        "artwork.images.resized.src": (v18/*: any*/),
        "artwork.images.resized.srcSet": (v18/*: any*/),
        "artwork.images.resized.width": (v19/*: any*/),
        "artwork.images.url": (v16/*: any*/),
        "artwork.images.versions": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "String"
        },
        "artwork.internalID": (v17/*: any*/),
        "artwork.isDownloadable": (v21/*: any*/),
        "artwork.isHangable": (v21/*: any*/),
        "artwork.isSaved": (v21/*: any*/),
        "artwork.isSavedToList": (v26/*: any*/),
        "artwork.isSetVideoAsCover": (v21/*: any*/),
        "artwork.isUnlisted": (v26/*: any*/),
        "artwork.partner": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Partner"
        },
        "artwork.partner.id": (v17/*: any*/),
        "artwork.partner.slug": (v17/*: any*/),
        "artwork.preview": (v24/*: any*/),
        "artwork.preview.url": (v16/*: any*/),
        "artwork.sale": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Sale"
        },
        "artwork.sale.id": (v17/*: any*/),
        "artwork.sale.isAuction": (v21/*: any*/),
        "artwork.sale.isClosed": (v21/*: any*/),
        "artwork.sale.isLiveOpen": (v21/*: any*/),
        "artwork.sale.isRegistrationClosed": (v21/*: any*/),
        "artwork.sale.liveStartAt": (v16/*: any*/),
        "artwork.sale.registrationEndsAt": (v16/*: any*/),
        "artwork.sale.registrationStatus": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Bidder"
        },
        "artwork.sale.registrationStatus.id": (v17/*: any*/),
        "artwork.sale.registrationStatus.qualifiedForBidding": (v21/*: any*/),
        "artwork.sale.slug": (v17/*: any*/),
        "artwork.slug": (v17/*: any*/),
        "artwork.title": (v16/*: any*/),
        "artwork.widthCm": (v23/*: any*/)
      }
    },
    "name": "MyCollectionArtworkImageBrowserTestQuery",
    "operationKind": "query",
    "text": "query MyCollectionArtworkImageBrowserTestQuery {\n  artwork(id: \"artwork-id\") {\n    ...MyCollectionArtworkImageBrowser_artwork\n    id\n  }\n}\n\nfragment ArtworkActionsSaveButton_artwork on Artwork {\n  id\n  internalID\n  isSaved\n  slug\n  title\n  date\n  artistNames\n  preview: image {\n    url(version: \"square\")\n  }\n  isSavedToList\n  sale {\n    isAuction\n    isClosed\n    id\n  }\n  ...ArtworkActionsWatchLotButton_artwork\n}\n\nfragment ArtworkActionsWatchLotButton_artwork on Artwork {\n  sale {\n    isLiveOpen\n    isRegistrationClosed\n    liveStartAt\n    registrationStatus {\n      qualifiedForBidding\n      id\n    }\n    id\n  }\n  ...ArtworkAuctionRegistrationPanel_artwork\n}\n\nfragment ArtworkActions_artwork_yvCPB on Artwork {\n  ...ArtworkActionsSaveButton_artwork\n  ...ArtworkDownloadButton_artwork\n  ...ArtworkSharePanel_artwork_yvCPB\n  ...ViewInRoom_artwork\n  isUnlisted\n  slug\n  downloadableImageUrl\n  isDownloadable\n  isHangable\n  partner {\n    slug\n    id\n  }\n}\n\nfragment ArtworkAuctionRegistrationPanel_artwork on Artwork {\n  sale {\n    slug\n    registrationEndsAt\n    isRegistrationClosed\n    id\n  }\n}\n\nfragment ArtworkDownloadButton_artwork on Artwork {\n  title\n  date\n  downloadableImageUrl\n  artists {\n    name\n    id\n  }\n}\n\nfragment ArtworkImageBrowserLarge_artwork_yvCPB on Artwork {\n  ...ArtworkLightbox_artwork_yvCPB\n  ...ArtworkVideoPlayer_artwork_yvCPB\n  isSetVideoAsCover\n  figures(includeAll: true) {\n    __typename\n    ... on Image {\n      ...DeepZoom_image\n      __typename\n      internalID\n      isZoomable\n    }\n    ... on Video {\n      __typename\n      id\n    }\n  }\n}\n\nfragment ArtworkImageBrowserSmall_artwork_yvCPB on Artwork {\n  ...ArtworkLightbox_artwork_yvCPB\n  ...ArtworkVideoPlayer_artwork_yvCPB\n  isSetVideoAsCover\n  figures(includeAll: true) {\n    __typename\n    ... on Image {\n      ...DeepZoom_image\n      internalID\n      isZoomable\n      type: __typename\n    }\n    ... on Video {\n      type: __typename\n      id\n    }\n  }\n}\n\nfragment ArtworkImageBrowser_artwork_yvCPB on Artwork {\n  ...ArtworkActions_artwork_yvCPB\n  ...ArtworkImageBrowserSmall_artwork_yvCPB\n  ...ArtworkImageBrowserLarge_artwork_yvCPB\n  internalID\n  figures(includeAll: true) {\n    __typename\n    ... on Image {\n      isDefault\n      width\n      height\n    }\n    ... on Video {\n      videoWidth: width\n      videoHeight: height\n      id\n    }\n  }\n}\n\nfragment ArtworkLightbox_artwork_yvCPB on Artwork {\n  formattedMetadata\n  images(includeAll: true) {\n    internalID\n    isDefault\n    placeholder: url(version: [\"small\", \"medium\"])\n    fallback: cropped(quality: 85, width: 800, height: 800, version: [\"main\", \"normalized\", \"larger\", \"large\"]) {\n      width\n      height\n      src\n      srcSet\n    }\n    resized(quality: 85, width: 800, height: 800, version: [\"main\", \"normalized\", \"larger\", \"large\"]) {\n      width\n      height\n      src\n      srcSet\n    }\n    versions\n  }\n}\n\nfragment ArtworkSharePanel_artwork_yvCPB on Artwork {\n  href\n  images(includeAll: true) {\n    url\n  }\n  artworkMeta: meta {\n    share\n  }\n}\n\nfragment ArtworkVideoPlayer_artwork_yvCPB on Artwork {\n  internalID\n  slug\n  figures(includeAll: true) {\n    __typename\n    ... on Video {\n      __typename\n      playerUrl\n      videoWidth: width\n      videoHeight: height\n      id\n    }\n  }\n}\n\nfragment DeepZoom_image on Image {\n  deepZoom {\n    Image {\n      xmlns\n      Url\n      Format\n      TileSize\n      Overlap\n      Size {\n        Width\n        Height\n      }\n    }\n  }\n}\n\nfragment MyCollectionArtworkImageBrowser_artwork on Artwork {\n  ...ArtworkImageBrowser_artwork_yvCPB\n  internalID\n  figures(includeAll: true) {\n    __typename\n    ... on Image {\n      width\n      height\n    }\n    ... on Video {\n      id\n    }\n  }\n}\n\nfragment ViewInRoomArtwork_artwork on Artwork {\n  widthCm\n  heightCm\n  image {\n    resized(width: 800, height: 800, version: [\"main\", \"normalized\", \"larger\", \"large\"]) {\n      src\n      srcSet\n      width\n      height\n    }\n  }\n}\n\nfragment ViewInRoom_artwork on Artwork {\n  ...ViewInRoomArtwork_artwork\n}\n"
  }
};
})();

(node as any).hash = "fbf148a105c0110b342a7eeb46543ba4";

export default node;
