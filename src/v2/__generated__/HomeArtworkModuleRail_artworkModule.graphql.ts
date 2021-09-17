/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type HomeArtworkModuleRail_artworkModule = {
    readonly title: string | null;
    readonly key: string | null;
    readonly results: ReadonlyArray<{
        readonly internalID: string;
        readonly " $fragmentRefs": FragmentRefs<"ShelfArtwork_artwork">;
    } | null> | null;
    readonly context: {
        readonly __typename: string;
        readonly " $fragmentRefs": FragmentRefs<"HomeArtworkModuleContext_context">;
    } | null;
    readonly " $refType": "HomeArtworkModuleRail_artworkModule";
};
export type HomeArtworkModuleRail_artworkModule$data = HomeArtworkModuleRail_artworkModule;
export type HomeArtworkModuleRail_artworkModule$key = {
    readonly " $data"?: HomeArtworkModuleRail_artworkModule$data;
    readonly " $fragmentRefs": FragmentRefs<"HomeArtworkModuleRail_artworkModule">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "HomeArtworkModuleRail_artworkModule",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "title",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "key",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Artwork",
      "kind": "LinkedField",
      "name": "results",
      "plural": true,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "internalID",
          "storageKey": null
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "ShelfArtwork_artwork"
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": null,
      "kind": "LinkedField",
      "name": "context",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "__typename",
          "storageKey": null
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "HomeArtworkModuleContext_context"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "HomePageArtworkModule",
  "abstractKey": null
};
(node as any).hash = 'c52002757723ea240691001c3ddeb7e9';
export default node;
