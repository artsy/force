/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type GalleriesRoute_viewer = {
    readonly partnerCategories: ReadonlyArray<{
        readonly name: string | null;
        readonly slug: string;
        readonly " $fragmentRefs": FragmentRefs<"PartnersRail_partnerCategory">;
    } | null> | null;
    readonly " $fragmentRefs": FragmentRefs<"PartnersFeaturedCarousel_viewer">;
    readonly " $refType": "GalleriesRoute_viewer";
};
export type GalleriesRoute_viewer$data = GalleriesRoute_viewer;
export type GalleriesRoute_viewer$key = {
    readonly " $data"?: GalleriesRoute_viewer$data;
    readonly " $fragmentRefs": FragmentRefs<"GalleriesRoute_viewer">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "GalleriesRoute_viewer",
  "selections": [
    {
      "alias": null,
      "args": [
        {
          "kind": "Literal",
          "name": "categoryType",
          "value": "GALLERY"
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
              "value": "GALLERY"
            }
          ],
          "kind": "FragmentSpread",
          "name": "PartnersRail_partnerCategory"
        }
      ],
      "storageKey": "partnerCategories(categoryType:\"GALLERY\",internal:false,size:50)"
    },
    {
      "args": [
        {
          "kind": "Literal",
          "name": "id",
          "value": "5638fdfb7261690296000031"
        }
      ],
      "kind": "FragmentSpread",
      "name": "PartnersFeaturedCarousel_viewer"
    }
  ],
  "type": "Viewer"
};
(node as any).hash = 'e5c5a9b83ff147c0fadf2d43f013d0c5';
export default node;
