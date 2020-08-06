/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
export type ArtworkAggregation = "COLOR" | "DIMENSION_RANGE" | "FOLLOWED_ARTISTS" | "GALLERY" | "INSTITUTION" | "MAJOR_PERIOD" | "MEDIUM" | "MERCHANDISABLE_ARTISTS" | "PARTNER_CITY" | "PERIOD" | "PRICE_RANGE" | "TOTAL" | "%future added value";
import { FragmentRefs } from "relay-runtime";
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
  "kind": "Fragment",
  "name": "Dropdown_aggregation",
  "type": "ArtworksAggregationResults",
  "metadata": null,
  "argumentDefinitions": [],
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
        },
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "count",
          "args": null,
          "storageKey": null
        }
      ]
    }
  ]
};
(node as any).hash = 'cfa7104f94415f28d4a9872916c6d67a';
export default node;
