/**
 * @generated SignedSource<<f72730db1611025cf72e3aceea2820ad>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtistConsignPageViews_artist$data = {
  readonly name: string | null;
  readonly targetSupply: {
    readonly microfunnel: {
      readonly metadata: {
        readonly roundedViews: string | null;
        readonly roundedUniqueVisitors: string | null;
      } | null;
    } | null;
  } | null;
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
