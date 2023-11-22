/**
 * @generated SignedSource<<4877837b8b637ef985f8ff8740bce61a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtworkTopContextBar_Test_Query$variables = Record<PropertyKey, never>;
export type ArtworkTopContextBar_Test_Query$data = {
  readonly artwork: {
    readonly " $fragmentSpreads": FragmentRefs<"ArtworkTopContextBar_artwork">;
  } | null | undefined;
};
export type ArtworkTopContextBar_Test_Query = {
  response: ArtworkTopContextBar_Test_Query$data;
  variables: ArtworkTopContextBar_Test_Query$variables;
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
    "args": null,
    "kind": "ScalarField",
    "name": "url",
    "storageKey": null
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
  "type": "Boolean"
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "ArtworkTopContextBar_Test_Query",
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
            "name": "ArtworkTopContextBar_artwork"
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
    "name": "ArtworkTopContextBar_Test_Query",
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
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "registrationEndsAt",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "isRegistrationClosed",
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
    "cacheID": "19c8361b490b2288ba2973d5489d8a21",
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
        "artwork.context.profile.icon.url": (v6/*: any*/),
        "artwork.context.profile.id": (v7/*: any*/),
        "artwork.context.status": (v6/*: any*/),
        "artwork.context.thumbnail": (v8/*: any*/),
        "artwork.context.thumbnail.url": (v6/*: any*/),
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
        "artwork.sale.coverImage.url": (v6/*: any*/),
        "artwork.sale.id": (v7/*: any*/),
        "artwork.sale.isAuction": (v9/*: any*/),
        "artwork.sale.isBenefit": (v9/*: any*/),
        "artwork.sale.isGalleryAuction": (v9/*: any*/),
        "artwork.sale.isRegistrationClosed": (v9/*: any*/),
        "artwork.sale.registrationEndsAt": (v6/*: any*/)
      }
    },
    "name": "ArtworkTopContextBar_Test_Query",
    "operationKind": "query",
    "text": "query ArtworkTopContextBar_Test_Query {\n  artwork(id: \"richard-anuszkiewicz-lino-yellow-318\") {\n    ...ArtworkTopContextBar_artwork\n    id\n  }\n}\n\nfragment ArtworkTopContextBar_artwork on Artwork {\n  partner {\n    name\n    id\n  }\n  sale {\n    isAuction\n    isBenefit\n    isGalleryAuction\n    coverImage {\n      url\n    }\n    ...RegistrationAuctionTimer_sale\n    id\n  }\n  context {\n    __typename\n    ... on Sale {\n      name\n      href\n    }\n    ... on Fair {\n      name\n      href\n      profile {\n        icon {\n          url\n        }\n        id\n      }\n    }\n    ... on Show {\n      name\n      href\n      status\n      thumbnail: coverImage {\n        url\n      }\n    }\n    ... on Node {\n      __isNode: __typename\n      id\n    }\n  }\n}\n\nfragment RegistrationAuctionTimer_sale on Sale {\n  registrationEndsAt\n  isRegistrationClosed\n}\n"
  }
};
})();

(node as any).hash = "7da0b728030eab40a23c0d60a44c5bd1";

export default node;
