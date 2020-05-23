/* tslint:disable */

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
        readonly id: string;
        readonly internalID: string;
        readonly slug: string;
        readonly is_saved: boolean | null;
        readonly title: string | null;
        readonly href: string | null;
        readonly images: ReadonlyArray<({
            readonly url: string | null;
            readonly internalID: string | null;
            readonly uri: string | null;
            readonly placeholder: ({
                readonly url: string | null;
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
        readonly sale: ({
            readonly is_closed: boolean | null;
            readonly is_auction: boolean | null;
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

fragment ArtworkActions_artwork on Artwork {
  ...Save_artwork
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
}

fragment ArtworkImageBrowser_artwork on Artwork {
  image_alt: formattedMetadata
  ...ArtworkActions_artwork
  image {
    internalID
  }
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

fragment Save_artwork on Artwork {
  id
  internalID
  slug
  is_saved: isSaved
  title
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "artworkID",
    "type": "String!",
    "defaultValue": null
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
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
},
v3 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "internalID",
  "args": null,
  "storageKey": null
},
v4 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "slug",
  "args": null,
  "storageKey": null
},
v5 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "url",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "ArtworkImageBrowser_Test_Query",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "artwork",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "Artwork",
        "plural": false,
        "selections": [
          {
            "kind": "FragmentSpread",
            "name": "ArtworkImageBrowser_artwork",
            "args": null
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "ArtworkImageBrowser_Test_Query",
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "artwork",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "Artwork",
        "plural": false,
        "selections": [
          {
            "kind": "ScalarField",
            "alias": "image_alt",
            "name": "formattedMetadata",
            "args": null,
            "storageKey": null
          },
          (v2/*: any*/),
          (v3/*: any*/),
          (v4/*: any*/),
          {
            "kind": "ScalarField",
            "alias": "is_saved",
            "name": "isSaved",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "title",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "href",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "images",
            "storageKey": null,
            "args": null,
            "concreteType": "Image",
            "plural": true,
            "selections": [
              (v5/*: any*/),
              (v3/*: any*/),
              {
                "kind": "ScalarField",
                "alias": "uri",
                "name": "url",
                "args": [
                  {
                    "kind": "Literal",
                    "name": "version",
                    "value": [
                      "large"
                    ]
                  }
                ],
                "storageKey": "url(version:[\"large\"])"
              },
              {
                "kind": "LinkedField",
                "alias": "placeholder",
                "name": "resized",
                "storageKey": "resized(height:30,version:\"small\",width:30)",
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
                "plural": false,
                "selections": [
                  (v5/*: any*/)
                ]
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "aspectRatio",
                "args": null,
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": "is_zoomable",
                "name": "isZoomable",
                "args": null,
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": "is_default",
                "name": "isDefault",
                "args": null,
                "storageKey": null
              },
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "deepZoom",
                "storageKey": null,
                "args": null,
                "concreteType": "DeepZoom",
                "plural": false,
                "selections": [
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "Image",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "DeepZoomImage",
                    "plural": false,
                    "selections": [
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "name": "xmlns",
                        "args": null,
                        "storageKey": null
                      },
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "name": "Url",
                        "args": null,
                        "storageKey": null
                      },
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "name": "Format",
                        "args": null,
                        "storageKey": null
                      },
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "name": "TileSize",
                        "args": null,
                        "storageKey": null
                      },
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "name": "Overlap",
                        "args": null,
                        "storageKey": null
                      },
                      {
                        "kind": "LinkedField",
                        "alias": null,
                        "name": "Size",
                        "storageKey": null,
                        "args": null,
                        "concreteType": "DeepZoomImageSize",
                        "plural": false,
                        "selections": [
                          {
                            "kind": "ScalarField",
                            "alias": null,
                            "name": "Width",
                            "args": null,
                            "storageKey": null
                          },
                          {
                            "kind": "ScalarField",
                            "alias": null,
                            "name": "Height",
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
          },
          {
            "kind": "LinkedField",
            "alias": "artworkMeta",
            "name": "meta",
            "storageKey": null,
            "args": null,
            "concreteType": "ArtworkMeta",
            "plural": false,
            "selections": [
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "share",
                "args": null,
                "storageKey": null
              }
            ]
          },
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
                "name": "name",
                "args": null,
                "storageKey": null
              },
              (v2/*: any*/)
            ]
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "date",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "dimensions",
            "storageKey": null,
            "args": null,
            "concreteType": "dimensions",
            "plural": false,
            "selections": [
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "cm",
                "args": null,
                "storageKey": null
              }
            ]
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
              (v3/*: any*/),
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "url",
                "args": [
                  {
                    "kind": "Literal",
                    "name": "version",
                    "value": "larger"
                  }
                ],
                "storageKey": "url(version:\"larger\")"
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "height",
                "args": null,
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "width",
                "args": null,
                "storageKey": null
              }
            ]
          },
          {
            "kind": "ScalarField",
            "alias": "is_downloadable",
            "name": "isDownloadable",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": "is_hangable",
            "name": "isHangable",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "partner",
            "storageKey": null,
            "args": null,
            "concreteType": "Partner",
            "plural": false,
            "selections": [
              (v4/*: any*/),
              (v2/*: any*/)
            ]
          },
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "sale",
            "storageKey": null,
            "args": null,
            "concreteType": "Sale",
            "plural": false,
            "selections": [
              {
                "kind": "ScalarField",
                "alias": "is_closed",
                "name": "isClosed",
                "args": null,
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": "is_auction",
                "name": "isAuction",
                "args": null,
                "storageKey": null
              },
              (v2/*: any*/)
            ]
          }
        ]
      }
    ]
  },
  "params": {
    "operationKind": "query",
    "name": "ArtworkImageBrowser_Test_Query",
    "id": null,
    "text": "query ArtworkImageBrowser_Test_Query(\n  $artworkID: String!\n) {\n  artwork(id: $artworkID) {\n    ...ArtworkImageBrowser_artwork\n    id\n  }\n}\n\nfragment ArtworkActions_artwork on Artwork {\n  ...Save_artwork\n  ...ArtworkSharePanel_artwork\n  artists {\n    name\n    id\n  }\n  date\n  dimensions {\n    cm\n  }\n  href\n  slug\n  image {\n    internalID\n    url(version: \"larger\")\n    height\n    width\n  }\n  is_downloadable: isDownloadable\n  is_hangable: isHangable\n  partner {\n    slug\n    id\n  }\n  title\n  sale {\n    is_closed: isClosed\n    is_auction: isAuction\n    id\n  }\n}\n\nfragment ArtworkImageBrowser_artwork on Artwork {\n  image_alt: formattedMetadata\n  ...ArtworkActions_artwork\n  image {\n    internalID\n  }\n  images {\n    internalID\n    uri: url(version: [\"large\"])\n    placeholder: resized(width: 30, height: 30, version: \"small\") {\n      url\n    }\n    aspectRatio\n    is_zoomable: isZoomable\n    is_default: isDefault\n    deepZoom {\n      Image {\n        xmlns\n        Url\n        Format\n        TileSize\n        Overlap\n        Size {\n          Width\n          Height\n        }\n      }\n    }\n  }\n}\n\nfragment ArtworkSharePanel_artwork on Artwork {\n  href\n  images {\n    url\n  }\n  artworkMeta: meta {\n    share\n  }\n}\n\nfragment Save_artwork on Artwork {\n  id\n  internalID\n  slug\n  is_saved: isSaved\n  title\n}\n",
    "metadata": {}
  }
};
})();
(node as any).hash = '30af11b1cab9d8063877a4f946177ce5';
export default node;
