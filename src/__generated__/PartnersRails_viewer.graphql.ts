/**
 * @generated SignedSource<<c28c742d4f3220362f9c69d4ea08e518>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PartnersRails_viewer$data = {
  readonly partnerCategories: ReadonlyArray<{
    readonly name: string | null;
    readonly slug: string;
  } | null> | null;
  readonly " $fragmentType": "PartnersRails_viewer";
};
export type PartnersRails_viewer$key = {
  readonly " $data"?: PartnersRails_viewer$data;
  readonly " $fragmentSpreads": FragmentRefs<"PartnersRails_viewer">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "categoryType"
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

(node as any).hash = "a3259e523fac60ce40f3e3986e92bcc3";

export default node;
