/**
 * @generated SignedSource<<eb8e943c3ee52604f90eb31d16a8d97a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PartnerOfferArtwork_artwork$data = {
  readonly artistNames: string | null | undefined;
  readonly href: string | null | undefined;
  readonly image: {
    readonly height: number | null | undefined;
    readonly src: string | null | undefined;
    readonly width: number | null | undefined;
  } | null | undefined;
  readonly partner: {
    readonly profile: {
      readonly icon: {
        readonly resized: {
          readonly src: string;
          readonly srcSet: string;
        } | null | undefined;
      } | null | undefined;
    } | null | undefined;
  } | null | undefined;
  readonly price: string | null | undefined;
  readonly title: string | null | undefined;
  readonly " $fragmentSpreads": FragmentRefs<"Metadata_artwork">;
  readonly " $fragmentType": "PartnerOfferArtwork_artwork";
};
export type PartnerOfferArtwork_artwork$key = {
  readonly " $data"?: PartnerOfferArtwork_artwork$data;
  readonly " $fragmentSpreads": FragmentRefs<"PartnerOfferArtwork_artwork">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PartnerOfferArtwork_artwork",
  "selections": [
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
      "name": "title",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "artistNames",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "price",
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
          "alias": "src",
          "args": [
            {
              "kind": "Literal",
              "name": "version",
              "value": [
                "larger",
                "large"
              ]
            }
          ],
          "kind": "ScalarField",
          "name": "url",
          "storageKey": "url(version:[\"larger\",\"large\"])"
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
      "storageKey": null
    },
    {
      "alias": null,
      "args": [
        {
          "kind": "Literal",
          "name": "shallow",
          "value": true
        }
      ],
      "concreteType": "Partner",
      "kind": "LinkedField",
      "name": "partner",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "Profile",
          "kind": "LinkedField",
          "name": "profile",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "Image",
              "kind": "LinkedField",
              "name": "icon",
              "plural": false,
              "selections": [
                {
                  "alias": null,
                  "args": [
                    {
                      "kind": "Literal",
                      "name": "height",
                      "value": 30
                    },
                    {
                      "kind": "Literal",
                      "name": "version",
                      "value": "square"
                    },
                    {
                      "kind": "Literal",
                      "name": "width",
                      "value": 30
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
                  "storageKey": "resized(height:30,version:\"square\",width:30)"
                }
              ],
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": "partner(shallow:true)"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "Metadata_artwork"
    }
  ],
  "type": "Artwork",
  "abstractKey": null
};

(node as any).hash = "9bc5ac4bc8dacfb93c8f5c020e305b33";

export default node;
