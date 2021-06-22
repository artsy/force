/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type HomeArtworkModuleRail_artworkModule = {
    readonly title: string | null;
    readonly key: string | null;
    readonly results: ReadonlyArray<{
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
  "type": "HomePageArtworkModule"
};
(node as any).hash = 'd9316b2be561839830e72fa16dd4650a';
export default node;
