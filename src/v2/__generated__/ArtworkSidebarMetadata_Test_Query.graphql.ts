/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArtworkSidebarMetadata_Test_QueryVariables = {};
export type ArtworkSidebarMetadata_Test_QueryResponse = {
    readonly artwork: {
        readonly " $fragmentRefs": FragmentRefs<"ArtworkSidebarMetadata_artwork">;
    } | null;
};
export type ArtworkSidebarMetadata_Test_QueryRawResponse = {
    readonly artwork: ({
        readonly is_biddable: boolean | null;
        readonly edition_sets: ReadonlyArray<({
            readonly __typename: string;
            readonly id: string | null;
        }) | null> | null;
        readonly sale_artwork: ({
            readonly lot_label: string | null;
            readonly id: string | null;
        }) | null;
        readonly title: string | null;
        readonly date: string | null;
        readonly medium: string | null;
        readonly dimensions: ({
            readonly in: string | null;
            readonly cm: string | null;
        }) | null;
        readonly edition_of: string | null;
        readonly attributionClass: ({
            readonly shortDescription: string | null;
            readonly id: string | null;
        }) | null;
        readonly id: string | null;
    }) | null;
};
export type ArtworkSidebarMetadata_Test_Query = {
    readonly response: ArtworkSidebarMetadata_Test_QueryResponse;
    readonly variables: ArtworkSidebarMetadata_Test_QueryVariables;
    readonly rawResponse: ArtworkSidebarMetadata_Test_QueryRawResponse;
};



/*
query ArtworkSidebarMetadata_Test_Query {
  artwork(id: "josef-albers-homage-to-the-square-85") {
    ...ArtworkSidebarMetadata_artwork
    id
  }
}

fragment ArtworkSidebarClassification_artwork on Artwork {
  attributionClass {
    shortDescription
    id
  }
}

fragment ArtworkSidebarMetadata_artwork on Artwork {
  is_biddable: isBiddable
  edition_sets: editionSets {
    __typename
    id
  }
  sale_artwork: saleArtwork {
    lot_label: lotLabel
    id
  }
  ...ArtworkSidebarTitleInfo_artwork
  ...ArtworkSidebarSizeInfo_piece
  ...ArtworkSidebarClassification_artwork
}

fragment ArtworkSidebarSizeInfo_piece on Sellable {
  dimensions {
    in
    cm
  }
  edition_of: editionOf
}

fragment ArtworkSidebarTitleInfo_artwork on Artwork {
  title
  date
  medium
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
  "name": "id",
  "storageKey": null
},
v2 = {
  "type": "ID",
  "enumValues": null,
  "plural": false,
  "nullable": true
},
v3 = {
  "type": "String",
  "enumValues": null,
  "plural": false,
  "nullable": true
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "ArtworkSidebarMetadata_Test_Query",
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
            "name": "ArtworkSidebarMetadata_artwork"
          }
        ],
        "storageKey": "artwork(id:\"josef-albers-homage-to-the-square-85\")"
      }
    ],
    "type": "Query"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "ArtworkSidebarMetadata_Test_Query",
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
            "alias": "is_biddable",
            "args": null,
            "kind": "ScalarField",
            "name": "isBiddable",
            "storageKey": null
          },
          {
            "alias": "edition_sets",
            "args": null,
            "concreteType": "EditionSet",
            "kind": "LinkedField",
            "name": "editionSets",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "__typename",
                "storageKey": null
              },
              (v1/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": "sale_artwork",
            "args": null,
            "concreteType": "SaleArtwork",
            "kind": "LinkedField",
            "name": "saleArtwork",
            "plural": false,
            "selections": [
              {
                "alias": "lot_label",
                "args": null,
                "kind": "ScalarField",
                "name": "lotLabel",
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
            "alias": "edition_of",
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
                "name": "shortDescription",
                "storageKey": null
              },
              (v1/*: any*/)
            ],
            "storageKey": null
          },
          (v1/*: any*/)
        ],
        "storageKey": "artwork(id:\"josef-albers-homage-to-the-square-85\")"
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
        "artwork.id": (v2/*: any*/),
        "artwork.is_biddable": {
          "type": "Boolean",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "artwork.edition_sets": {
          "type": "EditionSet",
          "enumValues": null,
          "plural": true,
          "nullable": true
        },
        "artwork.sale_artwork": {
          "type": "SaleArtwork",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "artwork.edition_sets.__typename": {
          "type": "String",
          "enumValues": null,
          "plural": false,
          "nullable": false
        },
        "artwork.edition_sets.id": (v2/*: any*/),
        "artwork.sale_artwork.lot_label": (v3/*: any*/),
        "artwork.sale_artwork.id": (v2/*: any*/),
        "artwork.title": (v3/*: any*/),
        "artwork.date": (v3/*: any*/),
        "artwork.medium": (v3/*: any*/),
        "artwork.dimensions": {
          "type": "dimensions",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "artwork.edition_of": (v3/*: any*/),
        "artwork.attributionClass": {
          "type": "AttributionClass",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "artwork.dimensions.in": (v3/*: any*/),
        "artwork.dimensions.cm": (v3/*: any*/),
        "artwork.attributionClass.shortDescription": (v3/*: any*/),
        "artwork.attributionClass.id": (v2/*: any*/)
      }
    },
    "name": "ArtworkSidebarMetadata_Test_Query",
    "operationKind": "query",
    "text": "query ArtworkSidebarMetadata_Test_Query {\n  artwork(id: \"josef-albers-homage-to-the-square-85\") {\n    ...ArtworkSidebarMetadata_artwork\n    id\n  }\n}\n\nfragment ArtworkSidebarClassification_artwork on Artwork {\n  attributionClass {\n    shortDescription\n    id\n  }\n}\n\nfragment ArtworkSidebarMetadata_artwork on Artwork {\n  is_biddable: isBiddable\n  edition_sets: editionSets {\n    __typename\n    id\n  }\n  sale_artwork: saleArtwork {\n    lot_label: lotLabel\n    id\n  }\n  ...ArtworkSidebarTitleInfo_artwork\n  ...ArtworkSidebarSizeInfo_piece\n  ...ArtworkSidebarClassification_artwork\n}\n\nfragment ArtworkSidebarSizeInfo_piece on Sellable {\n  dimensions {\n    in\n    cm\n  }\n  edition_of: editionOf\n}\n\nfragment ArtworkSidebarTitleInfo_artwork on Artwork {\n  title\n  date\n  medium\n}\n"
  }
};
})();
(node as any).hash = 'dd4d5230349d325f3169449f95f19668';
export default node;
