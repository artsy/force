/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
export type ArtworkAggregation = "COLOR" | "DIMENSION_RANGE" | "FOLLOWED_ARTISTS" | "GALLERY" | "INSTITUTION" | "MAJOR_PERIOD" | "MEDIUM" | "MERCHANDISABLE_ARTISTS" | "PARTNER_CITY" | "PERIOD" | "PRICE_RANGE" | "TOTAL" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type Works_artist = {
    readonly internalID: string;
    readonly related: {
        readonly artistsConnection: {
            readonly edges: ReadonlyArray<{
                readonly node: {
                    readonly id: string;
                } | null;
            } | null> | null;
        } | null;
    } | null;
    readonly sidebarAggregations: {
        readonly aggregations: ReadonlyArray<{
            readonly slice: ArtworkAggregation | null;
            readonly counts: ReadonlyArray<{
                readonly name: string;
                readonly value: string;
            } | null> | null;
        } | null> | null;
    } | null;
    readonly " $fragmentRefs": FragmentRefs<"ArtistTopWorksRail_artist" | "ArtistSeriesRail_artist" | "ArtistArtworkFilter_artist">;
    readonly " $refType": "Works_artist";
};
export type Works_artist$data = Works_artist;
export type Works_artist$key = {
    readonly " $data"?: Works_artist$data;
    readonly " $fragmentRefs": FragmentRefs<"Works_artist">;
};



