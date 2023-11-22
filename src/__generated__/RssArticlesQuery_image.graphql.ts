/**
 * @generated SignedSource<<6bcb51be68ca9df5fb761f2542e13865>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type RssArticlesQuery_image$data = {
  readonly image: {
    readonly caption: string | null | undefined;
    readonly resized: {
      readonly height: number | null | undefined;
      readonly src: string;
      readonly srcSet: string;
      readonly width: number | null | undefined;
    } | null | undefined;
  } | null | undefined;
  readonly " $fragmentType": "RssArticlesQuery_image";
};
export type RssArticlesQuery_image$key = {
  readonly " $data"?: RssArticlesQuery_image$data;
  readonly " $fragmentSpreads": FragmentRefs<"RssArticlesQuery_image">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "RssArticlesQuery_image",
  "selections": [
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
          "args": null,
          "kind": "ScalarField",
          "name": "caption",
          "storageKey": null
        },
        {
          "alias": null,
          "args": [
            {
              "kind": "Literal",
              "name": "width",
              "value": 500
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
          "storageKey": "resized(width:500)"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "ArticleImageSection",
  "abstractKey": null
};

(node as any).hash = "7cb5893d8865f5400a25e45f85de1556";

export default node;
