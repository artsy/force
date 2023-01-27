/**
 * @generated SignedSource<<ebf225abed775d8d5c2bc805ad61b3cd>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtworkVideoPlayer_artwork$data = {
  readonly figures: ReadonlyArray<{
    readonly __typename: "Video";
    readonly playerUrl: string;
    readonly videoHeight: number;
    readonly videoWidth: number;
  } | {
    // This will never be '%other', but we need some
    // value in case none of the concrete values match.
    readonly __typename: "%other";
  }>;
  readonly internalID: string;
  readonly slug: string;
  readonly " $fragmentType": "ArtworkVideoPlayer_artwork";
};
export type ArtworkVideoPlayer_artwork$key = {
  readonly " $data"?: ArtworkVideoPlayer_artwork$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArtworkVideoPlayer_artwork">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [
    {
      "defaultValue": false,
      "kind": "LocalArgument",
      "name": "includeAllImages"
    }
  ],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtworkVideoPlayer_artwork",
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
      "args": [
        {
          "kind": "Variable",
          "name": "includeAll",
          "variableName": "includeAllImages"
        }
      ],
      "concreteType": null,
      "kind": "LinkedField",
      "name": "figures",
      "plural": true,
      "selections": [
        {
          "kind": "InlineFragment",
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "__typename",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "playerUrl",
              "storageKey": null
            },
            {
              "alias": "videoWidth",
              "args": null,
              "kind": "ScalarField",
              "name": "width",
              "storageKey": null
            },
            {
              "alias": "videoHeight",
              "args": null,
              "kind": "ScalarField",
              "name": "height",
              "storageKey": null
            }
          ],
          "type": "Video",
          "abstractKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Artwork",
  "abstractKey": null
};

(node as any).hash = "7d4bc447bdd7fa1993d8de1b6b9f0cbd";

export default node;
