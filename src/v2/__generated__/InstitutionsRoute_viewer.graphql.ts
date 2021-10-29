/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type InstitutionsRoute_viewer = {
    readonly partnerCategories: ReadonlyArray<{
        readonly name: string | null;
        readonly slug: string;
        readonly " $fragmentRefs": FragmentRefs<"PartnersRail_partnerCategory">;
    } | null> | null;
    readonly " $fragmentRefs": FragmentRefs<"PartnersFeaturedCarousel_viewer">;
    readonly " $refType": "InstitutionsRoute_viewer";
};
export type InstitutionsRoute_viewer$data = InstitutionsRoute_viewer;
export type InstitutionsRoute_viewer$key = {
    readonly " $data"?: InstitutionsRoute_viewer$data;
    readonly " $fragmentRefs": FragmentRefs<"InstitutionsRoute_viewer">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "InstitutionsRoute_viewer",
  "selections": [
    {
      "alias": null,
      "args": [
        {
          "kind": "Literal",
          "name": "categoryType",
          "value": "INSTITUTION"
        },
        {
          "kind": "Literal",
          "name": "internal",
          "value": false
        },
        {
          "kind": "Literal",
          "name": "size",
          "value": 50
        }
      ],
      "concreteType": "PartnerCategory",
      "kind": "LinkedField",
      "name": "partnerCategories",
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
          "name": "slug",
          "storageKey": null
        },
        {
          "args": [
            {
              "kind": "Literal",
              "name": "type",
              "value": "INSTITUTION"
            }
          ],
          "kind": "FragmentSpread",
          "name": "PartnersRail_partnerCategory"
        }
      ],
      "storageKey": "partnerCategories(categoryType:\"INSTITUTION\",internal:false,size:50)"
    },
    {
      "args": [
        {
          "kind": "Literal",
          "name": "id",
          "value": "564e181a258faf3d5c000080"
        }
      ],
      "kind": "FragmentSpread",
      "name": "PartnersFeaturedCarousel_viewer"
    }
  ],
  "type": "Viewer"
};
(node as any).hash = '4bbf1101a55a168cb787473f66e0d5d8';
export default node;
