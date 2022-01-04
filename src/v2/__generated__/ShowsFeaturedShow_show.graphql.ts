/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ShowsFeaturedShow_show = {
    readonly id: string;
    readonly name: string | null;
    readonly href: string | null;
    readonly coverImage: {
        readonly title: string | null;
        readonly large: {
            readonly width: number;
            readonly height: number;
            readonly src: string;
            readonly srcSet: string;
        } | null;
        readonly small: {
            readonly width: number;
            readonly height: number;
            readonly src: string;
            readonly srcSet: string;
        } | null;
    } | null;
    readonly partner: {
        readonly name?: string | null;
    } | null;
    readonly " $fragmentRefs": FragmentRefs<"ShowsShowDates_show">;
    readonly " $refType": "ShowsFeaturedShow_show";
};
export type ShowsFeaturedShow_show$data = ShowsFeaturedShow_show;
export type ShowsFeaturedShow_show$key = {
    readonly " $data"?: ShowsFeaturedShow_show$data;
    readonly " $fragmentRefs": FragmentRefs<"ShowsFeaturedShow_show">;
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
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "width",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "height",
    "storageKey": null
  },
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
v2 = [
  (v0/*: any*/)
];
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ShowsFeaturedShow_show",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    },
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
      "concreteType": "Image",
      "kind": "LinkedField",
      "name": "coverImage",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "title",
          "storageKey": null
        },
        {
          "alias": "large",
          "args": [
            {
              "kind": "Literal",
              "name": "height",
              "value": 683
            },
            {
              "kind": "Literal",
              "name": "width",
              "value": 910
            }
          ],
          "concreteType": "CroppedImageUrl",
          "kind": "LinkedField",
          "name": "cropped",
          "plural": false,
          "selections": (v1/*: any*/),
          "storageKey": "cropped(height:683,width:910)"
        },
        {
          "alias": "small",
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
          "selections": (v1/*: any*/),
          "storageKey": "cropped(height:450,width:600)"
        }
      ],
      "storageKey": null
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
          "selections": (v2/*: any*/),
          "type": "Partner"
        },
        {
          "kind": "InlineFragment",
          "selections": (v2/*: any*/),
          "type": "ExternalPartner"
        }
      ],
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ShowsShowDates_show"
    }
  ],
  "type": "Show"
};
})();
(node as any).hash = 'd1d89a35176a8f420cb68c7a2e5289c4';
export default node;
