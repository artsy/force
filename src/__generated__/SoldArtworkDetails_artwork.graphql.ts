/**
 * @generated SignedSource<<e0be7cd4be4a94b9b0948c988ccefbe4>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SoldArtworkDetails_artwork$data = {
  readonly artists: ReadonlyArray<{
    readonly href: string | null | undefined;
    readonly id: string;
    readonly name: string | null | undefined;
  } | null | undefined> | null | undefined;
  readonly cultural_maker: string | null | undefined;
  readonly date: string | null | undefined;
  readonly href: string | null | undefined;
  readonly title: string | null | undefined;
  readonly " $fragmentType": "SoldArtworkDetails_artwork";
};
export type SoldArtworkDetails_artwork$key = {
  readonly " $data"?: SoldArtworkDetails_artwork$data;
  readonly " $fragmentSpreads": FragmentRefs<"SoldArtworkDetails_artwork">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "href",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SoldArtworkDetails_artwork",
  "selections": [
    (v0/*: any*/),
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
      "name": "date",
      "storageKey": null
    },
    {
      "alias": "cultural_maker",
      "args": null,
      "kind": "ScalarField",
      "name": "culturalMaker",
      "storageKey": null
    },
    {
      "alias": null,
      "args": [
        {
          "kind": "Literal",
          "name": "shallow",
          "value": true
        }
      ],
      "concreteType": "Artist",
      "kind": "LinkedField",
      "name": "artists",
      "plural": true,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "id",
          "storageKey": null
        },
        (v0/*: any*/),
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "name",
          "storageKey": null
        }
      ],
      "storageKey": "artists(shallow:true)"
    }
  ],
  "type": "Artwork",
  "abstractKey": null
};
})();

(node as any).hash = "23ac8e2943429000785feef6efd313ab";

export default node;
