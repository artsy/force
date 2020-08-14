/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArtworkAggregation = "COLOR" | "DIMENSION_RANGE" | "FOLLOWED_ARTISTS" | "GALLERY" | "INSTITUTION" | "MAJOR_PERIOD" | "MEDIUM" | "MERCHANDISABLE_ARTISTS" | "PARTNER_CITY" | "PERIOD" | "PRICE_RANGE" | "TOTAL" | "%future added value";
export type Dropdown_aggregation = {
    readonly slice: ArtworkAggregation | null;
    readonly counts: ReadonlyArray<{
        readonly name: string;
        readonly value: string;
        readonly count: number;
    } | null> | null;
    readonly " $refType": "Dropdown_aggregation";
};
export type Dropdown_aggregation$data = Dropdown_aggregation;
export type Dropdown_aggregation$key = {
    readonly " $data"?: Dropdown_aggregation$data;
    readonly " $fragmentRefs": FragmentRefs<"Dropdown_aggregation">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Dropdown_aggregation",
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
  "type": "ArtworksAggregationResults"
};
(node as any).hash = 'cfa7104f94415f28d4a9872916c6d67a';
export default node;
