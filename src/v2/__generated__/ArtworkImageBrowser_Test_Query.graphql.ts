/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArtworkImageBrowser_Test_QueryVariables = {
    artworkID: string;
};
export type ArtworkImageBrowser_Test_QueryResponse = {
    readonly artwork: {
        readonly " $fragmentRefs": FragmentRefs<"ArtworkImageBrowser_artwork">;
    } | null;
};
export type ArtworkImageBrowser_Test_QueryRawResponse = {
    readonly artwork: ({
        readonly image_alt: string | null;
        readonly internalID: string;
        readonly id: string;
        readonly slug: string;
        readonly title: string | null;
        readonly sale: ({
            readonly isAuction: boolean | null;
            readonly isClosed: boolean | null;
            readonly id: string | null;
            readonly is_closed: boolean | null;
            readonly is_auction: boolean | null;
        }) | null;
        readonly is_saved: boolean | null;
        readonly href: string | null;
        readonly images: ReadonlyArray<({
            readonly url: string | null;
            readonly internalID: string | null;
            readonly uri: string | null;
            readonly placeholder: ({
                readonly url: string;
            }) | null;
            readonly aspectRatio: number;
            readonly is_zoomable: boolean | null;
            readonly is_default: boolean | null;
            readonly deepZoom: ({
                readonly Image: ({
                    readonly xmlns: string | null;
                    readonly Url: string | null;
                    readonly Format: string | null;
                    readonly TileSize: number | null;
                    readonly Overlap: number | null;
                    readonly Size: ({
                        readonly Width: number | null;
                        readonly Height: number | null;
                    }) | null;
                }) | null;
            }) | null;
        }) | null> | null;
        readonly artworkMeta: ({
            readonly share: string | null;
        }) | null;
        readonly artists: ReadonlyArray<({
            readonly name: string | null;
            readonly id: string | null;
        }) | null> | null;
        readonly date: string | null;
        readonly dimensions: ({
            readonly cm: string | null;
        }) | null;
        readonly image: ({
            readonly internalID: string | null;
            readonly url: string | null;
            readonly height: number | null;
            readonly width: number | null;
        }) | null;
        readonly is_downloadable: boolean | null;
        readonly is_hangable: boolean | null;
        readonly partner: ({
            readonly slug: string;
            readonly id: string | null;
        }) | null;
    }) | null;
};
export type ArtworkImageBrowser_Test_Query = {
    readonly response: ArtworkImageBrowser_Test_QueryResponse;
    readonly variables: ArtworkImageBrowser_Test_QueryVariables;
    readonly rawResponse: ArtworkImageBrowser_Test_QueryRawResponse;
};



