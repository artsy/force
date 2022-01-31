/**
 * @generated SignedSource<<30b4fa45e1cec3ad846493d457813c80>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtworkSidebarMetadata_Test_Query$variables = {};
export type ArtworkSidebarMetadata_Test_Query$data = {
  readonly artwork: {
    readonly " $fragmentSpreads": FragmentRefs<"ArtworkSidebarMetadata_artwork">;
  } | null;
};
export type ArtworkSidebarMetadata_Test_Query$rawResponse = {
  readonly artwork: {
    readonly is_biddable: boolean | null;
    readonly edition_sets: ReadonlyArray<{
      readonly __typename: string;
      readonly id: string;
    } | null> | null;
    readonly sale_artwork: {
      readonly lot_label: string | null;
      readonly id: string;
    } | null;
    readonly title: string | null;
    readonly date: string | null;
    readonly medium: string | null;
    readonly __isSellable: "Artwork";
    readonly dimensions: {
      readonly in: string | null;
      readonly cm: string | null;
    } | null;
    readonly edition_of: string | null;
    readonly attributionClass: {
      readonly shortDescription: string | null;
      readonly id: string;
    } | null;
    readonly id: string;
  } | null;
};
export type ArtworkSidebarMetadata_Test_Query = {
  variables: ArtworkSidebarMetadata_Test_Query$variables;
  response: ArtworkSidebarMetadata_Test_Query$data;
  rawResponse: ArtworkSidebarMetadata_Test_Query$rawResponse;
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
  "name": "id",
  "storageKey": null
},
v2 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "String"
},
v3 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
},
v4 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
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
    "type": "Query",
    "abstractKey": null
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
                "alias": "edition_of",
                "args": null,
                "kind": "ScalarField",
                "name": "editionOf",
                "storageKey": null
              }
            ],
            "type": "Sellable",
            "abstractKey": "__isSellable"
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
    "cacheID": "d0536723808ebb1873a9413c6f66180b",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "artwork": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Artwork"
        },
        "artwork.__isSellable": (v2/*: any*/),
        "artwork.attributionClass": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "AttributionClass"
        },
        "artwork.attributionClass.id": (v3/*: any*/),
        "artwork.attributionClass.shortDescription": (v4/*: any*/),
        "artwork.date": (v4/*: any*/),
        "artwork.dimensions": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "dimensions"
        },
        "artwork.dimensions.cm": (v4/*: any*/),
        "artwork.dimensions.in": (v4/*: any*/),
        "artwork.edition_of": (v4/*: any*/),
        "artwork.edition_sets": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "EditionSet"
        },
        "artwork.edition_sets.__typename": (v2/*: any*/),
        "artwork.edition_sets.id": (v3/*: any*/),
        "artwork.id": (v3/*: any*/),
        "artwork.is_biddable": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Boolean"
        },
        "artwork.medium": (v4/*: any*/),
        "artwork.sale_artwork": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "SaleArtwork"
        },
        "artwork.sale_artwork.id": (v3/*: any*/),
        "artwork.sale_artwork.lot_label": (v4/*: any*/),
        "artwork.title": (v4/*: any*/)
      }
    },
    "name": "ArtworkSidebarMetadata_Test_Query",
    "operationKind": "query",
    "text": "query ArtworkSidebarMetadata_Test_Query {\n  artwork(id: \"josef-albers-homage-to-the-square-85\") {\n    ...ArtworkSidebarMetadata_artwork\n    id\n  }\n}\n\nfragment ArtworkSidebarClassification_artwork on Artwork {\n  attributionClass {\n    shortDescription\n    id\n  }\n}\n\nfragment ArtworkSidebarMetadata_artwork on Artwork {\n  is_biddable: isBiddable\n  edition_sets: editionSets {\n    __typename\n    id\n  }\n  sale_artwork: saleArtwork {\n    lot_label: lotLabel\n    id\n  }\n  ...ArtworkSidebarTitleInfo_artwork\n  ...ArtworkSidebarSizeInfo_piece\n  ...ArtworkSidebarClassification_artwork\n}\n\nfragment ArtworkSidebarSizeInfo_piece on Sellable {\n  __isSellable: __typename\n  dimensions {\n    in\n    cm\n  }\n  edition_of: editionOf\n}\n\nfragment ArtworkSidebarTitleInfo_artwork on Artwork {\n  title\n  date\n  medium\n}\n"
  }
};
})();

(node as any).hash = "dd4d5230349d325f3169449f95f19668";

export default node;
