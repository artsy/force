/**
 * @generated SignedSource<<13cdc7bc4fc3fe18fe04fada4b6e06c1>>
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
    readonly caption: string | null;
    readonly resized: {
      readonly width: number | null;
      readonly height: number | null;
      readonly src: string;
      readonly srcSet: string;
    } | null;
  } | null;
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
