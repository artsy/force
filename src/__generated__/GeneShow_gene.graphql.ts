/**
 * @generated SignedSource<<80cd456d6d033fe8f0aa9bad83a4a630>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type GeneShow_gene$data = {
  readonly artistsConnection: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly href: string | null;
        readonly internalID: string;
        readonly name: string | null;
      } | null;
    } | null> | null;
  } | null;
  readonly displayName: string | null;
  readonly formattedDescription: string | null;
  readonly name: string | null;
  readonly similar: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly href: string | null;
        readonly internalID: string;
        readonly name: string | null;
      } | null;
    } | null> | null;
  } | null;
  readonly " $fragmentSpreads": FragmentRefs<"FollowGeneButton_gene" | "GeneArtworkFilter_gene" | "GeneMeta_gene">;
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
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "displayName",
      "storageKey": null
    },
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

(node as any).hash = "08451d4b8e9ae7f26fd88085b5648485";

export default node;
