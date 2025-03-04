/**
 * @generated SignedSource<<a55932e78f00ce0569fe4278e3cc0ef7>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtworkTopContextBarBreadcrumb_artwork$data = {
  readonly artist: {
    readonly href: string | null | undefined;
    readonly name: string | null | undefined;
  } | null | undefined;
  readonly href: string | null | undefined;
  readonly internalID: string;
  readonly title: string | null | undefined;
  readonly " $fragmentType": "ArtworkTopContextBarBreadcrumb_artwork";
};
export type ArtworkTopContextBarBreadcrumb_artwork$key = {
  readonly " $data"?: ArtworkTopContextBarBreadcrumb_artwork$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArtworkTopContextBarBreadcrumb_artwork">;
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
  "name": "ArtworkTopContextBarBreadcrumb_artwork",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "internalID",
      "storageKey": null
    },
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
      "concreteType": "Artist",
      "kind": "LinkedField",
      "name": "artist",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "name",
          "storageKey": null
        },
        (v0/*: any*/)
      ],
      "storageKey": null
    }
  ],
  "type": "Artwork",
  "abstractKey": null
};
})();

(node as any).hash = "1941b0f86a542e56b8ad2787c50919e9";

export default node;
