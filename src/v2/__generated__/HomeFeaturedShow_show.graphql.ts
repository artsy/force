/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type HomeFeaturedShow_show = {
    readonly name: string | null;
    readonly href: string | null;
    readonly startAt: string | null;
    readonly endAt: string | null;
    readonly formattedStartAt: string | null;
    readonly formattedEndAt: string | null;
    readonly partner: {
        readonly name?: string | null;
    } | null;
    readonly coverImage: {
        readonly cropped: {
            readonly src: string;
            readonly srcSet: string;
        } | null;
    } | null;
    readonly " $refType": "HomeFeaturedShow_show";
};
export type HomeFeaturedShow_show$data = HomeFeaturedShow_show;
export type HomeFeaturedShow_show$key = {
    readonly " $data"?: HomeFeaturedShow_show$data;
    readonly " $fragmentRefs": FragmentRefs<"HomeFeaturedShow_show">;
};



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
  "metadata": null,
  "name": "HomeFeaturedShow_show",
  "selections": [
    (v0/*: any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "href",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "startAt",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "endAt",
      "storageKey": null
    },
    {
      "alias": "formattedStartAt",
      "args": [
        {
          "kind": "Literal",
          "name": "format",
          "value": "MMM D"
        }
      ],
      "kind": "ScalarField",
      "name": "startAt",
      "storageKey": "startAt(format:\"MMM D\")"
    },
    {
      "alias": "formattedEndAt",
      "args": [
        {
          "kind": "Literal",
          "name": "format",
          "value": "D"
        }
      ],
      "kind": "ScalarField",
      "name": "endAt",
      "storageKey": "endAt(format:\"D\")"
    },
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
          "type": "Partner"
        },
        {
          "kind": "InlineFragment",
          "selections": (v1/*: any*/),
          "type": "ExternalPartner"
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
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
              "value": 450
            },
            {
              "kind": "Literal",
              "name": "width",
              "value": 600
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
              "name": "src",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "srcSet",
              "storageKey": null
            }
          ],
          "storageKey": "cropped(height:450,width:600)"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Show"
};
})();
(node as any).hash = '2c945f2c7c3964d4a617b35a69a6f6e9';
export default node;
