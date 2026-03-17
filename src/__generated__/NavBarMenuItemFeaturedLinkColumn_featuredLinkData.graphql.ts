/**
 * @generated SignedSource<<7f17031c419e0876153f2e3451ba96fe>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type NavBarMenuItemFeaturedLinkColumn_featuredLinkData$data = {
  readonly href: string | null | undefined;
  readonly image: {
    readonly cropped: {
      readonly height: number;
      readonly src: string;
      readonly srcSet: string;
      readonly width: number;
    } | null | undefined;
  } | null | undefined;
  readonly subtitle: string | null | undefined;
  readonly title: string | null | undefined;
  readonly " $fragmentType": "NavBarMenuItemFeaturedLinkColumn_featuredLinkData";
};
export type NavBarMenuItemFeaturedLinkColumn_featuredLinkData$key = {
  readonly " $data"?: NavBarMenuItemFeaturedLinkColumn_featuredLinkData$data;
  readonly " $fragmentSpreads": FragmentRefs<"NavBarMenuItemFeaturedLinkColumn_featuredLinkData">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "NavBarMenuItemFeaturedLinkColumn_featuredLinkData",
  "selections": [
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
          "value": "PLAIN"
        }
      ],
      "kind": "ScalarField",
      "name": "subtitle",
      "storageKey": "subtitle(format:\"PLAIN\")"
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
          "alias": null,
          "args": [
            {
              "kind": "Literal",
              "name": "height",
              "value": 400
            },
            {
              "kind": "Literal",
              "name": "version",
              "value": [
                "main",
                "wide",
                "large_rectangle"
              ]
            },
            {
              "kind": "Literal",
              "name": "width",
              "value": 400
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
              "name": "height",
              "storageKey": null
            }
          ],
          "storageKey": "cropped(height:400,version:[\"main\",\"wide\",\"large_rectangle\"],width:400)"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "FeaturedLink",
  "abstractKey": null
};

(node as any).hash = "24dd0e227d9510364438378ff2caf48c";

export default node;
