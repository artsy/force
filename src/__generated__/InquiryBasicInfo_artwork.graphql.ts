/**
 * @generated SignedSource<<e8e5e01a49b92b7029a80b9792a332bc>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type InquiryBasicInfo_artwork$data = {
  readonly partner: {
    readonly name: string | null;
  } | null;
  readonly " $fragmentType": "InquiryBasicInfo_artwork";
};
export type InquiryBasicInfo_artwork$key = {
  readonly " $data"?: InquiryBasicInfo_artwork$data;
  readonly " $fragmentSpreads": FragmentRefs<"InquiryBasicInfo_artwork">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "InquiryBasicInfo_artwork",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "Partner",
      "kind": "LinkedField",
      "name": "partner",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "name",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Artwork",
  "abstractKey": null
};

(node as any).hash = "1e1234eb5a6db8d4cef797d5ebdfc6e6";

export default node;
