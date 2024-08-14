/**
 * @generated SignedSource<<248882de7f775465c5007d340e0d09c8>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtworkFilterArtworkGrid_filtered_artworks$data = {
  readonly edges: ReadonlyArray<{
    readonly node: {
      readonly collectorSignals: {
        readonly partnerOffer: {
          readonly isActive: boolean | null | undefined;
        } | null | undefined;
      } | null | undefined;
      readonly id: string;
    } | null | undefined;
  } | null | undefined> | null | undefined;
  readonly id: string;
  readonly pageCursors: {
    readonly " $fragmentSpreads": FragmentRefs<"Pagination_pageCursors">;
  };
  readonly pageInfo: {
    readonly endCursor: string | null | undefined;
    readonly hasNextPage: boolean;
  };
  readonly " $fragmentSpreads": FragmentRefs<"ArtworkGrid_artworks">;
  readonly " $fragmentType": "ArtworkFilterArtworkGrid_filtered_artworks";
};
export type ArtworkFilterArtworkGrid_filtered_artworks$key = {
  readonly " $data"?: ArtworkFilterArtworkGrid_filtered_artworks$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArtworkFilterArtworkGrid_filtered_artworks">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "argumentDefinitions": [
    {
      "defaultValue": true,
      "kind": "LocalArgument",
      "name": "includeBlurHash"
    }
  ],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtworkFilterArtworkGrid_filtered_artworks",
  "selections": [
    (v0/*: any*/),
    {
      "alias": null,
      "args": null,
      "concreteType": "PageInfo",
      "kind": "LinkedField",
      "name": "pageInfo",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "hasNextPage",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "endCursor",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "PageCursors",
      "kind": "LinkedField",
      "name": "pageCursors",
      "plural": false,
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "Pagination_pageCursors"
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "FilterArtworksEdge",
      "kind": "LinkedField",
      "name": "edges",
      "plural": true,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "Artwork",
          "kind": "LinkedField",
          "name": "node",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "CollectorSignals",
              "kind": "LinkedField",
              "name": "collectorSignals",
              "plural": false,
              "selections": [
                {
                  "alias": null,
                  "args": null,
                  "concreteType": "PartnerOfferToCollector",
                  "kind": "LinkedField",
                  "name": "partnerOffer",
                  "plural": false,
                  "selections": [
                    {
                      "alias": null,
                      "args": null,
                      "kind": "ScalarField",
                      "name": "isActive",
                      "storageKey": null
                    }
                  ],
                  "storageKey": null
                }
              ],
              "storageKey": null
            },
            (v0/*: any*/)
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "args": [
        {
          "kind": "Variable",
          "name": "includeBlurHash",
          "variableName": "includeBlurHash"
        }
      ],
      "kind": "FragmentSpread",
      "name": "ArtworkGrid_artworks"
    }
  ],
  "type": "FilterArtworksConnection",
  "abstractKey": null
};
})();

(node as any).hash = "0f25265235e9c0f4a8ef5110fa5a42ff";

export default node;
