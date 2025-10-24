/**
 * @generated SignedSource<<d0104803f79ce590f2bf3a3441353ce2>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtistOverviewRoute_artist$data = {
  readonly href: string | null | undefined;
  readonly internalID: string;
  readonly meta: {
    readonly description: string;
    readonly title: string;
  };
  readonly " $fragmentSpreads": FragmentRefs<"ArtistOverview_artist">;
  readonly " $fragmentType": "ArtistOverviewRoute_artist";
};
export type ArtistOverviewRoute_artist$key = {
  readonly " $data"?: ArtistOverviewRoute_artist$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArtistOverviewRoute_artist">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtistOverviewRoute_artist",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArtistOverview_artist"
    },
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
      "name": "href",
      "storageKey": null
    },
    {
      "alias": null,
      "args": [
        {
          "kind": "Literal",
          "name": "page",
          "value": "ABOUT"
        }
      ],
      "concreteType": "ArtistMeta",
      "kind": "LinkedField",
      "name": "meta",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "description",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "title",
          "storageKey": null
        }
      ],
      "storageKey": "meta(page:\"ABOUT\")"
    }
  ],
  "type": "Artist",
  "abstractKey": null
};

(node as any).hash = "0a01b7744cfb902547d32d2962b3afa2";

export default node;
