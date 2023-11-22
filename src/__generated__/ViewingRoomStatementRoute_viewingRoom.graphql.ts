/**
 * @generated SignedSource<<1b0bb7e75d0645b5e950fd51baa3bc38>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ViewingRoomStatementRoute_viewingRoom$data = {
  readonly artworksConnection: {
    readonly totalCount: number | null | undefined;
  } | null | undefined;
  readonly subsections: ReadonlyArray<{
    readonly internalID: string;
  }>;
  readonly " $fragmentSpreads": FragmentRefs<"ViewingRoomBody_viewingRoom" | "ViewingRoomIntro_viewingRoom" | "ViewingRoomPullQuote_viewingRoom" | "ViewingRoomSubsections_viewingRoom" | "ViewingRoomWorks_viewingRoom">;
  readonly " $fragmentType": "ViewingRoomStatementRoute_viewingRoom";
};
export type ViewingRoomStatementRoute_viewingRoom$key = {
  readonly " $data"?: ViewingRoomStatementRoute_viewingRoom$data;
  readonly " $fragmentSpreads": FragmentRefs<"ViewingRoomStatementRoute_viewingRoom">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ViewingRoomStatementRoute_viewingRoom",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ViewingRoomIntro_viewingRoom"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ViewingRoomWorks_viewingRoom"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ViewingRoomPullQuote_viewingRoom"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ViewingRoomBody_viewingRoom"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ViewingRoomSubsections_viewingRoom"
    },
    {
      "alias": null,
      "args": [
        {
          "kind": "Literal",
          "name": "first",
          "value": 2
        }
      ],
      "concreteType": "ArtworkConnection",
      "kind": "LinkedField",
      "name": "artworksConnection",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "totalCount",
          "storageKey": null
        }
      ],
      "storageKey": "artworksConnection(first:2)"
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "ViewingRoomSubsection",
      "kind": "LinkedField",
      "name": "subsections",
      "plural": true,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "internalID",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "ViewingRoom",
  "abstractKey": null
};

(node as any).hash = "972a80266e3f961f175170538f981767";

export default node;
