/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type FairArtworks_fair = {
    readonly slug: string;
    readonly internalID: string;
    readonly filtered_artworks: {
        readonly id: string;
        readonly counts?: {
            readonly followedArtists: number | null;
        } | null;
        readonly " $fragmentRefs": FragmentRefs<"ArtworkFilterArtworkGrid2_filtered_artworks">;
    } | null;
    readonly " $refType": "FairArtworks_fair";
};
export type FairArtworks_fair$data = FairArtworks_fair;
export type FairArtworks_fair$key = {
    readonly " $data"?: FairArtworks_fair$data;
    readonly " $fragmentRefs": FragmentRefs<"FairArtworks_fair">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "acquireable",
      "type": "Boolean"
    },
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "aggregations",
      "type": "[ArtworkAggregation]"
    },
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "artistIDs",
      "type": "[String]"
    },
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "atAuction",
      "type": "Boolean"
    },
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "color",
      "type": "String"
    },
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "forSale",
      "type": "Boolean"
    },
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "includeArtworksByFollowedArtists",
      "type": "Boolean"
    },
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "inquireableOnly",
      "type": "Boolean"
    },
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "majorPeriods",
      "type": "[String]"
    },
    {
      "defaultValue": "*",
      "kind": "LocalArgument",
      "name": "medium",
      "type": "String"
    },
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "offerable",
      "type": "Boolean"
    },
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "page",
      "type": "Int"
    },
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "partnerID",
      "type": "ID"
    },
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "priceRange",
      "type": "String"
    },
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "sizes",
      "type": "[ArtworkSizes]"
    },
    {
      "defaultValue": "-partner_updated_at",
      "kind": "LocalArgument",
      "name": "sort",
      "type": "String"
    },
    {
      "defaultValue": false,
      "kind": "LocalArgument",
      "name": "shouldFetchCounts",
      "type": "Boolean"
    }
  ],
  "kind": "Fragment",
  "metadata": null,
  "name": "FairArtworks_fair",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "slug",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "internalID",
      "storageKey": null
    },
    {
      "alias": "filtered_artworks",
      "args": [
        {
          "kind": "Variable",
          "name": "acquireable",
          "variableName": "acquireable"
        },
        {
          "kind": "Literal",
          "name": "after",
          "value": ""
        },
        {
          "kind": "Variable",
          "name": "aggregations",
          "variableName": "aggregations"
        },
        {
          "kind": "Variable",
          "name": "artistIDs",
          "variableName": "artistIDs"
        },
        {
          "kind": "Variable",
          "name": "atAuction",
          "variableName": "atAuction"
        },
        {
          "kind": "Variable",
          "name": "color",
          "variableName": "color"
        },
        {
          "kind": "Literal",
          "name": "first",
          "value": 20
        },
        {
          "kind": "Variable",
          "name": "forSale",
          "variableName": "forSale"
        },
        {
          "kind": "Variable",
          "name": "includeArtworksByFollowedArtists",
          "variableName": "includeArtworksByFollowedArtists"
        },
        {
          "kind": "Variable",
          "name": "inquireableOnly",
          "variableName": "inquireableOnly"
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
        {
          "kind": "Variable",
          "name": "page",
          "variableName": "page"
        },
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
        {
          "kind": "Variable",
          "name": "sort",
          "variableName": "sort"
        }
      ],
      "concreteType": "FilterArtworksConnection",
      "kind": "LinkedField",
      "name": "filterArtworksConnection",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "id",
          "storageKey": null
        },
        {
          "condition": "shouldFetchCounts",
          "kind": "Condition",
          "passingValue": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "FilterArtworksCounts",
              "kind": "LinkedField",
              "name": "counts",
              "plural": false,
              "selections": [
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "followedArtists",
                  "storageKey": null
                }
              ],
              "storageKey": null
            }
          ]
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "ArtworkFilterArtworkGrid2_filtered_artworks"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Fair"
};
(node as any).hash = '191d55abe04178038276e723b4ef0093';
export default node;
