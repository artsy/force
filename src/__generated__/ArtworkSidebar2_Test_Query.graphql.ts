/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArtworkSidebar2_Test_QueryVariables = {};
export type ArtworkSidebar2_Test_QueryResponse = {
    readonly artwork: {
        readonly " $fragmentRefs": FragmentRefs<"ArtworkSidebar2_artwork">;
    } | null;
};
export type ArtworkSidebar2_Test_Query = {
    readonly response: ArtworkSidebar2_Test_QueryResponse;
    readonly variables: ArtworkSidebar2_Test_QueryVariables;
};



/*
query ArtworkSidebar2_Test_Query {
  artwork(id: "josef-albers-homage-to-the-square-85") {
    ...ArtworkSidebar2_artwork
    id
  }
}

fragment ArtworkSidebar2Artists_artwork on Artwork {
  culturalMaker
  artists {
    slug
    name
    id
  }
}

fragment ArtworkSidebar2ArtworkTitle_artwork on Artwork {
  date
  title
}

fragment ArtworkSidebar2AuthenticityCertificate_artwork on Artwork {
  hasCertificateOfAuthenticity
  isBiddable
}

fragment ArtworkSidebar2Classification_artwork on Artwork {
  attributionClass {
    shortArrayDescription
    id
  }
}

fragment ArtworkSidebar2CreateArtworkAlert_artwork on Artwork {
  internalID
  title
  slug
  artists {
    internalID
    name
    slug
    id
  }
  attributionClass {
    internalID
    id
  }
  mediumType {
    filterGene {
      slug
      name
      id
    }
  }
}

fragment ArtworkSidebar2Details_artwork on Artwork {
  medium
  dimensions {
    in
    cm
  }
  framed {
    details
  }
  editionOf
  ...ArtworkSidebar2Classification_artwork
  ...ArtworkSidebar2AuthenticityCertificate_artwork
}

fragment ArtworkSidebar2EditionSets_artwork on Artwork {
  isInquireable
  isOfferable
  isAcquireable
  editionSets {
    id
    isOfferable
    isAcquireable
    saleMessage
    ...ArtworkSidebar2SizeInfo_piece
  }
}

fragment ArtworkSidebar2Links_artwork on Artwork {
  isInAuction
  sale {
    isClosed
    id
  }
}

fragment ArtworkSidebar2PartnerInfo_artwork on Artwork {
  internalID
  slug
  isInquireable
  isInAuction
  partner {
    name
    href
    cities
    id
  }
  sale {
    name
    href
    id
  }
}

fragment ArtworkSidebar2ShippingInformation_artwork on Artwork {
  shippingOrigin
  shippingInfo
}

fragment ArtworkSidebar2SizeInfo_piece on Sellable {
  __isSellable: __typename
  dimensions {
    in
    cm
  }
  editionOf
}

fragment ArtworkSidebar2_artwork on Artwork {
  slug
  isSold
  isAcquireable
  isOfferable
  isInAuction
  saleMessage
  ...ArtworkSidebar2ArtworkTitle_artwork
  ...ArtworkSidebar2Artists_artwork
  ...ArtworkSidebar2Details_artwork
  ...ArtworkSidebar2EditionSets_artwork
  ...ArtworkSidebar2ShippingInformation_artwork
  ...ArtworkSidebar2PartnerInfo_artwork
  ...ArtworkSidebar2CreateArtworkAlert_artwork
  ...ArtworkSidebar2Links_artwork
  sale {
    startAt
    id
  }
  saleArtwork {
    lotID
    extendedBiddingEndAt
    endAt
    id
  }
  artists {
    internalID
    id
  }
}
*/

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
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "href",
  "storageKey": null
},
v11 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
},
v12 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
},
v13 = {
  "enumValues": null,
  "nullable": true,
  "plural": true,
  "type": "String"
},
v14 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "dimensions"
},
v15 = {
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
          (v7/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "Partner",
            "kind": "LinkedField",
            "name": "partner",
            "plural": false,
            "selections": [
              (v5/*: any*/),
              (v10/*: any*/),
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
              (v10/*: any*/),
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
    "cacheID": "d9e7d5bba6d8cf0e5dc85b83b7553831",
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
        "artwork.artists.id": (v11/*: any*/),
        "artwork.artists.internalID": (v11/*: any*/),
        "artwork.artists.name": (v12/*: any*/),
        "artwork.artists.slug": (v11/*: any*/),
        "artwork.attributionClass": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "AttributionClass"
        },
        "artwork.attributionClass.id": (v11/*: any*/),
        "artwork.attributionClass.internalID": (v11/*: any*/),
        "artwork.attributionClass.shortArrayDescription": (v13/*: any*/),
        "artwork.culturalMaker": (v12/*: any*/),
        "artwork.date": (v12/*: any*/),
        "artwork.dimensions": (v14/*: any*/),
        "artwork.dimensions.cm": (v12/*: any*/),
        "artwork.dimensions.in": (v12/*: any*/),
        "artwork.editionOf": (v12/*: any*/),
        "artwork.editionSets": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "EditionSet"
        },
        "artwork.editionSets.__isSellable": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "String"
        },
        "artwork.editionSets.dimensions": (v14/*: any*/),
        "artwork.editionSets.dimensions.cm": (v12/*: any*/),
        "artwork.editionSets.dimensions.in": (v12/*: any*/),
        "artwork.editionSets.editionOf": (v12/*: any*/),
        "artwork.editionSets.id": (v11/*: any*/),
        "artwork.editionSets.isAcquireable": (v15/*: any*/),
        "artwork.editionSets.isOfferable": (v15/*: any*/),
        "artwork.editionSets.saleMessage": (v12/*: any*/),
        "artwork.framed": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArtworkInfoRow"
        },
        "artwork.framed.details": (v12/*: any*/),
        "artwork.hasCertificateOfAuthenticity": (v15/*: any*/),
        "artwork.id": (v11/*: any*/),
        "artwork.internalID": (v11/*: any*/),
        "artwork.isAcquireable": (v15/*: any*/),
        "artwork.isBiddable": (v15/*: any*/),
        "artwork.isInAuction": (v15/*: any*/),
        "artwork.isInquireable": (v15/*: any*/),
        "artwork.isOfferable": (v15/*: any*/),
        "artwork.isSold": (v15/*: any*/),
        "artwork.medium": (v12/*: any*/),
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
        "artwork.mediumType.filterGene.id": (v11/*: any*/),
        "artwork.mediumType.filterGene.name": (v12/*: any*/),
        "artwork.mediumType.filterGene.slug": (v11/*: any*/),
        "artwork.partner": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Partner"
        },
        "artwork.partner.cities": (v13/*: any*/),
        "artwork.partner.href": (v12/*: any*/),
        "artwork.partner.id": (v11/*: any*/),
        "artwork.partner.name": (v12/*: any*/),
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
        "artwork.saleArtwork.endAt": (v12/*: any*/),
        "artwork.saleArtwork.extendedBiddingEndAt": (v12/*: any*/),
        "artwork.saleArtwork.id": (v11/*: any*/),
        "artwork.saleArtwork.lotID": (v12/*: any*/),
        "artwork.saleMessage": (v12/*: any*/),
        "artwork.shippingInfo": (v12/*: any*/),
        "artwork.shippingOrigin": (v12/*: any*/),
        "artwork.slug": (v11/*: any*/),
        "artwork.title": (v12/*: any*/)
      }
    },
    "name": "ArtworkSidebar2_Test_Query",
    "operationKind": "query",
    "text": "query ArtworkSidebar2_Test_Query {\n  artwork(id: \"josef-albers-homage-to-the-square-85\") {\n    ...ArtworkSidebar2_artwork\n    id\n  }\n}\n\nfragment ArtworkSidebar2Artists_artwork on Artwork {\n  culturalMaker\n  artists {\n    slug\n    name\n    id\n  }\n}\n\nfragment ArtworkSidebar2ArtworkTitle_artwork on Artwork {\n  date\n  title\n}\n\nfragment ArtworkSidebar2AuthenticityCertificate_artwork on Artwork {\n  hasCertificateOfAuthenticity\n  isBiddable\n}\n\nfragment ArtworkSidebar2Classification_artwork on Artwork {\n  attributionClass {\n    shortArrayDescription\n    id\n  }\n}\n\nfragment ArtworkSidebar2CreateArtworkAlert_artwork on Artwork {\n  internalID\n  title\n  slug\n  artists {\n    internalID\n    name\n    slug\n    id\n  }\n  attributionClass {\n    internalID\n    id\n  }\n  mediumType {\n    filterGene {\n      slug\n      name\n      id\n    }\n  }\n}\n\nfragment ArtworkSidebar2Details_artwork on Artwork {\n  medium\n  dimensions {\n    in\n    cm\n  }\n  framed {\n    details\n  }\n  editionOf\n  ...ArtworkSidebar2Classification_artwork\n  ...ArtworkSidebar2AuthenticityCertificate_artwork\n}\n\nfragment ArtworkSidebar2EditionSets_artwork on Artwork {\n  isInquireable\n  isOfferable\n  isAcquireable\n  editionSets {\n    id\n    isOfferable\n    isAcquireable\n    saleMessage\n    ...ArtworkSidebar2SizeInfo_piece\n  }\n}\n\nfragment ArtworkSidebar2Links_artwork on Artwork {\n  isInAuction\n  sale {\n    isClosed\n    id\n  }\n}\n\nfragment ArtworkSidebar2PartnerInfo_artwork on Artwork {\n  internalID\n  slug\n  isInquireable\n  isInAuction\n  partner {\n    name\n    href\n    cities\n    id\n  }\n  sale {\n    name\n    href\n    id\n  }\n}\n\nfragment ArtworkSidebar2ShippingInformation_artwork on Artwork {\n  shippingOrigin\n  shippingInfo\n}\n\nfragment ArtworkSidebar2SizeInfo_piece on Sellable {\n  __isSellable: __typename\n  dimensions {\n    in\n    cm\n  }\n  editionOf\n}\n\nfragment ArtworkSidebar2_artwork on Artwork {\n  slug\n  isSold\n  isAcquireable\n  isOfferable\n  isInAuction\n  saleMessage\n  ...ArtworkSidebar2ArtworkTitle_artwork\n  ...ArtworkSidebar2Artists_artwork\n  ...ArtworkSidebar2Details_artwork\n  ...ArtworkSidebar2EditionSets_artwork\n  ...ArtworkSidebar2ShippingInformation_artwork\n  ...ArtworkSidebar2PartnerInfo_artwork\n  ...ArtworkSidebar2CreateArtworkAlert_artwork\n  ...ArtworkSidebar2Links_artwork\n  sale {\n    startAt\n    id\n  }\n  saleArtwork {\n    lotID\n    extendedBiddingEndAt\n    endAt\n    id\n  }\n  artists {\n    internalID\n    id\n  }\n}\n"
  }
};
})();
(node as any).hash = '294f17acf004be6c6ab46fe052d8338b';
export default node;
