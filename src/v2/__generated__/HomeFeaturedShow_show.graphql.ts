/**
 * @generated SignedSource<<90b78320cda715afc6ea63e7ad938355>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type HomeFeaturedShow_show$data = {
  readonly internalID: string;
  readonly slug: string;
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
      readonly width: number;
      readonly height: number;
    } | null;
  } | null;
  readonly " $fragmentType": "HomeFeaturedShow_show";
};
export type HomeFeaturedShow_show$key = {
  readonly " $data"?: HomeFeaturedShow_show$data;
  readonly " $fragmentSpreads": FragmentRefs<"HomeFeaturedShow_show">;
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
    "kind": "Literal",
    "name": "format",
    "value": "MMM D"
  }
],
v2 = [
  (v0/*: any*/)
];
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "HomeFeaturedShow_show",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "internalID",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "slug",
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
      "args": (v1/*: any*/),
      "kind": "ScalarField",
      "name": "startAt",
      "storageKey": "startAt(format:\"MMM D\")"
    },
    {
      "alias": "formattedEndAt",
      "args": (v1/*: any*/),
      "kind": "ScalarField",
      "name": "endAt",
      "storageKey": "endAt(format:\"MMM D\")"
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
          "type": "Partner",
          "abstractKey": null
        },
        {
          "kind": "InlineFragment",
          "selections": (v2/*: any*/),
          "type": "ExternalPartner",
          "abstractKey": null
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
              "value": 230
            },
            {
              "kind": "Literal",
              "name": "width",
              "value": 325
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
            },
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
            }
          ],
          "storageKey": "cropped(height:230,width:325)"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Show",
  "abstractKey": null
};
})();

(node as any).hash = "a46613c876093cac1b3e515f0b516138";

export default node;
