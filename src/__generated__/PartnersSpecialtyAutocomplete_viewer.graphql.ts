/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type PartnersSpecialtyAutocomplete_viewer = {
    readonly allOptions: {
        readonly aggregations: ReadonlyArray<{
            readonly counts: ReadonlyArray<{
                readonly text: string;
                readonly value: string;
                readonly count: number;
            } | null> | null;
        } | null> | null;
    } | null;
    readonly filterPartners: {
        readonly total: number | null;
        readonly aggregations: ReadonlyArray<{
            readonly counts: ReadonlyArray<{
                readonly text: string;
                readonly value: string;
                readonly count: number;
            } | null> | null;
        } | null> | null;
    } | null;
    readonly " $refType": "PartnersSpecialtyAutocomplete_viewer";
};
export type PartnersSpecialtyAutocomplete_viewer$data = PartnersSpecialtyAutocomplete_viewer;
export type PartnersSpecialtyAutocomplete_viewer$key = {
    readonly " $data"?: PartnersSpecialtyAutocomplete_viewer$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"PartnersSpecialtyAutocomplete_viewer">;
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
(node as any).hash = '83cb0f39611ce708c38a10346c4abe4b';
export default node;