const node: ReaderFragment = (function(){
var v0 = {
  "kind": "Variable",
  "name": "aggregations",
  "variableName": "aggregations"
},
v1 = {
  "kind": "Variable",
  "name": "page",
  "variableName": "page"
},
v2 = {
  "kind": "Variable",
  "name": "sort",
  "variableName": "sort"
};
return {
  "kind": "Fragment",
  "name": "Works_artist",
  "type": "Artist",
  "metadata": null,
  "argumentDefinitions": [
    {
      "kind": "LocalArgument",
      "name": "acquireable",
      "type": "Boolean",
      "defaultValue": null
    },
    {
      "kind": "LocalArgument",
      "name": "aggregations",
      "type": "[ArtworkAggregation]",
      "defaultValue": null
    },
    {
      "kind": "LocalArgument",
      "name": "artistID",
      "type": "String",
      "defaultValue": null
    },
    {
      "kind": "LocalArgument",
      "name": "atAuction",
      "type": "Boolean",
      "defaultValue": null
    },
    {
      "kind": "LocalArgument",
      "name": "attributionClass",
      "type": "[String]",
      "defaultValue": null
    },
    {
      "kind": "LocalArgument",
      "name": "color",
      "type": "String",
      "defaultValue": null
    },
    {
      "kind": "LocalArgument",
      "name": "forSale",
      "type": "Boolean",
      "defaultValue": null
    },
    {
      "kind": "LocalArgument",
      "name": "height",
      "type": "String",
      "defaultValue": null
    },
    {
      "kind": "LocalArgument",
      "name": "inquireableOnly",
      "type": "Boolean",
      "defaultValue": null
    },
    {
      "kind": "LocalArgument",
      "name": "keyword",
      "type": "String",
      "defaultValue": null
    },
    {
      "kind": "LocalArgument",
      "name": "majorPeriods",
      "type": "[String]",
      "defaultValue": null
    },
    {
      "kind": "LocalArgument",
      "name": "medium",
      "type": "String",
      "defaultValue": "*"
    },
    {
      "kind": "LocalArgument",
      "name": "offerable",
      "type": "Boolean",
      "defaultValue": null
    },
    {
      "kind": "LocalArgument",
      "name": "page",
      "type": "Int",
      "defaultValue": null
    },
    {
      "kind": "LocalArgument",
      "name": "partnerID",
      "type": "ID",
      "defaultValue": null
    },
    {
      "kind": "LocalArgument",
      "name": "priceRange",
      "type": "String",
      "defaultValue": null
    },
    {
      "kind": "LocalArgument",
      "name": "sizes",
      "type": "[ArtworkSizes]",
      "defaultValue": null
    },
    {
      "kind": "LocalArgument",
      "name": "sort",
      "type": "String",
      "defaultValue": "-partner_updated_at"
    },
    {
      "kind": "LocalArgument",
      "name": "width",
      "type": "String",
      "defaultValue": null
    },
    {
      "kind": "LocalArgument",
      "name": "shouldFetchArtistSeriesData",
      "type": "Boolean!",
      "defaultValue": false
    }
  ],
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "internalID",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "related",
      "storageKey": null,
      "args": null,
      "concreteType": "ArtistRelatedData",
      "plural": false,
      "selections": [
        {
          "kind": "LinkedField",
          "alias": null,
          "name": "artistsConnection",
          "storageKey": "artistsConnection(first:1)",
          "args": [
            {
              "kind": "Literal",
              "name": "first",
              "value": 1
            }
          ],
          "concreteType": "ArtistConnection",
          "plural": false,
          "selections": [
            {
              "kind": "LinkedField",
              "alias": null,
              "name": "edges",
              "storageKey": null,
              "args": null,
              "concreteType": "ArtistEdge",
              "plural": true,
              "selections": [
                {
                  "kind": "LinkedField",
                  "alias": null,
                  "name": "node",
                  "storageKey": null,
                  "args": null,
                  "concreteType": "Artist",
                  "plural": false,
                  "selections": [
                    {
                      "kind": "ScalarField",
                      "alias": null,
                      "name": "id",
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
      "alias": "sidebarAggregations",
      "name": "filterArtworksConnection",
      "storageKey": null,
      "args": [
        {
          "kind": "Literal",
          "name": "after",
          "value": ""
        },
        (v0/*: any*/),
        {
          "kind": "Literal",
          "name": "first",
          "value": 30
        },
        (v1/*: any*/),
        (v2/*: any*/)
      ],
      "concreteType": "FilterArtworksConnection",
      "plural": false,
      "selections": [
        {
          "kind": "LinkedField",
          "alias": null,
          "name": "aggregations",
          "storageKey": null,
          "args": null,
          "concreteType": "ArtworksAggregationResults",
          "plural": true,
          "selections": [
            {
              "kind": "ScalarField",
              "alias": null,
              "name": "slice",
              "args": null,
              "storageKey": null
            },
            {
              "kind": "LinkedField",
              "alias": null,
              "name": "counts",
              "storageKey": null,
              "args": null,
              "concreteType": "AggregationCount",
              "plural": true,
              "selections": [
                {
                  "kind": "ScalarField",
                  "alias": null,
                  "name": "name",
                  "args": null,
                  "storageKey": null
                },
                {
                  "kind": "ScalarField",
                  "alias": null,
                  "name": "value",
                  "args": null,
                  "storageKey": null
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "kind": "FragmentSpread",
      "name": "ArtistTopWorksRail_artist",
      "args": null
    },
    {
      "kind": "Condition",
      "passingValue": true,
      "condition": "shouldFetchArtistSeriesData",
      "selections": [
        {
          "kind": "FragmentSpread",
          "name": "ArtistSeriesRail_artist",
          "args": null
        }
      ]
    },
    {
      "kind": "FragmentSpread",
      "name": "ArtistArtworkFilter_artist",
      "args": [
        {
          "kind": "Variable",
          "name": "acquireable",
          "variableName": "acquireable"
        },
        (v0/*: any*/),
        {
          "kind": "Variable",
          "name": "artistID",
          "variableName": "artistID"
        },
        {
          "kind": "Variable",
          "name": "atAuction",
          "variableName": "atAuction"
        },
        {
          "kind": "Variable",
          "name": "attributionClass",
          "variableName": "attributionClass"
        },
        {
          "kind": "Variable",
          "name": "color",
          "variableName": "color"
        },
        {
          "kind": "Variable",
          "name": "forSale",
          "variableName": "forSale"
        },
        {
          "kind": "Variable",
          "name": "height",
          "variableName": "height"
        },
        {
          "kind": "Variable",
          "name": "inquireableOnly",
          "variableName": "inquireableOnly"
        },
        {
          "kind": "Variable",
          "name": "keyword",
          "variableName": "keyword"
        },
        {
          "kind": "Variable",
          "name": "majorPeriods",
          "variableName": "majorPeriods"
        },
        {
          "kind": "Variable",
          "name": "medium",
          "variableName": "medium"
        },
        {
          "kind": "Variable",
          "name": "offerable",
          "variableName": "offerable"
        },
        (v1/*: any*/),
        {
          "kind": "Variable",
          "name": "partnerID",
          "variableName": "partnerID"
        },
        {
          "kind": "Variable",
          "name": "priceRange",
          "variableName": "priceRange"
        },
        {
          "kind": "Variable",
          "name": "sizes",
          "variableName": "sizes"
        },
        (v2/*: any*/),
        {
          "kind": "Variable",
          "name": "width",
          "variableName": "width"
        }
      ]
    }
  ]
};
})();
(node as any).hash = '1d0b76b4072c686cc173b58c5382b61a';
export default node;
