/**
 * @generated SignedSource<<6c956fe8a9823c44b4736ce2778bf13d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtistStoryVanguardBadge_artist$data = {
  readonly vanguardArticle: {
    readonly href: string | null | undefined;
    readonly slug: string | null | undefined;
  } | null | undefined;
  readonly vanguardYear: string | null | undefined;
  readonly " $fragmentType": "ArtistStoryVanguardBadge_artist";
};
export type ArtistStoryVanguardBadge_artist$key = {
  readonly " $data"?: ArtistStoryVanguardBadge_artist$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArtistStoryVanguardBadge_artist">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtistStoryVanguardBadge_artist",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "vanguardYear",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Article",
      "kind": "LinkedField",
      "name": "vanguardArticle",
      "plural": false,
      "selections": [
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
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Artist",
  "abstractKey": null
};

(node as any).hash = "b43d16b765b3216e9a4cdd5163c72ef8";

export default node;
