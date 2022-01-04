/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ShowBanner_show = {
    readonly slug: string;
    readonly name: string | null;
    readonly href: string | null;
    readonly isFairBooth: boolean | null;
    readonly exhibitionPeriod: string | null;
    readonly status: string | null;
    readonly description: string | null;
    readonly location: {
        readonly city: string | null;
    } | null;
    readonly coverImage: {
        readonly medium: {
            readonly src: string;
            readonly srcSet: string;
        } | null;
    } | null;
    readonly " $refType": "ShowBanner_show";
};
export type ShowBanner_show$data = ShowBanner_show;
export type ShowBanner_show$key = {
    readonly " $data"?: ShowBanner_show$data;
    readonly " $fragmentRefs": FragmentRefs<"ShowBanner_show">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ShowBanner_show",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "slug",
      "storageKey": null
    },
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
      "name": "href",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "isFairBooth",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "exhibitionPeriod",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "status",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "description",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Location",
      "kind": "LinkedField",
      "name": "location",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "city",
          "storageKey": null
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
          "alias": "medium",
          "args": [
            {
              "kind": "Literal",
              "name": "height",
              "value": 480
            },
            {
              "kind": "Literal",
              "name": "version",
              "value": [
                "normalized",
                "larger",
                "large"
              ]
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
          "storageKey": "cropped(height:480,version:[\"normalized\",\"larger\",\"large\"],width:600)"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Show"
};
(node as any).hash = '828b00d539d4b868d577519d06109017';
export default node;
