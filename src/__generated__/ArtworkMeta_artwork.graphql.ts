/**
 * @generated SignedSource<<6d1940b0edfbbe8d006b9cbe576d9cf6>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtworkMeta_artwork$data = {
  readonly href: string | null | undefined;
  readonly internalID: string;
  readonly isShareable: boolean | null | undefined;
  readonly isUnlisted: boolean;
  readonly meta: {
    readonly description: string | null | undefined;
    readonly longDescription: string | null | undefined;
    readonly title: string | null | undefined;
  } | null | undefined;
  readonly metaImage: {
    readonly resized: {
      readonly height: number | null | undefined;
      readonly url: string;
      readonly width: number | null | undefined;
    } | null | undefined;
  } | null | undefined;
  readonly " $fragmentSpreads": FragmentRefs<"ArtworkChatBubble_artwork" | "SeoDataForArtwork_artwork">;
  readonly " $fragmentType": "ArtworkMeta_artwork";
};
export type ArtworkMeta_artwork$key = {
  readonly " $data"?: ArtworkMeta_artwork$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArtworkMeta_artwork">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtworkMeta_artwork",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "SeoDataForArtwork_artwork"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArtworkChatBubble_artwork"
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
      "kind": "ScalarField",
      "name": "internalID",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "isShareable",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "isUnlisted",
      "storageKey": null
    },
    {
      "alias": "metaImage",
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
              "value": 640
            },
            {
              "kind": "Literal",
              "name": "version",
              "value": [
                "large",
                "medium",
                "tall"
              ]
            },
            {
              "kind": "Literal",
              "name": "width",
              "value": 640
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
              "name": "url",
              "storageKey": null
            }
          ],
          "storageKey": "resized(height:640,version:[\"large\",\"medium\",\"tall\"],width:640)"
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "ArtworkMeta",
      "kind": "LinkedField",
      "name": "meta",
      "plural": false,
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
              "name": "limit",
              "value": 155
            }
          ],
          "kind": "ScalarField",
          "name": "description",
          "storageKey": "description(limit:155)"
        },
        {
          "alias": "longDescription",
          "args": [
            {
              "kind": "Literal",
              "name": "limit",
              "value": 200
            }
          ],
          "kind": "ScalarField",
          "name": "description",
          "storageKey": "description(limit:200)"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Artwork",
  "abstractKey": null
};

(node as any).hash = "ecc902103df8ffccc4d3afa722284fa5";

export default node;
