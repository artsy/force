/**
 * @generated SignedSource<<bd13c380d4b96c5aa4f82a318f2eb620>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtworkGrid_artworks$data = {
  readonly edges: ReadonlyArray<{
    readonly node: {
      readonly href: string | null | undefined;
      readonly id: string;
      readonly image: {
        readonly aspectRatio: number;
      } | null | undefined;
      readonly internalID: string;
      readonly slug: string;
      readonly " $fragmentSpreads": FragmentRefs<"FlatGridItem_artwork" | "GridItem_artwork">;
    } | null | undefined;
  } | null | undefined> | null | undefined;
  readonly " $fragmentType": "ArtworkGrid_artworks";
};
export type ArtworkGrid_artworks$key = {
  readonly " $data"?: ArtworkGrid_artworks$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArtworkGrid_artworks">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "kind": "Variable",
  "name": "includeBlurHash",
  "variableName": "includeBlurHash"
};
return {
  "argumentDefinitions": [
    {
      "defaultValue": false,
      "kind": "LocalArgument",
      "name": "includeAllImages"
    },
    {
      "defaultValue": true,
      "kind": "LocalArgument",
      "name": "includeBlurHash"
    },
    {
      "defaultValue": false,
      "kind": "LocalArgument",
      "name": "includeConsignmentSubmission"
    }
  ],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtworkGrid_artworks",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": null,
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
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "id",
              "storageKey": null
            },
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
                  "kind": "Variable",
                  "name": "includeAll",
                  "variableName": "includeAllImages"
                }
              ],
              "concreteType": "Image",
              "kind": "LinkedField",
              "name": "image",
              "plural": false,
              "selections": [
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "aspectRatio",
                  "storageKey": null
                }
              ],
              "storageKey": null
            },
            {
              "args": [
                (v0/*: any*/)
              ],
              "kind": "FragmentSpread",
              "name": "GridItem_artwork"
            },
            {
              "args": [
                (v0/*: any*/),
                {
                  "kind": "Variable",
                  "name": "includeConsignmentSubmission",
                  "variableName": "includeConsignmentSubmission"
                }
              ],
              "kind": "FragmentSpread",
              "name": "FlatGridItem_artwork"
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "ArtworkConnectionInterface",
  "abstractKey": "__isArtworkConnectionInterface"
};
})();

(node as any).hash = "33daab4206d833407dbfce33acf9d5b8";

export default node;
