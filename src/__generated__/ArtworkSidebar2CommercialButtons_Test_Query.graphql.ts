/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArtworkSidebar2CommercialButtons_Test_QueryVariables = {};
export type ArtworkSidebar2CommercialButtons_Test_QueryResponse = {
    readonly artwork: {
        readonly " $fragmentRefs": FragmentRefs<"ArtworkSidebar2CommercialButtons_artwork">;
    } | null;
};
export type ArtworkSidebar2CommercialButtons_Test_Query = {
    readonly response: ArtworkSidebar2CommercialButtons_Test_QueryResponse;
    readonly variables: ArtworkSidebar2CommercialButtons_Test_QueryVariables;
};



/*
query ArtworkSidebar2CommercialButtons_Test_Query {
  artwork(id: "josef-albers-homage-to-the-square-85") {
    ...ArtworkSidebar2CommercialButtons_artwork
    id
  }
}

fragment ArtworkSidebar2CommercialButtons_artwork on Artwork {
  ...ArtworkSidebar2EditionSets_artwork
  ...ArtworkSidebarCreateAlertButton_artwork
  artists {
    internalID
    id
  }
  internalID
  slug
  saleMessage
  isInquireable
  isAcquireable
  isOfferable
  isSold
  listPrice {
    __typename
    ... on PriceRange {
      display
    }
    ... on Money {
      display
    }
  }
  editionSets {
    id
    internalID
    isAcquireable
    isOfferable
    saleMessage
  }
}

fragment ArtworkSidebar2EditionSets_artwork on Artwork {
  isInquireable
  isOfferable
  isAcquireable
  editionSets {
    id
    internalID
    isOfferable
    isAcquireable
    saleMessage
    ...ArtworkSidebar2SizeInfo_piece
  }
}

fragment ArtworkSidebar2SizeInfo_piece on Sellable {
  __isSellable: __typename
  dimensions {
    in
    cm
  }
  editionOf
}

fragment ArtworkSidebarCreateAlertButton_artwork on Artwork {
  slug
  internalID
  title
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
  "name": "isOfferable",
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
  "name": "saleMessage",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "slug",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v8 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "display",
    "storageKey": null
  }
],
v9 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
},
v10 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
},
v11 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "String"
},
v12 = {
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
    "name": "ArtworkSidebar2CommercialButtons_Test_Query",
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
            "name": "ArtworkSidebar2CommercialButtons_artwork"
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
    "name": "ArtworkSidebar2CommercialButtons_Test_Query",
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
            "kind": "ScalarField",
            "name": "isInquireable",
            "storageKey": null
          },
          (v1/*: any*/),
          (v2/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "EditionSet",
            "kind": "LinkedField",
            "name": "editionSets",
            "plural": true,
            "selections": [
              (v3/*: any*/),
              (v4/*: any*/),
              (v1/*: any*/),
              (v2/*: any*/),
              (v5/*: any*/),
              {
                "kind": "InlineFragment",
                "selections": [
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
                    "kind": "ScalarField",
                    "name": "editionOf",
                    "storageKey": null
                  }
                ],
                "type": "Sellable",
                "abstractKey": "__isSellable"
              }
            ],
            "storageKey": null
          },
          (v6/*: any*/),
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
            "concreteType": "Artist",
            "kind": "LinkedField",
            "name": "artists",
            "plural": true,
            "selections": [
              (v4/*: any*/),
              (v7/*: any*/),
              (v6/*: any*/),
              (v3/*: any*/)
            ],
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
              (v4/*: any*/),
              (v3/*: any*/)
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
                  (v6/*: any*/),
                  (v7/*: any*/),
                  (v3/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          (v5/*: any*/),
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
                "selections": (v8/*: any*/),
                "type": "PriceRange",
                "abstractKey": null
              },
              {
                "kind": "InlineFragment",
                "selections": (v8/*: any*/),
                "type": "Money",
                "abstractKey": null
              }
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
    "cacheID": "82a2ca1153d1181561cc01e0acd7eec3",
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
        "artwork.artists.id": (v9/*: any*/),
        "artwork.artists.internalID": (v9/*: any*/),
        "artwork.artists.name": (v10/*: any*/),
        "artwork.artists.slug": (v9/*: any*/),
        "artwork.attributionClass": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "AttributionClass"
        },
        "artwork.attributionClass.id": (v9/*: any*/),
        "artwork.attributionClass.internalID": (v9/*: any*/),
        "artwork.editionSets": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "EditionSet"
        },
        "artwork.editionSets.__isSellable": (v11/*: any*/),
        "artwork.editionSets.dimensions": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "dimensions"
        },
        "artwork.editionSets.dimensions.cm": (v10/*: any*/),
        "artwork.editionSets.dimensions.in": (v10/*: any*/),
        "artwork.editionSets.editionOf": (v10/*: any*/),
        "artwork.editionSets.id": (v9/*: any*/),
        "artwork.editionSets.internalID": (v9/*: any*/),
        "artwork.editionSets.isAcquireable": (v12/*: any*/),
        "artwork.editionSets.isOfferable": (v12/*: any*/),
        "artwork.editionSets.saleMessage": (v10/*: any*/),
        "artwork.id": (v9/*: any*/),
        "artwork.internalID": (v9/*: any*/),
        "artwork.isAcquireable": (v12/*: any*/),
        "artwork.isInquireable": (v12/*: any*/),
        "artwork.isOfferable": (v12/*: any*/),
        "artwork.isSold": (v12/*: any*/),
        "artwork.listPrice": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ListPrice"
        },
        "artwork.listPrice.__typename": (v11/*: any*/),
        "artwork.listPrice.display": (v10/*: any*/),
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
        "artwork.mediumType.filterGene.id": (v9/*: any*/),
        "artwork.mediumType.filterGene.name": (v10/*: any*/),
        "artwork.mediumType.filterGene.slug": (v9/*: any*/),
        "artwork.saleMessage": (v10/*: any*/),
        "artwork.slug": (v9/*: any*/),
        "artwork.title": (v10/*: any*/)
      }
    },
    "name": "ArtworkSidebar2CommercialButtons_Test_Query",
    "operationKind": "query",
    "text": "query ArtworkSidebar2CommercialButtons_Test_Query {\n  artwork(id: \"josef-albers-homage-to-the-square-85\") {\n    ...ArtworkSidebar2CommercialButtons_artwork\n    id\n  }\n}\n\nfragment ArtworkSidebar2CommercialButtons_artwork on Artwork {\n  ...ArtworkSidebar2EditionSets_artwork\n  ...ArtworkSidebarCreateAlertButton_artwork\n  artists {\n    internalID\n    id\n  }\n  internalID\n  slug\n  saleMessage\n  isInquireable\n  isAcquireable\n  isOfferable\n  isSold\n  listPrice {\n    __typename\n    ... on PriceRange {\n      display\n    }\n    ... on Money {\n      display\n    }\n  }\n  editionSets {\n    id\n    internalID\n    isAcquireable\n    isOfferable\n    saleMessage\n  }\n}\n\nfragment ArtworkSidebar2EditionSets_artwork on Artwork {\n  isInquireable\n  isOfferable\n  isAcquireable\n  editionSets {\n    id\n    internalID\n    isOfferable\n    isAcquireable\n    saleMessage\n    ...ArtworkSidebar2SizeInfo_piece\n  }\n}\n\nfragment ArtworkSidebar2SizeInfo_piece on Sellable {\n  __isSellable: __typename\n  dimensions {\n    in\n    cm\n  }\n  editionOf\n}\n\nfragment ArtworkSidebarCreateAlertButton_artwork on Artwork {\n  slug\n  internalID\n  title\n  artists {\n    internalID\n    name\n    slug\n    id\n  }\n  attributionClass {\n    internalID\n    id\n  }\n  mediumType {\n    filterGene {\n      slug\n      name\n      id\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '48c3e590b179ac60a91ece7f67431142';
export default node;
