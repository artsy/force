/**
 * @generated SignedSource<<197df1ea7ae37ac6e0028b6b7507c94a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtworkSidebar2_Test_Query$variables = {};
export type ArtworkSidebar2_Test_Query$data = {
  readonly artwork: {
    readonly " $fragmentSpreads": FragmentRefs<"ArtworkSidebar2_artwork">;
  } | null;
};
export type ArtworkSidebar2_Test_Query = {
  response: ArtworkSidebar2_Test_Query$data;
  variables: ArtworkSidebar2_Test_Query$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "josef-albers-homage-to-the-square-85"
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "slug",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isAcquireable",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isOfferable",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "saleMessage",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
  "storageKey": null
},
v8 = {
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
      "name": "in",
      "storageKey": null
    },
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
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "editionOf",
  "storageKey": null
},
v10 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "display",
    "storageKey": null
  }
],
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "href",
  "storageKey": null
},
v12 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
},
v13 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
},
v14 = {
  "enumValues": null,
  "nullable": true,
  "plural": true,
  "type": "String"
},
v15 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "dimensions"
},
v16 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "String"
},
v17 = {
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
    "name": "ArtworkSidebar2_Test_Query",
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
            "name": "ArtworkSidebar2_artwork"
          }
        ],
        "storageKey": "artwork(id:\"josef-albers-homage-to-the-square-85\")"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "ArtworkSidebar2_Test_Query",
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
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "isSold",
            "storageKey": null
          },
          (v2/*: any*/),
          (v3/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "isInAuction",
            "storageKey": null
          },
          (v4/*: any*/),
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
            "name": "title",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "culturalMaker",
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
              (v1/*: any*/),
              (v5/*: any*/),
              (v6/*: any*/),
              (v7/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "medium",
            "storageKey": null
          },
          (v8/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "ArtworkInfoRow",
            "kind": "LinkedField",
            "name": "framed",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "details",
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          (v9/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "AttributionClass",
            "kind": "LinkedField",
            "name": "attributionClass",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "shortArrayDescription",
                "storageKey": null
              },
              (v6/*: any*/),
              (v7/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "hasCertificateOfAuthenticity",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "isBiddable",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "isInquireable",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "EditionSet",
            "kind": "LinkedField",
            "name": "editionSets",
            "plural": true,
            "selections": [
              (v6/*: any*/),
              (v7/*: any*/),
              (v3/*: any*/),
              (v2/*: any*/),
              (v4/*: any*/),
              {
                "kind": "InlineFragment",
                "selections": [
                  (v8/*: any*/),
                  (v9/*: any*/)
                ],
                "type": "Sellable",
                "abstractKey": "__isSellable"
              }
            ],
            "storageKey": null
          },
          (v7/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "ArtworkMedium",
            "kind": "LinkedField",
            "name": "mediumType",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "Gene",
                "kind": "LinkedField",
                "name": "filterGene",
                "plural": false,
                "selections": [
                  (v1/*: any*/),
                  (v5/*: any*/),
                  (v6/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": null,
            "kind": "LinkedField",
            "name": "listPrice",
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
                "selections": (v10/*: any*/),
                "type": "PriceRange",
                "abstractKey": null
              },
              {
                "kind": "InlineFragment",
                "selections": (v10/*: any*/),
                "type": "Money",
                "abstractKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "shippingOrigin",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "shippingInfo",
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
              (v5/*: any*/),
              (v11/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "cities",
                "storageKey": null
              },
              (v6/*: any*/)
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
              (v5/*: any*/),
              (v11/*: any*/),
              (v6/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "isClosed",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "startAt",
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "SaleArtwork",
            "kind": "LinkedField",
            "name": "saleArtwork",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "lotID",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "extendedBiddingEndAt",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "endAt",
                "storageKey": null
              },
              (v6/*: any*/)
            ],
            "storageKey": null
          },
          (v6/*: any*/)
        ],
        "storageKey": "artwork(id:\"josef-albers-homage-to-the-square-85\")"
      }
    ]
  },
  "params": {
    "cacheID": "774c4b666589b62284409e89a15ec807",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "artwork": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Artwork"
        },
        "artwork.artists": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "Artist"
        },
        "artwork.artists.id": (v12/*: any*/),
        "artwork.artists.internalID": (v12/*: any*/),
        "artwork.artists.name": (v13/*: any*/),
        "artwork.artists.slug": (v12/*: any*/),
        "artwork.attributionClass": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "AttributionClass"
        },
        "artwork.attributionClass.id": (v12/*: any*/),
        "artwork.attributionClass.internalID": (v12/*: any*/),
        "artwork.attributionClass.shortArrayDescription": (v14/*: any*/),
        "artwork.culturalMaker": (v13/*: any*/),
        "artwork.date": (v13/*: any*/),
        "artwork.dimensions": (v15/*: any*/),
        "artwork.dimensions.cm": (v13/*: any*/),
        "artwork.dimensions.in": (v13/*: any*/),
        "artwork.editionOf": (v13/*: any*/),
        "artwork.editionSets": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "EditionSet"
        },
        "artwork.editionSets.__isSellable": (v16/*: any*/),
        "artwork.editionSets.dimensions": (v15/*: any*/),
        "artwork.editionSets.dimensions.cm": (v13/*: any*/),
        "artwork.editionSets.dimensions.in": (v13/*: any*/),
        "artwork.editionSets.editionOf": (v13/*: any*/),
        "artwork.editionSets.id": (v12/*: any*/),
        "artwork.editionSets.internalID": (v12/*: any*/),
        "artwork.editionSets.isAcquireable": (v17/*: any*/),
        "artwork.editionSets.isOfferable": (v17/*: any*/),
        "artwork.editionSets.saleMessage": (v13/*: any*/),
        "artwork.framed": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArtworkInfoRow"
        },
        "artwork.framed.details": (v13/*: any*/),
        "artwork.hasCertificateOfAuthenticity": (v17/*: any*/),
        "artwork.id": (v12/*: any*/),
        "artwork.internalID": (v12/*: any*/),
        "artwork.isAcquireable": (v17/*: any*/),
        "artwork.isBiddable": (v17/*: any*/),
        "artwork.isInAuction": (v17/*: any*/),
        "artwork.isInquireable": (v17/*: any*/),
        "artwork.isOfferable": (v17/*: any*/),
        "artwork.isSold": (v17/*: any*/),
        "artwork.listPrice": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ListPrice"
        },
        "artwork.listPrice.__typename": (v16/*: any*/),
        "artwork.listPrice.display": (v13/*: any*/),
        "artwork.medium": (v13/*: any*/),
        "artwork.mediumType": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArtworkMedium"
        },
        "artwork.mediumType.filterGene": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Gene"
        },
        "artwork.mediumType.filterGene.id": (v12/*: any*/),
        "artwork.mediumType.filterGene.name": (v13/*: any*/),
        "artwork.mediumType.filterGene.slug": (v12/*: any*/),
        "artwork.partner": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Partner"
        },
        "artwork.partner.cities": (v14/*: any*/),
        "artwork.partner.href": (v13/*: any*/),
        "artwork.partner.id": (v12/*: any*/),
        "artwork.partner.name": (v13/*: any*/),
        "artwork.sale": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Sale"
        },
        "artwork.sale.href": (v12/*: any*/),
        "artwork.sale.id": (v11/*: any*/),
        "artwork.sale.isClosed": (v15/*: any*/),
        "artwork.sale.name": (v12/*: any*/),
        "artwork.sale.startAt": (v12/*: any*/),
        "artwork.saleArtwork": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "SaleArtwork"
        },
        "artwork.saleArtwork.endAt": (v13/*: any*/),
        "artwork.saleArtwork.extendedBiddingEndAt": (v13/*: any*/),
        "artwork.saleArtwork.id": (v12/*: any*/),
        "artwork.saleArtwork.lotID": (v13/*: any*/),
        "artwork.saleMessage": (v13/*: any*/),
        "artwork.shippingInfo": (v13/*: any*/),
        "artwork.shippingOrigin": (v13/*: any*/),
        "artwork.slug": (v12/*: any*/),
        "artwork.title": (v13/*: any*/)
      }
    },
    "name": "ArtworkSidebar2_Test_Query",
    "operationKind": "query",
    "text": "query ArtworkSidebar2_Test_Query {\n  artwork(id: \"josef-albers-homage-to-the-square-85\") {\n    ...ArtworkSidebar2_artwork\n    id\n  }\n}\n\nfragment ArtworkSidebar2Artists_artwork on Artwork {\n  culturalMaker\n  artists {\n    slug\n    name\n    id\n  }\n}\n\nfragment ArtworkSidebar2ArtworkTitle_artwork on Artwork {\n  date\n  title\n}\n\nfragment ArtworkSidebar2AuthenticityCertificate_artwork on Artwork {\n  hasCertificateOfAuthenticity\n  isBiddable\n}\n\nfragment ArtworkSidebar2Classification_artwork on Artwork {\n  attributionClass {\n    shortArrayDescription\n    id\n  }\n}\n\nfragment ArtworkSidebar2CommercialButtons_artwork on Artwork {\n  ...ArtworkSidebar2EditionSets_artwork\n  ...ArtworkSidebarCreateAlertButton_artwork\n  artists {\n    internalID\n    id\n  }\n  internalID\n  slug\n  saleMessage\n  isInquireable\n  isAcquireable\n  isOfferable\n  isSold\n  listPrice {\n    __typename\n    ... on PriceRange {\n      display\n    }\n    ... on Money {\n      display\n    }\n  }\n  editionSets {\n    id\n    internalID\n    isAcquireable\n    isOfferable\n    saleMessage\n  }\n}\n\nfragment ArtworkSidebar2CreateArtworkAlert_artwork on Artwork {\n  internalID\n  title\n  slug\n  artists {\n    internalID\n    name\n    slug\n    id\n  }\n  attributionClass {\n    internalID\n    id\n  }\n  mediumType {\n    filterGene {\n      slug\n      name\n      id\n    }\n  }\n}\n\nfragment ArtworkSidebar2Details_artwork on Artwork {\n  medium\n  dimensions {\n    in\n    cm\n  }\n  framed {\n    details\n  }\n  editionOf\n  ...ArtworkSidebar2Classification_artwork\n  ...ArtworkSidebar2AuthenticityCertificate_artwork\n}\n\nfragment ArtworkSidebar2EditionSets_artwork on Artwork {\n  isInquireable\n  isOfferable\n  isAcquireable\n  editionSets {\n    id\n    internalID\n    isOfferable\n    isAcquireable\n    saleMessage\n    ...ArtworkSidebar2SizeInfo_piece\n  }\n}\n\nfragment ArtworkSidebar2PartnerInfo_artwork on Artwork {\n  internalID\n  slug\n  isInquireable\n  isInAuction\n  partner {\n    name\n    href\n    cities\n    id\n  }\n  sale {\n    name\n    href\n    id\n  }\n}\n\nfragment ArtworkSidebar2ShippingInformation_artwork on Artwork {\n  shippingOrigin\n  shippingInfo\n}\n\nfragment ArtworkSidebar2SizeInfo_piece on Sellable {\n  __isSellable: __typename\n  dimensions {\n    in\n    cm\n  }\n  editionOf\n}\n\nfragment ArtworkSidebar2_artwork on Artwork {\n  slug\n  isSold\n  isAcquireable\n  isOfferable\n  isInAuction\n  saleMessage\n  ...ArtworkSidebar2ArtworkTitle_artwork\n  ...ArtworkSidebar2Artists_artwork\n  ...ArtworkSidebar2Details_artwork\n  ...ArtworkSidebar2CommercialButtons_artwork\n  ...ArtworkSidebar2ShippingInformation_artwork\n  ...ArtworkSidebar2PartnerInfo_artwork\n  ...ArtworkSidebar2CreateArtworkAlert_artwork\n  sale {\n    startAt\n    id\n  }\n  saleArtwork {\n    lotID\n    extendedBiddingEndAt\n    endAt\n    id\n  }\n  artists {\n    internalID\n    id\n  }\n}\n\nfragment ArtworkSidebarCreateAlertButton_artwork on Artwork {\n  slug\n  internalID\n  title\n  artists {\n    internalID\n    name\n    slug\n    id\n  }\n  attributionClass {\n    internalID\n    id\n  }\n  mediumType {\n    filterGene {\n      slug\n      name\n      id\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "294f17acf004be6c6ab46fe052d8338b";

export default node;
