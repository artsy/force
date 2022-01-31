/**
 * @generated SignedSource<<cc668e2308115ed64aa61d46b842e342>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtistsCarouselCell_featuredLink$data = {
  readonly internalID: string | null;
  readonly title: string | null;
  readonly subtitle: string | null;
  readonly href: string | null;
  readonly image: {
    readonly thumb: {
      readonly width: number;
      readonly height: number;
      readonly src: string;
      readonly srcSet: string;
    } | null;
  } | null;
  readonly " $fragmentType": "ArtistsCarouselCell_featuredLink";
};
export type ArtistsCarouselCell_featuredLink$key = {
  readonly " $data"?: ArtistsCarouselCell_featuredLink$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArtistsCarouselCell_featuredLink">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtistsCarouselCell_featuredLink",
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
      "name": "subtitle",
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
      "concreteType": "Image",
      "kind": "LinkedField",
      "name": "image",
      "plural": false,
      "selections": [
        {
          "alias": "thumb",
          "args": [
            {
              "kind": "Literal",
              "name": "height",
              "value": 450
            },
            {
              "kind": "Literal",
              "name": "version",
              "value": "wide"
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
          "storageKey": "cropped(height:450,version:\"wide\",width:600)"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "FeaturedLink",
  "abstractKey": null
};

(node as any).hash = "825be8e5dd765862c4699c299893006c";

export default node;
