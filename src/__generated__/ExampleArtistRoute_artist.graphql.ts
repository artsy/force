/**
 * @generated SignedSource<<1c8ce35879da8cc872e2bd6f7b65e1c1>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ExampleArtistRoute_artist$data = {
  readonly bio: string | null | undefined;
  readonly internalID: string;
  readonly name: string | null | undefined;
  readonly " $fragmentType": "ExampleArtistRoute_artist";
};
export type ExampleArtistRoute_artist$key = {
  readonly " $data"?: ExampleArtistRoute_artist$data;
  readonly " $fragmentSpreads": FragmentRefs<"ExampleArtistRoute_artist">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ExampleArtistRoute_artist",
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
      "kind": "ScalarField",
      "name": "bio",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "internalID",
      "storageKey": null
    }
  ],
  "type": "Artist",
  "abstractKey": null
};

(node as any).hash = "9f949ee70f6a716caf42c982adc9270a";

export default node;
