/**
 * @generated SignedSource<<6f914adde814b23ff2851f677445966b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtistStoryPullQuote_artist$data = {
  readonly featuredStory: {
    readonly pullQuote: {
      readonly attribution: string | null | undefined;
      readonly text: string;
    } | null | undefined;
  } | null | undefined;
  readonly " $fragmentType": "ArtistStoryPullQuote_artist";
};
export type ArtistStoryPullQuote_artist$key = {
  readonly " $data"?: ArtistStoryPullQuote_artist$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArtistStoryPullQuote_artist">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtistStoryPullQuote_artist",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "ArtistStory",
      "kind": "LinkedField",
      "name": "featuredStory",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "ArtistStoryQuote",
          "kind": "LinkedField",
          "name": "pullQuote",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "text",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "attribution",
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

(node as any).hash = "10d79e1be4d62d9abedf1a0689eee0f2";

export default node;
