/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArticleSectionVideo_section = {
    readonly embed: string | null;
    readonly image: {
        readonly cropped: {
            readonly src: string;
            readonly srcSet: string;
        } | null;
    } | null;
    readonly " $refType": "ArticleSectionVideo_section";
};
export type ArticleSectionVideo_section$data = ArticleSectionVideo_section;
export type ArticleSectionVideo_section$key = {
    readonly " $data"?: ArticleSectionVideo_section$data;
    readonly " $fragmentRefs": FragmentRefs<"ArticleSectionVideo_section">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArticleSectionVideo_section",
  "selections": [
    {
      "alias": null,
      "args": [
        {
          "kind": "Literal",
          "name": "autoPlay",
          "value": true
        }
      ],
      "kind": "ScalarField",
      "name": "embed",
      "storageKey": "embed(autoPlay:true)"
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
          "alias": null,
          "args": [
            {
              "kind": "Literal",
              "name": "height",
              "value": 512
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
          "storageKey": "cropped(height:512,width:910)"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "ArticleSectionVideo",
  "abstractKey": null
};
(node as any).hash = 'f64b2c6ebde06420f883c8ae86e8b05b';
export default node;
