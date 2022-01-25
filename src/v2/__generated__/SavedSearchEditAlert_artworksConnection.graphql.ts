/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArtworkAggregation = "ARTIST" | "ARTIST_NATIONALITY" | "ATTRIBUTION_CLASS" | "COLOR" | "DIMENSION_RANGE" | "FOLLOWED_ARTISTS" | "GALLERY" | "INSTITUTION" | "LOCATION_CITY" | "MAJOR_PERIOD" | "MATERIALS_TERMS" | "MEDIUM" | "MERCHANDISABLE_ARTISTS" | "PARTNER" | "PARTNER_CITY" | "PERIOD" | "PRICE_RANGE" | "TOTAL" | "%future added value";
export type SavedSearchEditAlert_artworksConnection = {
    readonly aggregations: ReadonlyArray<{
        readonly slice: ArtworkAggregation | null;
        readonly counts: ReadonlyArray<{
            readonly count: number;
            readonly name: string;
            readonly value: string;
        } | null> | null;
    } | null> | null;
    readonly " $refType": "SavedSearchEditAlert_artworksConnection";
};
export type SavedSearchEditAlert_artworksConnection$data = SavedSearchEditAlert_artworksConnection;
export type SavedSearchEditAlert_artworksConnection$key = {
    readonly " $data"?: SavedSearchEditAlert_artworksConnection$data;
    readonly " $fragmentRefs": FragmentRefs<"SavedSearchEditAlert_artworksConnection">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SavedSearchEditAlert_artworksConnection",
  "selections": [
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
          "kind": "ScalarField",
          "name": "slice",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "AggregationCount",
          "kind": "LinkedField",
          "name": "counts",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "count",
              "storageKey": null
            },
            {
              "alias": null,
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
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "FilterArtworksConnection",
  "abstractKey": null
};
(node as any).hash = 'f638f5b0fffb6c90f466999150fcc71e';
export default node;
