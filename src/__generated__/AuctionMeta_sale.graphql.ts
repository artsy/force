/**
 * @generated SignedSource<<6374376312eaaef095aa898fe83b9c69>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type AuctionMeta_sale$data = {
  readonly coverImage: {
    readonly url: string | null;
  } | null;
  readonly description: string | null;
  readonly name: string | null;
  readonly slug: string;
  readonly " $fragmentType": "AuctionMeta_sale";
};
export type AuctionMeta_sale$key = {
  readonly " $data"?: AuctionMeta_sale$data;
  readonly " $fragmentSpreads": FragmentRefs<"AuctionMeta_sale">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "AuctionMeta_sale",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "name",
      "storageKey": null
    },
    {
      "alias": null,
      "args": [
        {
          "kind": "Literal",
          "name": "format",
          "value": "HTML"
        }
      ],
      "kind": "ScalarField",
      "name": "description",
      "storageKey": "description(format:\"HTML\")"
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "slug",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Image",
      "kind": "LinkedField",
      "name": "coverImage",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": [
            {
              "kind": "Literal",
              "name": "version",
              "value": [
                "wide",
                "source",
                "large_rectangle"
              ]
            }
          ],
          "kind": "ScalarField",
          "name": "url",
          "storageKey": "url(version:[\"wide\",\"source\",\"large_rectangle\"])"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Sale",
  "abstractKey": null
};

(node as any).hash = "f564e29db43bcfed6722b7f675ce1cc9";

export default node;
