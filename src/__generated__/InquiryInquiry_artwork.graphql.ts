/**
 * @generated SignedSource<<39811101f3f7403a6ce10315fafdbd8c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type InquiryInquiry_artwork$data = {
  readonly artist: {
    readonly name: string | null | undefined;
  } | null | undefined;
  readonly date: string | null | undefined;
  readonly image: {
    readonly resized: {
      readonly height: number | null | undefined;
      readonly src: string;
      readonly srcSet: string;
      readonly width: number | null | undefined;
    } | null | undefined;
  } | null | undefined;
  readonly internalID: string;
  readonly partner: {
    readonly name: string | null | undefined;
  } | null | undefined;
  readonly title: string | null | undefined;
  readonly " $fragmentType": "InquiryInquiry_artwork";
};
export type InquiryInquiry_artwork$key = {
  readonly " $data"?: InquiryInquiry_artwork$data;
  readonly " $fragmentSpreads": FragmentRefs<"InquiryInquiry_artwork">;
};

const node: ReaderFragment = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "name",
    "storageKey": null
  }
];
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "InquiryInquiry_artwork",
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
      "name": "title",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "date",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Artist",
      "kind": "LinkedField",
      "name": "artist",
      "plural": false,
      "selections": (v0/*: any*/),
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Partner",
      "kind": "LinkedField",
      "name": "partner",
      "plural": false,
      "selections": (v0/*: any*/),
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
          "alias": null,
          "args": [
            {
              "kind": "Literal",
              "name": "height",
              "value": 45
            },
            {
              "kind": "Literal",
              "name": "width",
              "value": 60
            }
          ],
          "concreteType": "ResizedImageUrl",
          "kind": "LinkedField",
          "name": "resized",
          "plural": false,
          "selections": [
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
              "name": "width",
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
          "storageKey": "resized(height:45,width:60)"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Artwork",
  "abstractKey": null
};
})();

(node as any).hash = "f60b7bd6c3523066d5cb774b240122ef";

export default node;
