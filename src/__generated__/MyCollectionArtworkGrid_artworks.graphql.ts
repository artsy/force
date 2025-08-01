/**
 * @generated SignedSource<<d2c8690e99d86b215d7981ea8572b8f8>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
export type ArtistTargetSupplyPriority = "FALSE" | "TRUE" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type MyCollectionArtworkGrid_artworks$data = {
  readonly edges: ReadonlyArray<{
    readonly node: {
      readonly artist: {
        readonly targetSupply: {
          readonly priority: ArtistTargetSupplyPriority | null | undefined;
        };
      } | null | undefined;
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
  readonly " $fragmentType": "MyCollectionArtworkGrid_artworks";
};
export type MyCollectionArtworkGrid_artworks$key = {
  readonly " $data"?: MyCollectionArtworkGrid_artworks$data;
  readonly " $fragmentSpreads": FragmentRefs<"MyCollectionArtworkGrid_artworks">;
};

const node: ReaderFragment = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "includeAllImages",
    "value": true
  }
];
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "MyCollectionArtworkGrid_artworks",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "MyCollectionEdge",
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
                  "kind": "Literal",
                  "name": "includeAll",
                  "value": true
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
              "storageKey": "image(includeAll:true)"
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
              "name": "artist",
              "plural": false,
              "selections": [
                {
                  "alias": null,
                  "args": null,
                  "concreteType": "ArtistTargetSupply",
                  "kind": "LinkedField",
                  "name": "targetSupply",
                  "plural": false,
                  "selections": [
                    {
                      "alias": null,
                      "args": null,
                      "kind": "ScalarField",
                      "name": "priority",
                      "storageKey": null
                    }
                  ],
                  "storageKey": null
                }
              ],
              "storageKey": "artist(shallow:true)"
            },
            {
              "args": (v0/*: any*/),
              "kind": "FragmentSpread",
              "name": "GridItem_artwork"
            },
            {
              "args": (v0/*: any*/),
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
  "type": "MyCollectionConnection",
  "abstractKey": null
};
})();

(node as any).hash = "ea2c48b3c5b3b81ad3fbde9a19d2cbbf";

export default node;