/*
query ArtworkImageBrowser_Test_Query(
  $artworkID: String!
) {
  artwork(id: $artworkID) {
    ...ArtworkImageBrowser_artwork
    id
  }
}

fragment ArtworkActionsSaveButton_artwork on Artwork {
  internalID
  id
  slug
  title
  sale {
    isAuction
    isClosed
    id
  }
  is_saved: isSaved
}

fragment ArtworkActions_artwork on Artwork {
  ...ArtworkActionsSaveButton_artwork
  ...ArtworkSharePanel_artwork
  artists {
    name
    id
  }
  date
  dimensions {
    cm
  }
  href
  slug
  image {
    internalID
    url(version: "larger")
    height
    width
  }
  is_downloadable: isDownloadable
  is_hangable: isHangable
  partner {
    slug
    id
  }
  title
  sale {
    is_closed: isClosed
    is_auction: isAuction
    id
  }
  is_saved: isSaved
}

fragment ArtworkImageBrowser_artwork on Artwork {
  image_alt: formattedMetadata
  ...ArtworkActions_artwork
  images {
    internalID
    uri: url(version: ["large"])
    placeholder: resized(width: 30, height: 30, version: "small") {
      url
    }
    aspectRatio
    is_zoomable: isZoomable
    is_default: isDefault
    deepZoom {
      Image {
        xmlns
        Url
        Format
        TileSize
        Overlap
        Size {
          Width
          Height
        }
      }
    }
  }
}

fragment ArtworkSharePanel_artwork on Artwork {
  href
  images {
    url
  }
  artworkMeta: meta {
    share
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "artworkID",
    "type": "String!"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "artworkID"
  }
],
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
  "name": "id",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "slug",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "url",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "ArtworkImageBrowser_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Artwork",
        "kind": "LinkedField",
        "name": "artwork",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "ArtworkImageBrowser_artwork"
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
    "name": "ArtworkImageBrowser_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Artwork",
        "kind": "LinkedField",
        "name": "artwork",
        "plural": false,
        "selections": [
          {
            "alias": "image_alt",
            "args": null,
            "kind": "ScalarField",
            "name": "formattedMetadata",
            "storageKey": null
          },
          (v2/*: any*/),
          (v3/*: any*/),
          (v4/*: any*/),
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
              (v3/*: any*/),
              {
                "alias": "is_closed",
                "args": null,
                "kind": "ScalarField",
                "name": "isClosed",
                "storageKey": null
              },
              {
                "alias": "is_auction",
                "args": null,
                "kind": "ScalarField",
                "name": "isAuction",
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": "is_saved",
            "args": null,
            "kind": "ScalarField",
            "name": "isSaved",
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
            "concreteType": "Image",
            "kind": "LinkedField",
            "name": "images",
            "plural": true,
            "selections": [
              (v5/*: any*/),
              (v2/*: any*/),
              {
                "alias": "uri",
                "args": [
                  {
                    "kind": "Literal",
                    "name": "version",
                    "value": [
                      "large"
                    ]
                  }
                ],
                "kind": "ScalarField",
                "name": "url",
                "storageKey": "url(version:[\"large\"])"
              },
              {
                "alias": "placeholder",
                "args": [
                  {
                    "kind": "Literal",
                    "name": "height",
                    "value": 30
                  },
                  {
                    "kind": "Literal",
                    "name": "version",
                    "value": "small"
                  },
                  {
                    "kind": "Literal",
                    "name": "width",
                    "value": 30
                  }
                ],
                "concreteType": "ResizedImageUrl",
                "kind": "LinkedField",
                "name": "resized",
                "plural": false,
                "selections": [
                  (v5/*: any*/)
                ],
                "storageKey": "resized(height:30,version:\"small\",width:30)"
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "aspectRatio",
                "storageKey": null
              },
              {
                "alias": "is_zoomable",
                "args": null,
                "kind": "ScalarField",
                "name": "isZoomable",
                "storageKey": null
              },
              {
                "alias": "is_default",
                "args": null,
                "kind": "ScalarField",
                "name": "isDefault",
                "storageKey": null
              },
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
              }
            ],
            "storageKey": null
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
              (v3/*: any*/)
            ],
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
            "concreteType": "dimensions",
            "kind": "LinkedField",
            "name": "dimensions",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "cm",
                "storageKey": null
              }
            ],
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
              (v2/*: any*/),
              {
                "alias": null,
                "args": [
                  {
                    "kind": "Literal",
                    "name": "version",
                    "value": "larger"
                  }
                ],
                "kind": "ScalarField",
                "name": "url",
                "storageKey": "url(version:\"larger\")"
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
                "name": "width",
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": "is_downloadable",
            "args": null,
            "kind": "ScalarField",
            "name": "isDownloadable",
            "storageKey": null
          },
          {
            "alias": "is_hangable",
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
              (v4/*: any*/),
              (v3/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "ArtworkImageBrowser_Test_Query",
    "operationKind": "query",
    "text": "query ArtworkImageBrowser_Test_Query(\n  $artworkID: String!\n) {\n  artwork(id: $artworkID) {\n    ...ArtworkImageBrowser_artwork\n    id\n  }\n}\n\nfragment ArtworkActionsSaveButton_artwork on Artwork {\n  internalID\n  id\n  slug\n  title\n  sale {\n    isAuction\n    isClosed\n    id\n  }\n  is_saved: isSaved\n}\n\nfragment ArtworkActions_artwork on Artwork {\n  ...ArtworkActionsSaveButton_artwork\n  ...ArtworkSharePanel_artwork\n  artists {\n    name\n    id\n  }\n  date\n  dimensions {\n    cm\n  }\n  href\n  slug\n  image {\n    internalID\n    url(version: \"larger\")\n    height\n    width\n  }\n  is_downloadable: isDownloadable\n  is_hangable: isHangable\n  partner {\n    slug\n    id\n  }\n  title\n  sale {\n    is_closed: isClosed\n    is_auction: isAuction\n    id\n  }\n  is_saved: isSaved\n}\n\nfragment ArtworkImageBrowser_artwork on Artwork {\n  image_alt: formattedMetadata\n  ...ArtworkActions_artwork\n  images {\n    internalID\n    uri: url(version: [\"large\"])\n    placeholder: resized(width: 30, height: 30, version: \"small\") {\n      url\n    }\n    aspectRatio\n    is_zoomable: isZoomable\n    is_default: isDefault\n    deepZoom {\n      Image {\n        xmlns\n        Url\n        Format\n        TileSize\n        Overlap\n        Size {\n          Width\n          Height\n        }\n      }\n    }\n  }\n}\n\nfragment ArtworkSharePanel_artwork on Artwork {\n  href\n  images {\n    url\n  }\n  artworkMeta: meta {\n    share\n  }\n}\n"
  }
};
})();
(node as any).hash = '30af11b1cab9d8063877a4f946177ce5';
export default node;
