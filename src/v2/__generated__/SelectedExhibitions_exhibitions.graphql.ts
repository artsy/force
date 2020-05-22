/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type SelectedExhibitions_exhibitions = ReadonlyArray<{
    readonly partner: {
        readonly name?: string | null;
    } | null;
    readonly name: string | null;
    readonly start_at: string | null;
    readonly cover_image: {
        readonly cropped: {
            readonly url: string | null;
        } | null;
    } | null;
    readonly city: string | null;
    readonly " $refType": "SelectedExhibitions_exhibitions";
}>;
export type SelectedExhibitions_exhibitions$data = SelectedExhibitions_exhibitions;
export type SelectedExhibitions_exhibitions$key = ReadonlyArray<{
    readonly " $data"?: SelectedExhibitions_exhibitions$data;
    readonly " $fragmentRefs": FragmentRefs<"SelectedExhibitions_exhibitions">;
}>;



const node: ReaderFragment = (function(){
var v0 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "name",
  "args": null,
  "storageKey": null
},
v1 = [
  (v0/*: any*/)
];
return {
  "kind": "Fragment",
  "name": "SelectedExhibitions_exhibitions",
  "type": "Show",
  "metadata": {
    "plural": true
  },
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "partner",
      "storageKey": null,
      "args": null,
      "concreteType": null,
      "plural": false,
      "selections": [
        {
          "kind": "InlineFragment",
          "type": "ExternalPartner",
          "selections": (v1/*: any*/)
        },
        {
          "kind": "InlineFragment",
          "type": "Partner",
          "selections": (v1/*: any*/)
        }
      ]
    },
    (v0/*: any*/),
    {
      "kind": "ScalarField",
      "alias": "start_at",
      "name": "startAt",
      "args": [
        {
          "kind": "Literal",
          "name": "format",
          "value": "YYYY"
        }
      ],
      "storageKey": "startAt(format:\"YYYY\")"
    },
    {
      "kind": "LinkedField",
      "alias": "cover_image",
      "name": "coverImage",
      "storageKey": null,
      "args": null,
      "concreteType": "Image",
      "plural": false,
      "selections": [
        {
          "kind": "LinkedField",
          "alias": null,
          "name": "cropped",
          "storageKey": "cropped(height:600,width:800)",
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
          "plural": false,
          "selections": [
            {
              "kind": "ScalarField",
              "alias": null,
              "name": "url",
              "args": null,
              "storageKey": null
            }
          ]
        }
      ]
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "city",
      "args": null,
      "storageKey": null
    }
  ]
};
})();
(node as any).hash = '909495fb57e2524b079c5d2304d2d162';
export default node;
