/**
 * @generated SignedSource<<2a4d00476309a0a4759223dc1c034c40>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type GeneShow_gene$data = {
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
  readonly " $fragmentSpreads": FragmentRefs<"GeneMeta_gene" | "GeneArtworkFilter_gene" | "FollowGeneButton_gene">;
  readonly " $fragmentType": "GeneShow_gene";
};
export type GeneShow_gene$key = {
  readonly " $data"?: GeneShow_gene$data;
  readonly " $fragmentSpreads": FragmentRefs<"GeneShow_gene">;
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
      "name": "aggregations"
    },
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "input"
    },
    {
      "defaultValue": false,
      "kind": "LocalArgument",
      "name": "shouldFetchCounts"
    }
  ],
  "kind": "Fragment",
  "metadata": null,
  "name": "GeneShow_gene",
  "selections": [
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
    },
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
    }
  ],
  "type": "Gene",
  "abstractKey": null
};
})();

(node as any).hash = "d52cfba9ae30e2e941dccb64a97d6d3f";

export default node;
