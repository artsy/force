/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type GeneShow_gene = {
    readonly name: string | null;
    readonly formattedDescription: string | null;
    readonly similar: {
        readonly edges: ReadonlyArray<{
            readonly node: {
                readonly internalID: string;
                readonly name: string | null;
                readonly href: string | null;
            } | null;
        } | null> | null;
    } | null;
    readonly artistsConnection: {
        readonly edges: ReadonlyArray<{
            readonly node: {
                readonly internalID: string;
                readonly name: string | null;
                readonly href: string | null;
            } | null;
        } | null> | null;
    } | null;
    readonly " $fragmentRefs": FragmentRefs<"GeneMeta_gene" | "GeneArtworkFilter_gene" | "FollowGeneButton_gene">;
    readonly " $refType": "GeneShow_gene";
};
export type GeneShow_gene$data = GeneShow_gene;
export type GeneShow_gene$key = {
    readonly " $data"?: GeneShow_gene$data;
    readonly " $fragmentRefs": FragmentRefs<"GeneShow_gene">;
};



const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v1 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 10
  }
],
v2 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "internalID",
    "storageKey": null
  },
  (v0/*: any*/),
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "href",
    "storageKey": null
  }
];
return {
  "argumentDefinitions": [
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "input",
      "type": "FilterArtworksInput"
    },
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "aggregations",
      "type": "[ArtworkAggregation]"
    },
    {
      "defaultValue": false,
      "kind": "LocalArgument",
      "name": "shouldFetchCounts",
      "type": "Boolean!"
    }
  ],
  "kind": "Fragment",
  "metadata": null,
  "name": "GeneShow_gene",
  "selections": [
    (v0/*: any*/),
    {
      "alias": "formattedDescription",
      "args": [
        {
          "kind": "Literal",
          "name": "format",
          "value": "HTML"
        }
      ],
      "kind": "ScalarField",
      "name": "description",
      "storageKey": "description(format:\"HTML\")"
    },
    {
      "alias": null,
      "args": (v1/*: any*/),
      "concreteType": "GeneConnection",
      "kind": "LinkedField",
      "name": "similar",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "GeneEdge",
          "kind": "LinkedField",
          "name": "edges",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "Gene",
              "kind": "LinkedField",
              "name": "node",
              "plural": false,
              "selections": (v2/*: any*/),
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": "similar(first:10)"
    },
    {
      "alias": null,
      "args": (v1/*: any*/),
      "concreteType": "ArtistConnection",
      "kind": "LinkedField",
      "name": "artistsConnection",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "ArtistEdge",
          "kind": "LinkedField",
          "name": "edges",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "Artist",
              "kind": "LinkedField",
              "name": "node",
              "plural": false,
              "selections": (v2/*: any*/),
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": "artistsConnection(first:10)"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "GeneMeta_gene"
    },
    {
      "args": [
        {
          "kind": "Variable",
          "name": "aggregations",
          "variableName": "aggregations"
        },
        {
          "kind": "Variable",
          "name": "input",
          "variableName": "input"
        },
        {
          "kind": "Variable",
          "name": "shouldFetchCounts",
          "variableName": "shouldFetchCounts"
        }
      ],
      "kind": "FragmentSpread",
      "name": "GeneArtworkFilter_gene"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "FollowGeneButton_gene"
    }
  ],
  "type": "Gene"
};
})();
(node as any).hash = 'd52cfba9ae30e2e941dccb64a97d6d3f';
export default node;
