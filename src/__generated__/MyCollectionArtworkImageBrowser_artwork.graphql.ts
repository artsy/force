/**
 * @generated SignedSource<<a9346f860a9c0bc9ec064b827474d37e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type MyCollectionArtworkImageBrowser_artwork$data = {
  readonly figures: ReadonlyArray<{
    readonly height?: number | null;
    readonly width?: number | null;
  }>;
  readonly internalID: string;
  readonly " $fragmentSpreads": FragmentRefs<"ArtworkImageBrowser_artwork">;
  readonly " $fragmentType": "MyCollectionArtworkImageBrowser_artwork";
};
export type MyCollectionArtworkImageBrowser_artwork$key = {
  readonly " $data"?: MyCollectionArtworkImageBrowser_artwork$data;
  readonly " $fragmentSpreads": FragmentRefs<"MyCollectionArtworkImageBrowser_artwork">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "MyCollectionArtworkImageBrowser_artwork",
  "selections": [
    {
      "args": [
        {
          "kind": "Literal",
          "name": "includeAllImages",
          "value": true
        }
      ],
      "kind": "FragmentSpread",
      "name": "ArtworkImageBrowser_artwork"
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
      "args": [
        {
          "kind": "Literal",
          "name": "includeAll",
          "value": true
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
              "name": "width",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "height",
              "storageKey": null
            }
          ],
          "type": "Image",
          "abstractKey": null
        }
      ],
      "storageKey": "figures(includeAll:true)"
    }
  ],
  "type": "Artwork",
  "abstractKey": null
};

(node as any).hash = "7da29a5e1e8b4379b10cd8775e6731b7";

export default node;
