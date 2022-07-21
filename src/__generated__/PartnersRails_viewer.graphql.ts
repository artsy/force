/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type PartnersRails_viewer = {
    readonly partnerCategories: ReadonlyArray<{
        readonly name: string | null;
        readonly slug: string;
    } | null> | null;
    readonly " $refType": "PartnersRails_viewer";
};
export type PartnersRails_viewer$data = PartnersRails_viewer;
export type PartnersRails_viewer$key = {
    readonly " $data"?: PartnersRails_viewer$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"PartnersRails_viewer">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "categoryType"
    },
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "type"
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
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Viewer",
  "abstractKey": null
};
(node as any).hash = 'e757b78983e6d7447dc9735d7f18484f';
export default node;
