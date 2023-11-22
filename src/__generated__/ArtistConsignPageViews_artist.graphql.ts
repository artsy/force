/**
 * @generated SignedSource<<69878d7c7a5a2b8f57ff33e19559ba9b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtistConsignPageViews_artist$data = {
  readonly name: string | null | undefined;
  readonly targetSupply: {
    readonly microfunnel: {
      readonly metadata: {
        readonly roundedUniqueVisitors: string | null | undefined;
        readonly roundedViews: string | null | undefined;
      } | null | undefined;
    } | null | undefined;
  };
  readonly " $fragmentType": "ArtistConsignPageViews_artist";
};
export type ArtistConsignPageViews_artist$key = {
  readonly " $data"?: ArtistConsignPageViews_artist$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArtistConsignPageViews_artist">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtistConsignPageViews_artist",
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
                  "name": "roundedViews",
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "roundedUniqueVisitors",
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

(node as any).hash = "cb356e907f92e5bad02e30c7e4377123";

export default node;
