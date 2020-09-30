/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type FairEditorialItem_article = {
    readonly id: string;
    readonly internalID: string;
    readonly slug: string | null;
    readonly title: string | null;
    readonly href: string | null;
    readonly publishedAt: string | null;
    readonly thumbnailTitle: string | null;
    readonly thumbnailImage: {
        readonly _1x: {
            readonly width: number | null;
            readonly height: number | null;
            readonly src: string | null;
        } | null;
        readonly _2x: {
            readonly width: number | null;
            readonly height: number | null;
            readonly src: string | null;
        } | null;
    } | null;
    readonly " $refType": "FairEditorialItem_article";
};
export type FairEditorialItem_article$data = FairEditorialItem_article;
export type FairEditorialItem_article$key = {
    readonly " $data"?: FairEditorialItem_article$data;
    readonly " $fragmentRefs": FragmentRefs<"FairEditorialItem_article">;
};



const node: ReaderFragment = (function(){
var v0 = [
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
    "alias": "src",
    "args": null,
    "kind": "ScalarField",
    "name": "url",
    "storageKey": null
  }
];
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "FairEditorialItem_article",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    },
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
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "title",
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
      "args": [
        {
          "kind": "Literal",
          "name": "format",
          "value": "MMM Do, YYYY"
        }
      ],
      "kind": "ScalarField",
      "name": "publishedAt",
      "storageKey": "publishedAt(format:\"MMM Do, YYYY\")"
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "thumbnailTitle",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Image",
      "kind": "LinkedField",
      "name": "thumbnailImage",
      "plural": false,
      "selections": [
        {
          "alias": "_1x",
          "args": [
            {
              "kind": "Literal",
              "name": "height",
              "value": 80
            },
            {
              "kind": "Literal",
              "name": "width",
              "value": 140
            }
          ],
          "concreteType": "CroppedImageUrl",
          "kind": "LinkedField",
          "name": "cropped",
          "plural": false,
          "selections": (v0/*: any*/),
          "storageKey": "cropped(height:80,width:140)"
        },
        {
          "alias": "_2x",
          "args": [
            {
              "kind": "Literal",
              "name": "height",
              "value": 160
            },
            {
              "kind": "Literal",
              "name": "width",
              "value": 280
            }
          ],
          "concreteType": "CroppedImageUrl",
          "kind": "LinkedField",
          "name": "cropped",
          "plural": false,
          "selections": (v0/*: any*/),
          "storageKey": "cropped(height:160,width:280)"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Article"
};
})();
(node as any).hash = '9f2f76095c49af57942fadf67d481f63';
export default node;
