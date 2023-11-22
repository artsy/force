/**
 * @generated SignedSource<<699f9105bc8a189fcf2aeee96a0ba281>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtistSellWithArtsy_artist$data = {
  readonly href: string | null | undefined;
  readonly image: {
    readonly resized: {
      readonly src: string;
    } | null | undefined;
  } | null | undefined;
  readonly internalID: string;
  readonly slug: string;
  readonly targetSupply: {
    readonly isInMicrofunnel: boolean | null | undefined;
  };
  readonly " $fragmentType": "ArtistSellWithArtsy_artist";
};
export type ArtistSellWithArtsy_artist$key = {
  readonly " $data"?: ArtistSellWithArtsy_artist$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArtistSellWithArtsy_artist">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtistSellWithArtsy_artist",
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
      "name": "slug",
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
      "concreteType": "ArtistTargetSupply",
      "kind": "LinkedField",
      "name": "targetSupply",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "isInMicrofunnel",
          "storageKey": null
        }
      ],
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
              "name": "src",
              "storageKey": null
            }
          ],
          "storageKey": "resized(width:640)"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Artist",
  "abstractKey": null
};

(node as any).hash = "f7a5d349a177b4933b261a3561b6ef37";

export default node;
