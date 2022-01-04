/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArtworkActions_Test_QueryVariables = {};
export type ArtworkActions_Test_QueryResponse = {
    readonly artwork: {
        readonly " $fragmentRefs": FragmentRefs<"ArtworkActions_artwork">;
    } | null;
};
export type ArtworkActions_Test_Query = {
    readonly response: ArtworkActions_Test_QueryResponse;
    readonly variables: ArtworkActions_Test_QueryVariables;
};



/*
query ArtworkActions_Test_Query {
  artwork(id: "example") {
    ...ArtworkActions_artwork
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
  ...ViewInRoom_artwork
  artists {
    name
    id
  }
  date
  dimensions {
    cm
  }
  slug
  image {
    internalID
    url(version: "larger")
    height
    width
  }
  downloadableImageUrl
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

fragment ArtworkSharePanel_artwork on Artwork {
  href
  images {
    url
  }
  artworkMeta: meta {
    share
  }
}

fragment ViewInRoomArtwork_artwork on Artwork {
  widthCm
  heightCm
  image {
    resized(width: 800, height: 800, version: ["normalized", "larger", "large"]) {
      src
      srcSet
      width
      height
    }
  }
}

fragment ViewInRoom_artwork on Artwork {
  ...ViewInRoomArtwork_artwork
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "example"
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
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "width",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "height",
  "storageKey": null
},
v6 = {
  "type": "ID",
  "enumValues": null,
  "plural": false,
  "nullable": false
},
v7 = {
  "type": "String",
  "enumValues": null,
  "plural": false,
  "nullable": true
},
v8 = {
  "type": "Boolean",
  "enumValues": null,
  "plural": false,
  "nullable": true
},
v9 = {
  "type": "ID",
  "enumValues": null,
  "plural": false,
  "nullable": true
},
v10 = {
  "type": "Int",
  "enumValues": null,
  "plural": false,
  "nullable": true
},
v11 = {
  "type": "Float",
  "enumValues": null,
  "plural": false,
  "nullable": true
},
v12 = {
  "type": "String",
  "enumValues": null,
  "plural": false,
  "nullable": false
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "ArtworkActions_Test_Query",
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
            "name": "ArtworkActions_artwork"
          }
        ],
        "storageKey": "artwork(id:\"example\")"
      }
    ],
    "type": "Query"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "ArtworkActions_Test_Query",
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
              (v2/*: any*/),
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
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "url",
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
                  {
                    "kind": "Literal",
                    "name": "height",
                    "value": 800
                  },
                  {
                    "kind": "Literal",
                    "name": "version",
                    "value": [
                      "normalized",
                      "larger",
                      "large"
                    ]
                  },
                  {
                    "kind": "Literal",
                    "name": "width",
                    "value": 800
                  }
                ],
                "concreteType": "ResizedImageUrl",
                "kind": "LinkedField",
                "name": "resized",
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
                  },
                  (v4/*: any*/),
                  (v5/*: any*/)
                ],
                "storageKey": "resized(height:800,version:[\"normalized\",\"larger\",\"large\"],width:800)"
              },
              (v1/*: any*/),
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
              (v5/*: any*/),
              (v4/*: any*/)
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
              (v2/*: any*/)
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
            "kind": "ScalarField",
            "name": "downloadableImageUrl",
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
              (v3/*: any*/),
              (v2/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": "artwork(id:\"example\")"
      }
    ]
  },
  "params": {
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "artwork": {
          "type": "Artwork",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "artwork.id": (v6/*: any*/),
        "artwork.artists": {
          "type": "Artist",
          "enumValues": null,
          "plural": true,
          "nullable": true
        },
        "artwork.date": (v7/*: any*/),
        "artwork.dimensions": {
          "type": "dimensions",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "artwork.slug": (v6/*: any*/),
        "artwork.image": {
          "type": "Image",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "artwork.downloadableImageUrl": (v7/*: any*/),
        "artwork.is_downloadable": (v8/*: any*/),
        "artwork.is_hangable": (v8/*: any*/),
        "artwork.partner": {
          "type": "Partner",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "artwork.title": (v7/*: any*/),
        "artwork.sale": {
          "type": "Sale",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "artwork.is_saved": (v8/*: any*/),
        "artwork.internalID": (v6/*: any*/),
        "artwork.href": (v7/*: any*/),
        "artwork.images": {
          "type": "Image",
          "enumValues": null,
          "plural": true,
          "nullable": true
        },
        "artwork.artworkMeta": {
          "type": "ArtworkMeta",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "artwork.artists.name": (v7/*: any*/),
        "artwork.artists.id": (v9/*: any*/),
        "artwork.dimensions.cm": (v7/*: any*/),
        "artwork.image.internalID": (v9/*: any*/),
        "artwork.image.url": (v7/*: any*/),
        "artwork.image.height": (v10/*: any*/),
        "artwork.image.width": (v10/*: any*/),
        "artwork.partner.slug": (v6/*: any*/),
        "artwork.partner.id": (v9/*: any*/),
        "artwork.sale.is_closed": (v8/*: any*/),
        "artwork.sale.is_auction": (v8/*: any*/),
        "artwork.sale.id": (v9/*: any*/),
        "artwork.sale.isAuction": (v8/*: any*/),
        "artwork.sale.isClosed": (v8/*: any*/),
        "artwork.images.url": (v7/*: any*/),
        "artwork.artworkMeta.share": (v7/*: any*/),
        "artwork.widthCm": (v11/*: any*/),
        "artwork.heightCm": (v11/*: any*/),
        "artwork.image.resized": {
          "type": "ResizedImageUrl",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "artwork.image.resized.src": (v12/*: any*/),
        "artwork.image.resized.srcSet": (v12/*: any*/),
        "artwork.image.resized.width": (v10/*: any*/),
        "artwork.image.resized.height": (v10/*: any*/)
      }
    },
    "name": "ArtworkActions_Test_Query",
    "operationKind": "query",
    "text": "query ArtworkActions_Test_Query {\n  artwork(id: \"example\") {\n    ...ArtworkActions_artwork\n    id\n  }\n}\n\nfragment ArtworkActionsSaveButton_artwork on Artwork {\n  internalID\n  id\n  slug\n  title\n  sale {\n    isAuction\n    isClosed\n    id\n  }\n  is_saved: isSaved\n}\n\nfragment ArtworkActions_artwork on Artwork {\n  ...ArtworkActionsSaveButton_artwork\n  ...ArtworkSharePanel_artwork\n  ...ViewInRoom_artwork\n  artists {\n    name\n    id\n  }\n  date\n  dimensions {\n    cm\n  }\n  slug\n  image {\n    internalID\n    url(version: \"larger\")\n    height\n    width\n  }\n  downloadableImageUrl\n  is_downloadable: isDownloadable\n  is_hangable: isHangable\n  partner {\n    slug\n    id\n  }\n  title\n  sale {\n    is_closed: isClosed\n    is_auction: isAuction\n    id\n  }\n  is_saved: isSaved\n}\n\nfragment ArtworkSharePanel_artwork on Artwork {\n  href\n  images {\n    url\n  }\n  artworkMeta: meta {\n    share\n  }\n}\n\nfragment ViewInRoomArtwork_artwork on Artwork {\n  widthCm\n  heightCm\n  image {\n    resized(width: 800, height: 800, version: [\"normalized\", \"larger\", \"large\"]) {\n      src\n      srcSet\n      width\n      height\n    }\n  }\n}\n\nfragment ViewInRoom_artwork on Artwork {\n  ...ViewInRoomArtwork_artwork\n}\n"
  }
};
})();
(node as any).hash = '104cf66f3d4d189b3c617eef0654c9dd';
export default node;
