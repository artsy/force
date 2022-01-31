/**
 * @generated SignedSource<<1a66fdcb8ff5d047c5c65973ba78a3a4>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtworkBanner_Test_Query$variables = {};
export type ArtworkBanner_Test_Query$data = {
  readonly artwork: {
    readonly " $fragmentSpreads": FragmentRefs<"ArtworkBanner_artwork">;
  } | null;
};
export type ArtworkBanner_Test_Query = {
  variables: ArtworkBanner_Test_Query$variables;
  response: ArtworkBanner_Test_Query$data;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "richard-anuszkiewicz-lino-yellow-318"
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v3 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Literal",
        "name": "height",
        "value": 30
      },
      {
        "kind": "Literal",
        "name": "version",
        "value": "square"
      },
      {
        "kind": "Literal",
        "name": "width",
        "value": 30
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
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "width",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "height",
        "storageKey": null
      }
    ],
    "storageKey": "cropped(height:30,version:\"square\",width:30)"
  }
],
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "href",
  "storageKey": null
},
v5 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "String"
},
v6 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
},
v7 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
},
v8 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Image"
},
v9 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "CroppedImageUrl"
},
v10 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "Int"
},
v11 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Boolean"
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "ArtworkBanner_Test_Query",
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
            "name": "ArtworkBanner_artwork"
          }
        ],
        "storageKey": "artwork(id:\"richard-anuszkiewicz-lino-yellow-318\")"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "ArtworkBanner_Test_Query",
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
            "alias": null,
            "args": null,
            "concreteType": "Partner",
            "kind": "LinkedField",
            "name": "partner",
            "plural": false,
            "selections": [
              (v1/*: any*/),
              (v2/*: any*/)
            ],
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
                "name": "isBenefit",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "isGalleryAuction",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "Image",
                "kind": "LinkedField",
                "name": "coverImage",
                "plural": false,
                "selections": (v3/*: any*/),
                "storageKey": null
              },
              (v2/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": null,
            "kind": "LinkedField",
            "name": "context",
            "plural": false,
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
                  (v1/*: any*/),
                  (v4/*: any*/)
                ],
                "type": "Sale",
                "abstractKey": null
              },
              {
                "kind": "InlineFragment",
                "selections": [
                  (v1/*: any*/),
                  (v4/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Profile",
                    "kind": "LinkedField",
                    "name": "profile",
                    "plural": false,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Image",
                        "kind": "LinkedField",
                        "name": "icon",
                        "plural": false,
                        "selections": (v3/*: any*/),
                        "storageKey": null
                      },
                      (v2/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "type": "Fair",
                "abstractKey": null
              },
              {
                "kind": "InlineFragment",
                "selections": [
                  (v1/*: any*/),
                  (v4/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "status",
                    "storageKey": null
                  },
                  {
                    "alias": "thumbnail",
                    "args": null,
                    "concreteType": "Image",
                    "kind": "LinkedField",
                    "name": "coverImage",
                    "plural": false,
                    "selections": (v3/*: any*/),
                    "storageKey": null
                  }
                ],
                "type": "Show",
                "abstractKey": null
              },
              {
                "kind": "InlineFragment",
                "selections": [
                  (v2/*: any*/)
                ],
                "type": "Node",
                "abstractKey": "__isNode"
              }
            ],
            "storageKey": null
          },
          (v2/*: any*/)
        ],
        "storageKey": "artwork(id:\"richard-anuszkiewicz-lino-yellow-318\")"
      }
    ]
  },
  "params": {
    "cacheID": "889db42b90aa72e9032f34dfc83cfe31",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "artwork": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Artwork"
        },
        "artwork.context": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArtworkContext"
        },
        "artwork.context.__isNode": (v5/*: any*/),
        "artwork.context.__typename": (v5/*: any*/),
        "artwork.context.href": (v6/*: any*/),
        "artwork.context.id": (v7/*: any*/),
        "artwork.context.name": (v6/*: any*/),
        "artwork.context.profile": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Profile"
        },
        "artwork.context.profile.icon": (v8/*: any*/),
        "artwork.context.profile.icon.cropped": (v9/*: any*/),
        "artwork.context.profile.icon.cropped.height": (v10/*: any*/),
        "artwork.context.profile.icon.cropped.src": (v5/*: any*/),
        "artwork.context.profile.icon.cropped.srcSet": (v5/*: any*/),
        "artwork.context.profile.icon.cropped.width": (v10/*: any*/),
        "artwork.context.profile.id": (v7/*: any*/),
        "artwork.context.status": (v6/*: any*/),
        "artwork.context.thumbnail": (v8/*: any*/),
        "artwork.context.thumbnail.cropped": (v9/*: any*/),
        "artwork.context.thumbnail.cropped.height": (v10/*: any*/),
        "artwork.context.thumbnail.cropped.src": (v5/*: any*/),
        "artwork.context.thumbnail.cropped.srcSet": (v5/*: any*/),
        "artwork.context.thumbnail.cropped.width": (v10/*: any*/),
        "artwork.id": (v7/*: any*/),
        "artwork.partner": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Partner"
        },
        "artwork.partner.id": (v7/*: any*/),
        "artwork.partner.name": (v6/*: any*/),
        "artwork.sale": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Sale"
        },
        "artwork.sale.coverImage": (v8/*: any*/),
        "artwork.sale.coverImage.cropped": (v9/*: any*/),
        "artwork.sale.coverImage.cropped.height": (v10/*: any*/),
        "artwork.sale.coverImage.cropped.src": (v5/*: any*/),
        "artwork.sale.coverImage.cropped.srcSet": (v5/*: any*/),
        "artwork.sale.coverImage.cropped.width": (v10/*: any*/),
        "artwork.sale.id": (v7/*: any*/),
        "artwork.sale.isAuction": (v11/*: any*/),
        "artwork.sale.isBenefit": (v11/*: any*/),
        "artwork.sale.isGalleryAuction": (v11/*: any*/)
      }
    },
    "name": "ArtworkBanner_Test_Query",
    "operationKind": "query",
    "text": "query ArtworkBanner_Test_Query {\n  artwork(id: \"richard-anuszkiewicz-lino-yellow-318\") {\n    ...ArtworkBanner_artwork\n    id\n  }\n}\n\nfragment ArtworkBanner_artwork on Artwork {\n  partner {\n    name\n    id\n  }\n  sale {\n    isAuction\n    isBenefit\n    isGalleryAuction\n    coverImage {\n      cropped(width: 30, height: 30, version: \"square\") {\n        src\n        srcSet\n        width\n        height\n      }\n    }\n    id\n  }\n  context {\n    __typename\n    ... on Sale {\n      name\n      href\n    }\n    ... on Fair {\n      name\n      href\n      profile {\n        icon {\n          cropped(width: 30, height: 30, version: \"square\") {\n            src\n            srcSet\n            width\n            height\n          }\n        }\n        id\n      }\n    }\n    ... on Show {\n      name\n      href\n      status\n      thumbnail: coverImage {\n        cropped(width: 30, height: 30, version: \"square\") {\n          src\n          srcSet\n          width\n          height\n        }\n      }\n    }\n    ... on Node {\n      __isNode: __typename\n      id\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "775cfca3f13c570a75bcf0ffe92c6ba7";

export default node;
