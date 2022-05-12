/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type WorksForYouApp_viewerSidebarAggregations = {
    readonly sidebarAggregations: {
        readonly counts: {
            readonly followedArtists: number | null;
        } | null;
        readonly aggregations: ReadonlyArray<{
            readonly counts: ReadonlyArray<{
                readonly label: string;
                readonly value: string;
                readonly count: number;
            } | null> | null;
        } | null> | null;
    } | null;
    readonly " $refType": "WorksForYouApp_viewerSidebarAggregations";
};
export type WorksForYouApp_viewerSidebarAggregations$data = WorksForYouApp_viewerSidebarAggregations;
export type WorksForYouApp_viewerSidebarAggregations$key = {
    readonly " $data"?: WorksForYouApp_viewerSidebarAggregations$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"WorksForYouApp_viewerSidebarAggregations">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "WorksForYouApp_viewerSidebarAggregations",
  "selections": [
    {
      "alias": "sidebarAggregations",
      "args": [
        {
          "kind": "Literal",
          "name": "aggregations",
          "value": [
            "ARTIST",
            "FOLLOWED_ARTISTS"
          ]
        },
        {
          "kind": "Literal",
          "name": "first",
          "value": 1
        }
      ],
      "concreteType": "FilterArtworksConnection",
      "kind": "LinkedField",
      "name": "artworksConnection",
      "plural": false,
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
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "ArtworksAggregationResults",
          "kind": "LinkedField",
          "name": "aggregations",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "AggregationCount",
              "kind": "LinkedField",
              "name": "counts",
              "plural": true,
              "selections": [
                {
                  "alias": "label",
                  "args": null,
                  "kind": "ScalarField",
                  "name": "name",
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "value",
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "count",
                  "storageKey": null
                }
              ],
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": "artworksConnection(aggregations:[\"ARTIST\",\"FOLLOWED_ARTISTS\"],first:1)"
    }
  ],
  "type": "Viewer",
  "abstractKey": null
};
(node as any).hash = '7e36e409b95bf75382ba07f101eb702e';
export default node;
