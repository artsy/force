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
  ...ArtworkSidebar2ShippingInformation_artwork
  ...ArtworkSidebar2PartnerInfo_artwork
  ...ArtworkSidebar2CreateArtworkAlert_artwork
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
  "name": "name",
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
  "name": "internalID",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "href",
  "storageKey": null
},
v6 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
},
v7 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
},
v8 = {
  "enumValues": null,
  "nullable": true,
  "plural": true,
  "type": "String"
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
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "isAcquireable",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "isOfferable",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "isInAuction",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "saleMessage",
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
              (v2/*: any*/),
              (v3/*: any*/),
              (v4/*: any*/)
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
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "editionOf",
            "storageKey": null
          },
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
              (v3/*: any*/),
              (v4/*: any*/)
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
          (v4/*: any*/),
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
            "concreteType": "Partner",
            "kind": "LinkedField",
            "name": "partner",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              (v5/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "cities",
                "storageKey": null
              },
              (v3/*: any*/)
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
              (v2/*: any*/),
              (v5/*: any*/),
              (v3/*: any*/),
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
                  (v2/*: any*/),
                  (v3/*: any*/)
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
              (v3/*: any*/)
            ],
            "storageKey": null
          },
          (v3/*: any*/)
        ],
        "storageKey": "artwork(id:\"josef-albers-homage-to-the-square-85\")"
      }
    ]
  },
  "params": {
    "cacheID": "d8cc3b6dc9def69f270e940327610c5a",
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
        "artwork.artists.id": (v6/*: any*/),
        "artwork.artists.internalID": (v6/*: any*/),
        "artwork.artists.name": (v7/*: any*/),
        "artwork.artists.slug": (v6/*: any*/),
        "artwork.attributionClass": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "AttributionClass"
        },
        "artwork.attributionClass.id": (v6/*: any*/),
        "artwork.attributionClass.internalID": (v6/*: any*/),
        "artwork.attributionClass.shortArrayDescription": (v8/*: any*/),
        "artwork.culturalMaker": (v7/*: any*/),
        "artwork.date": (v7/*: any*/),
        "artwork.dimensions": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "dimensions"
        },
        "artwork.dimensions.cm": (v7/*: any*/),
        "artwork.dimensions.in": (v7/*: any*/),
        "artwork.editionOf": (v7/*: any*/),
        "artwork.framed": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArtworkInfoRow"
        },
        "artwork.framed.details": (v7/*: any*/),
        "artwork.hasCertificateOfAuthenticity": (v9/*: any*/),
        "artwork.id": (v6/*: any*/),
        "artwork.internalID": (v6/*: any*/),
        "artwork.isAcquireable": (v9/*: any*/),
        "artwork.isBiddable": (v9/*: any*/),
        "artwork.isInAuction": (v9/*: any*/),
        "artwork.isInquireable": (v9/*: any*/),
        "artwork.isOfferable": (v9/*: any*/),
        "artwork.isSold": (v9/*: any*/),
        "artwork.medium": (v7/*: any*/),
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
        "artwork.mediumType.filterGene.id": (v6/*: any*/),
        "artwork.mediumType.filterGene.name": (v7/*: any*/),
        "artwork.mediumType.filterGene.slug": (v6/*: any*/),
        "artwork.partner": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Partner"
        },
        "artwork.partner.cities": (v8/*: any*/),
        "artwork.partner.href": (v7/*: any*/),
        "artwork.partner.id": (v6/*: any*/),
        "artwork.partner.name": (v7/*: any*/),
        "artwork.sale": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Sale"
        },
        "artwork.sale.href": (v7/*: any*/),
        "artwork.sale.id": (v6/*: any*/),
        "artwork.sale.name": (v7/*: any*/),
        "artwork.sale.startAt": (v7/*: any*/),
        "artwork.saleArtwork": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "SaleArtwork"
        },
        "artwork.saleArtwork.endAt": (v7/*: any*/),
        "artwork.saleArtwork.extendedBiddingEndAt": (v7/*: any*/),
        "artwork.saleArtwork.id": (v6/*: any*/),
        "artwork.saleArtwork.lotID": (v7/*: any*/),
        "artwork.saleMessage": (v7/*: any*/),
        "artwork.shippingInfo": (v7/*: any*/),
        "artwork.shippingOrigin": (v7/*: any*/),
        "artwork.slug": (v6/*: any*/),
        "artwork.title": (v7/*: any*/)
      }
    },
    "name": "ArtworkSidebar2_Test_Query",
    "operationKind": "query",
    "text": "query ArtworkSidebar2_Test_Query {\n  artwork(id: \"josef-albers-homage-to-the-square-85\") {\n    ...ArtworkSidebar2_artwork\n    id\n  }\n}\n\nfragment ArtworkSidebar2Artists_artwork on Artwork {\n  culturalMaker\n  artists {\n    slug\n    name\n    id\n  }\n}\n\nfragment ArtworkSidebar2ArtworkTitle_artwork on Artwork {\n  date\n  title\n}\n\nfragment ArtworkSidebar2AuthenticityCertificate_artwork on Artwork {\n  hasCertificateOfAuthenticity\n  isBiddable\n}\n\nfragment ArtworkSidebar2Classification_artwork on Artwork {\n  attributionClass {\n    shortArrayDescription\n    id\n  }\n}\n\nfragment ArtworkSidebar2CreateArtworkAlert_artwork on Artwork {\n  internalID\n  title\n  slug\n  artists {\n    internalID\n    name\n    slug\n    id\n  }\n  attributionClass {\n    internalID\n    id\n  }\n  mediumType {\n    filterGene {\n      slug\n      name\n      id\n    }\n  }\n}\n\nfragment ArtworkSidebar2Details_artwork on Artwork {\n  medium\n  dimensions {\n    in\n    cm\n  }\n  framed {\n    details\n  }\n  editionOf\n  ...ArtworkSidebar2Classification_artwork\n  ...ArtworkSidebar2AuthenticityCertificate_artwork\n}\n\nfragment ArtworkSidebar2PartnerInfo_artwork on Artwork {\n  internalID\n  slug\n  isInquireable\n  isInAuction\n  partner {\n    name\n    href\n    cities\n    id\n  }\n  sale {\n    name\n    href\n    id\n  }\n}\n\nfragment ArtworkSidebar2ShippingInformation_artwork on Artwork {\n  shippingOrigin\n  shippingInfo\n}\n\nfragment ArtworkSidebar2_artwork on Artwork {\n  slug\n  isSold\n  isAcquireable\n  isOfferable\n  isInAuction\n  saleMessage\n  ...ArtworkSidebar2ArtworkTitle_artwork\n  ...ArtworkSidebar2Artists_artwork\n  ...ArtworkSidebar2Details_artwork\n  ...ArtworkSidebar2ShippingInformation_artwork\n  ...ArtworkSidebar2PartnerInfo_artwork\n  ...ArtworkSidebar2CreateArtworkAlert_artwork\n  sale {\n    startAt\n    id\n  }\n  saleArtwork {\n    lotID\n    extendedBiddingEndAt\n    endAt\n    id\n  }\n  artists {\n    internalID\n    id\n  }\n}\n"
  }
};
})();
(node as any).hash = '294f17acf004be6c6ab46fe052d8338b';
export default node;
