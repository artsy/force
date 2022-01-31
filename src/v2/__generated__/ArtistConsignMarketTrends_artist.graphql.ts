/**
 * @generated SignedSource<<384d1a215a70f3af3d0b7dc0de50b733>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtistConsignMarketTrends_artist$data = {
  readonly href: string | null;
  readonly targetSupply: {
    readonly microfunnel: {
      readonly metadata: {
        readonly highestRealized: string | null;
        readonly str: string | null;
        readonly realized: string | null;
      } | null;
    } | null;
  } | null;
  readonly " $fragmentType": "ArtistConsignMarketTrends_artist";
};
export type ArtistConsignMarketTrends_artist$key = {
  readonly " $data"?: ArtistConsignMarketTrends_artist$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArtistConsignMarketTrends_artist">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtistConsignMarketTrends_artist",
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
      "concreteType": "ArtistTargetSupply",
      "kind": "LinkedField",
      "name": "targetSupply",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "ArtistTargetSupplyMicrofunnel",
          "kind": "LinkedField",
          "name": "microfunnel",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "TargetSupplyMicrofunnelMetadata",
              "kind": "LinkedField",
              "name": "metadata",
              "plural": false,
              "selections": [
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "highestRealized",
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "str",
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "realized",
                  "storageKey": null
                }
              ],
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Artist",
  "abstractKey": null
};

(node as any).hash = "91c1ebf56415fcb86b69ff9fa6f2a918";

export default node;
