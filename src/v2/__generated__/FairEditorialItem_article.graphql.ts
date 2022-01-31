/**
 * @generated SignedSource<<038b885f61af01d37400ceb57eb57005>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type FairEditorialItem_article$data = {
  readonly id: string;
  readonly title: string | null;
  readonly publishedAt: string | null;
  readonly thumbnailTitle: string | null;
  readonly thumbnailImage: {
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
  readonly " $fragmentSpreads": FragmentRefs<"FairEditorialItemLink_article">;
  readonly " $fragmentType": "FairEditorialItem_article";
};
export type FairEditorialItem_article$key = {
  readonly " $data"?: FairEditorialItem_article$data;
  readonly " $fragmentSpreads": FragmentRefs<"FairEditorialItem_article">;
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
      "name": "title",
      "storageKey": null
    },
    {
      "alias": null,
      "args": [
        {
          "kind": "Literal",
          "name": "format",
          "value": "MMMM D, YYYY"
        }
      ],
      "kind": "ScalarField",
      "name": "publishedAt",
      "storageKey": "publishedAt(format:\"MMMM D, YYYY\")"
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
          "alias": "large",
          "args": [
            {
              "kind": "Literal",
              "name": "height",
              "value": 720
            },
            {
              "kind": "Literal",
              "name": "width",
              "value": 670
            }
          ],
          "concreteType": "CroppedImageUrl",
          "kind": "LinkedField",
          "name": "cropped",
          "plural": false,
          "selections": (v0/*: any*/),
          "storageKey": "cropped(height:720,width:670)"
        },
        {
          "alias": "small",
          "args": [
            {
              "kind": "Literal",
              "name": "height",
              "value": 240
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
          "selections": (v0/*: any*/),
          "storageKey": "cropped(height:240,width:325)"
        }
      ],
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "FairEditorialItemLink_article"
    }
  ],
  "type": "Article",
  "abstractKey": null
};
})();

(node as any).hash = "c75b6595a83db414fce5e180962b885e";

export default node;
