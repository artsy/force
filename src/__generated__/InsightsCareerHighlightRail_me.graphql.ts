/**
 * @generated SignedSource<<d8325ffc58c38f7bfcb01f6d205fec21>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type InsightsCareerHighlightRail_me$data = {
  readonly myCollectionInfo: {
    readonly artistInsightsCount: {
      readonly BIENNIAL: number;
      readonly COLLECTED: number;
      readonly GROUP_SHOW: number;
      readonly REVIEWED: number;
      readonly SOLO_SHOW: number;
    } | null | undefined;
  } | null | undefined;
  readonly " $fragmentType": "InsightsCareerHighlightRail_me";
};
export type InsightsCareerHighlightRail_me$key = {
  readonly " $data"?: InsightsCareerHighlightRail_me$data;
  readonly " $fragmentSpreads": FragmentRefs<"InsightsCareerHighlightRail_me">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "InsightsCareerHighlightRail_me",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "MyCollectionInfo",
      "kind": "LinkedField",
      "name": "myCollectionInfo",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "ArtistInsightsCount",
          "kind": "LinkedField",
          "name": "artistInsightsCount",
          "plural": false,
          "selections": [
            {
              "alias": "BIENNIAL",
              "args": null,
              "kind": "ScalarField",
              "name": "biennialCount",
              "storageKey": null
            },
            {
              "alias": "COLLECTED",
              "args": null,
              "kind": "ScalarField",
              "name": "collectedCount",
              "storageKey": null
            },
            {
              "alias": "GROUP_SHOW",
              "args": null,
              "kind": "ScalarField",
              "name": "groupShowCount",
              "storageKey": null
            },
            {
              "alias": "SOLO_SHOW",
              "args": null,
              "kind": "ScalarField",
              "name": "soloShowCount",
              "storageKey": null
            },
            {
              "alias": "REVIEWED",
              "args": null,
              "kind": "ScalarField",
              "name": "reviewedCount",
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Me",
  "abstractKey": null
};

(node as any).hash = "c3ab4613ced6b3dd783d6f9a080eca2d";

export default node;
