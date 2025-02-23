/**
 * @generated SignedSource<<2079b875530e46009f29c7e59f29a40b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type MockRelayRendererFixtures_artworkMetadata$data = {
  readonly title: string | null | undefined;
  readonly " $fragmentType": "MockRelayRendererFixtures_artworkMetadata";
};
export type MockRelayRendererFixtures_artworkMetadata$key = {
  readonly " $data"?: MockRelayRendererFixtures_artworkMetadata$data;
  readonly " $fragmentSpreads": FragmentRefs<"MockRelayRendererFixtures_artworkMetadata">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "MockRelayRendererFixtures_artworkMetadata",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "title",
      "storageKey": null
    }
  ],
  "type": "Artwork",
  "abstractKey": null
};

(node as any).hash = "36229b903e6398f793878a155df342a7";

export default node;
