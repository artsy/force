/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type PartnersRails_viewer = {
    readonly partnerCategories: ReadonlyArray<{
        readonly name: string | null;
        readonly slug: string;
        readonly " $fragmentRefs": FragmentRefs<"PartnersRail_partnerCategory">;
    } | null> | null;
    readonly " $refType": "PartnersRails_viewer";
};
export type PartnersRails_viewer$data = PartnersRails_viewer;
export type PartnersRails_viewer$key = {
    readonly " $data"?: PartnersRails_viewer$data;
    readonly " $fragmentRefs": FragmentRefs<"PartnersRails_viewer">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "categoryType",
      "type": "PartnerCategoryType"
    },
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "type",
      "type": "[PartnerClassification]"
    }
  ],
  "kind": "Fragment",
  "metadata": null,
  "name": "PartnersRails_viewer",
  "selections": [
    {
      "alias": null,
      "args": [
        {
          "kind": "Variable",
          "name": "categoryType",
          "variableName": "categoryType"
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
              "kind": "Variable",
              "name": "type",
              "variableName": "type"
            }
          ],
          "kind": "FragmentSpread",
          "name": "PartnersRail_partnerCategory"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Viewer"
};
(node as any).hash = 'a33b2f28aa2428dbc99b19cdb5620187';
export default node;
