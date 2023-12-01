/**
 * @generated SignedSource<<906ca7a7cba53d849006eda83c0332c5>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SelectedExhibitions_exhibitions$data = ReadonlyArray<{
  readonly city: string | null | undefined;
  readonly cover_image: {
    readonly cropped: {
      readonly url: string;
    } | null | undefined;
  } | null | undefined;
  readonly name: string | null | undefined;
  readonly partner: {
    readonly name?: string | null | undefined;
  } | null | undefined;
  readonly start_at: string | null | undefined;
  readonly " $fragmentType": "SelectedExhibitions_exhibitions";
}>;
export type SelectedExhibitions_exhibitions$key = ReadonlyArray<{
  readonly " $data"?: SelectedExhibitions_exhibitions$data;
  readonly " $fragmentSpreads": FragmentRefs<"SelectedExhibitions_exhibitions">;
}>;

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v1 = [
  (v0/*: any*/)
];
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": {
    "plural": true
  },
  "name": "SelectedExhibitions_exhibitions",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": null,
      "kind": "LinkedField",
      "name": "partner",
      "plural": false,
      "selections": [
        {
          "kind": "InlineFragment",
          "selections": (v1/*: any*/),
          "type": "ExternalPartner",
          "abstractKey": null
        },
        {
          "kind": "InlineFragment",
          "selections": (v1/*: any*/),
          "type": "Partner",
          "abstractKey": null
        }
      ],
      "storageKey": null
    },
    (v0/*: any*/),
    {
      "alias": "start_at",
      "args": [
        {
          "kind": "Literal",
          "name": "format",
          "value": "YYYY"
        }
      ],
      "kind": "ScalarField",
      "name": "startAt",
      "storageKey": "startAt(format:\"YYYY\")"
    },
    {
      "alias": "cover_image",
      "args": null,
      "concreteType": "Image",
      "kind": "LinkedField",
      "name": "coverImage",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": [
            {
              "kind": "Literal",
              "name": "height",
              "value": 600
            },
            {
              "kind": "Literal",
              "name": "width",
              "value": 800
            }
          ],
          "concreteType": "CroppedImageUrl",
          "kind": "LinkedField",
          "name": "cropped",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "url",
              "storageKey": null
            }
          ],
          "storageKey": "cropped(height:600,width:800)"
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "city",
      "storageKey": null
    }
  ],
  "type": "Show",
  "abstractKey": null
};
})();

(node as any).hash = "909495fb57e2524b079c5d2304d2d162";

export default node;
