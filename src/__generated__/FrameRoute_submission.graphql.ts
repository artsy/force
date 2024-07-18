/**
 * @generated SignedSource<<89841c528846e6962b1a86a9dd065b55>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type FrameRoute_submission$data = {
  readonly myCollectionArtwork: {
    readonly artworkId: string;
    readonly framedDepth: string | null | undefined;
    readonly framedHeight: string | null | undefined;
    readonly framedMetric: string | null | undefined;
    readonly framedWidth: string | null | undefined;
    readonly isFramed: boolean | null | undefined;
  } | null | undefined;
  readonly " $fragmentType": "FrameRoute_submission";
};
export type FrameRoute_submission$key = {
  readonly " $data"?: FrameRoute_submission$data;
  readonly " $fragmentSpreads": FragmentRefs<"FrameRoute_submission">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "FrameRoute_submission",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "Artwork",
      "kind": "LinkedField",
      "name": "myCollectionArtwork",
      "plural": false,
      "selections": [
        {
          "alias": "artworkId",
          "args": null,
          "kind": "ScalarField",
          "name": "internalID",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "isFramed",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "framedMetric",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "framedWidth",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "framedHeight",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "framedDepth",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "ConsignmentSubmission",
  "abstractKey": null
};

(node as any).hash = "7aa547e814096d330af5c92ca61cac37";

export default node;
