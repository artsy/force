/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type FairsFairBanner_fair = {
    readonly href: string | null;
    readonly name: string | null;
    readonly startAt: string | null;
    readonly endAt: string | null;
    readonly bannerSize: string | null;
    readonly image: {
        readonly large: {
            readonly src: string;
            readonly srcSet: string;
            readonly width: number;
            readonly height: number;
        } | null;
        readonly small: {
            readonly src: string;
            readonly srcSet: string;
            readonly width: number;
            readonly height: number;
        } | null;
    } | null;
    readonly profile: {
        readonly icon: {
            readonly resized: {
                readonly width: number | null;
                readonly height: number | null;
                readonly src: string;
                readonly srcSet: string;
            } | null;
        } | null;
    } | null;
    readonly " $refType": "FairsFairBanner_fair";
};
export type FairsFairBanner_fair$data = FairsFairBanner_fair;
export type FairsFairBanner_fair$key = {
    readonly " $data"?: FairsFairBanner_fair$data;
    readonly " $fragmentRefs": FragmentRefs<"FairsFairBanner_fair">;
};



const node: ReaderFragment = (function(){
var v0 = {
  "kind": "Literal",
  "name": "version",
  "value": [
    "wide"
  ]
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "src",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "srcSet",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "width",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "height",
  "storageKey": null
},
v5 = [
  (v1/*: any*/),
  (v2/*: any*/),
  (v3/*: any*/),
  (v4/*: any*/)
];
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "FairsFairBanner_fair",
  "selections": [
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
      "name": "name",
      "storageKey": null
    },
    {
      "alias": null,
      "args": [
        {
          "kind": "Literal",
          "name": "format",
          "value": "MMM Do"
        }
      ],
      "kind": "ScalarField",
      "name": "startAt",
      "storageKey": "startAt(format:\"MMM Do\")"
    },
    {
      "alias": null,
      "args": [
        {
          "kind": "Literal",
          "name": "format",
          "value": "Do YYYY"
        }
      ],
      "kind": "ScalarField",
      "name": "endAt",
      "storageKey": "endAt(format:\"Do YYYY\")"
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "bannerSize",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Image",
      "kind": "LinkedField",
      "name": "image",
      "plural": false,
      "selections": [
        {
          "alias": "large",
          "args": [
            {
              "kind": "Literal",
              "name": "height",
              "value": 477
            },
            (v0/*: any*/),
            {
              "kind": "Literal",
              "name": "width",
              "value": 1112
            }
          ],
          "concreteType": "CroppedImageUrl",
          "kind": "LinkedField",
          "name": "cropped",
          "plural": false,
          "selections": (v5/*: any*/),
          "storageKey": "cropped(height:477,version:[\"wide\"],width:1112)"
        },
        {
          "alias": "small",
          "args": [
            {
              "kind": "Literal",
              "name": "height",
              "value": 313
            },
            (v0/*: any*/),
            {
              "kind": "Literal",
              "name": "width",
              "value": 556
            }
          ],
          "concreteType": "CroppedImageUrl",
          "kind": "LinkedField",
          "name": "cropped",
          "plural": false,
          "selections": (v5/*: any*/),
          "storageKey": "cropped(height:313,version:[\"wide\"],width:556)"
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Profile",
      "kind": "LinkedField",
      "name": "profile",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "Image",
          "kind": "LinkedField",
          "name": "icon",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": [
                {
                  "kind": "Literal",
                  "name": "height",
                  "value": 80
                },
                {
                  "kind": "Literal",
                  "name": "version",
                  "value": "square140"
                },
                {
                  "kind": "Literal",
                  "name": "width",
                  "value": 80
                }
              ],
              "concreteType": "ResizedImageUrl",
              "kind": "LinkedField",
              "name": "resized",
              "plural": false,
              "selections": [
                (v3/*: any*/),
                (v4/*: any*/),
                (v1/*: any*/),
                (v2/*: any*/)
              ],
              "storageKey": "resized(height:80,version:\"square140\",width:80)"
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Fair"
};
})();
(node as any).hash = 'ca4899b3256f0949ebf5fbb84cb013f0';
export default node;
