/**
 * @generated SignedSource<<d0288761ffa12de06c8b4490f614541f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ShowsFeaturedShow_show$data = {
  readonly coverImage: {
    readonly large: {
      readonly height: number;
      readonly src: string;
      readonly srcSet: string;
      readonly width: number;
    } | null | undefined;
    readonly small: {
      readonly height: number;
      readonly src: string;
      readonly srcSet: string;
      readonly width: number;
    } | null | undefined;
    readonly title: string | null | undefined;
  } | null | undefined;
  readonly href: string | null | undefined;
  readonly id: string;
  readonly name: string | null | undefined;
  readonly partner: {
    readonly name?: string | null | undefined;
  } | null | undefined;
  readonly " $fragmentSpreads": FragmentRefs<"ShowsShowDates_show">;
  readonly " $fragmentType": "ShowsFeaturedShow_show";
};
export type ShowsFeaturedShow_show$key = {
  readonly " $data"?: ShowsFeaturedShow_show$data;
  readonly " $fragmentSpreads": FragmentRefs<"ShowsFeaturedShow_show">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v1 = {
  "kind": "Literal",
  "name": "version",
  "value": [
    "main",
    "normalized",
    "larger",
    "large"
  ]
},
v2 = [
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
v3 = [
  (v0/*: any*/)
];
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ShowsFeaturedShow_show",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ShowsShowDates_show"
    },
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
            (v1/*: any*/),
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
          "selections": (v2/*: any*/),
          "storageKey": "cropped(height:683,version:[\"main\",\"normalized\",\"larger\",\"large\"],width:910)"
        },
        {
          "alias": "small",
          "args": [
            {
              "kind": "Literal",
              "name": "height",
              "value": 450
            },
            (v1/*: any*/),
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
          "selections": (v2/*: any*/),
          "storageKey": "cropped(height:450,version:[\"main\",\"normalized\",\"larger\",\"large\"],width:600)"
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
          "selections": (v3/*: any*/),
          "type": "Partner",
          "abstractKey": null
        },
        {
          "kind": "InlineFragment",
          "selections": (v3/*: any*/),
          "type": "ExternalPartner",
          "abstractKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Show",
  "abstractKey": null
};
})();

(node as any).hash = "f21b3230035570428fb3e58c36321f8d";

export default node;
