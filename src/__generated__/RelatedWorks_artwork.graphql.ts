/**
 * @generated SignedSource<<ea100bf76f804aec6f1ed6822f50ac45>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type RelatedWorks_artwork$data = {
  readonly layer: {
    readonly artworksConnection: {
      readonly edges: ReadonlyArray<{
        readonly node: {
          readonly slug: string;
        } | null | undefined;
      } | null | undefined> | null | undefined;
      readonly " $fragmentSpreads": FragmentRefs<"ArtworkGrid_artworks">;
    } | null | undefined;
    readonly name: string | null | undefined;
  } | null | undefined;
  readonly slug: string;
  readonly title: string | null | undefined;
  readonly " $fragmentType": "RelatedWorks_artwork";
};
export type RelatedWorks_artwork$key = {
  readonly " $data"?: RelatedWorks_artwork$data;
  readonly " $fragmentSpreads": FragmentRefs<"RelatedWorks_artwork">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "slug",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "RelatedWorks_artwork",
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
      "args": [
        {
          "kind": "Literal",
          "name": "id",
          "value": "main"
        }
      ],
      "concreteType": "ArtworkLayer",
      "kind": "LinkedField",
      "name": "layer",
      "plural": false,
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
          "args": [
            {
              "kind": "Literal",
              "name": "first",
              "value": 8
            }
          ],
          "concreteType": "ArtworkConnection",
          "kind": "LinkedField",
          "name": "artworksConnection",
          "plural": false,
          "selections": [
            {
              "args": null,
              "kind": "FragmentSpread",
              "name": "ArtworkGrid_artworks"
            },
            {
              "alias": null,
              "args": null,
              "concreteType": "ArtworkEdge",
              "kind": "LinkedField",
              "name": "edges",
              "plural": true,
              "selections": [
                {
                  "alias": null,
                  "args": null,
                  "concreteType": "Artwork",
                  "kind": "LinkedField",
                  "name": "node",
                  "plural": false,
                  "selections": [
                    (v0/*: any*/)
                  ],
                  "storageKey": null
                }
              ],
              "storageKey": null
            }
          ],
          "storageKey": "artworksConnection(first:8)"
        }
      ],
      "storageKey": "layer(id:\"main\")"
    }
  ],
  "type": "Artwork",
  "abstractKey": null
};
})();

(node as any).hash = "e2f0dd241e2e7cc1d487c556d35e739b";

export default node;
