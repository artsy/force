/**
 * @generated SignedSource<<56815c4a3ed8f6c7c3957f25dd95480e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PartnersSpecialtyAutocomplete_viewer$data = {
  readonly allOptions: {
    readonly aggregations: ReadonlyArray<{
      readonly counts: ReadonlyArray<{
        readonly count: number;
        readonly text: string;
        readonly value: string;
      } | null | undefined> | null | undefined;
    } | null | undefined> | null | undefined;
  } | null | undefined;
  readonly filterPartners: {
    readonly aggregations: ReadonlyArray<{
      readonly counts: ReadonlyArray<{
        readonly count: number;
        readonly text: string;
        readonly value: string;
      } | null | undefined> | null | undefined;
    } | null | undefined> | null | undefined;
    readonly total: number | null | undefined;
  } | null | undefined;
  readonly " $fragmentType": "PartnersSpecialtyAutocomplete_viewer";
};
export type PartnersSpecialtyAutocomplete_viewer$key = {
  readonly " $data"?: PartnersSpecialtyAutocomplete_viewer$data;
  readonly " $fragmentSpreads": FragmentRefs<"PartnersSpecialtyAutocomplete_viewer">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "kind": "Literal",
  "name": "defaultProfilePublic",
  "value": true
},
v1 = {
  "kind": "Literal",
  "name": "eligibleForListing",
  "value": true
},
v2 = {
  "kind": "Literal",
  "name": "size",
  "value": 0
},
v3 = {
  "alias": null,
  "args": null,
  "concreteType": "PartnersAggregationResults",
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
          "alias": "text",
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
};
return {
  "argumentDefinitions": [
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "near"
    },
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "type"
    }
  ],
  "kind": "Fragment",
  "metadata": null,
  "name": "PartnersSpecialtyAutocomplete_viewer",
  "selections": [
    {
      "alias": "allOptions",
      "args": [
        {
          "kind": "Literal",
          "name": "aggregations",
          "value": [
            "CATEGORY"
          ]
        },
        (v0/*: any*/),
        (v1/*: any*/),
        (v2/*: any*/)
      ],
      "concreteType": "FilterPartners",
      "kind": "LinkedField",
      "name": "filterPartners",
      "plural": false,
      "selections": [
        (v3/*: any*/)
      ],
      "storageKey": "filterPartners(aggregations:[\"CATEGORY\"],defaultProfilePublic:true,eligibleForListing:true,size:0)"
    },
    {
      "alias": null,
      "args": [
        {
          "kind": "Literal",
          "name": "aggregations",
          "value": [
            "CATEGORY",
            "TOTAL"
          ]
        },
        (v0/*: any*/),
        (v1/*: any*/),
        {
          "kind": "Variable",
          "name": "near",
          "variableName": "near"
        },
        (v2/*: any*/),
        {
          "kind": "Variable",
          "name": "type",
          "variableName": "type"
        }
      ],
      "concreteType": "FilterPartners",
      "kind": "LinkedField",
      "name": "filterPartners",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "total",
          "storageKey": null
        },
        (v3/*: any*/)
      ],
      "storageKey": null
    }
  ],
  "type": "Viewer",
  "abstractKey": null
};
})();

(node as any).hash = "83cb0f39611ce708c38a10346c4abe4b";

export default node;
