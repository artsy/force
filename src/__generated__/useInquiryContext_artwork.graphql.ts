/**
 * @generated SignedSource<<54cef09bfb37d6d520e980dc0b4245b7>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type useInquiryContext_artwork$data = {
  readonly artist: {
    readonly internalID: string;
    readonly name: string | null;
    readonly slug: string;
  } | null;
  readonly " $fragmentType": "useInquiryContext_artwork";
};
export type useInquiryContext_artwork$key = {
  readonly " $data"?: useInquiryContext_artwork$data;
  readonly " $fragmentSpreads": FragmentRefs<"useInquiryContext_artwork">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "useInquiryContext_artwork",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "Artist",
      "kind": "LinkedField",
      "name": "artist",
      "plural": false,
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
          "name": "name",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "slug",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Artwork",
  "abstractKey": null
};

(node as any).hash = "424db4e1025a542fc2649dbb6c31de4d";

export default node;
