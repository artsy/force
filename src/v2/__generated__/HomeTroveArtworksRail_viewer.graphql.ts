/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type HomeTroveArtworksRail_viewer = {
    readonly artworksConnection: {
        readonly edges: ReadonlyArray<{
            readonly node: {
                readonly internalID: string;
                readonly slug: string;
                readonly href: string | null;
                readonly " $fragmentRefs": FragmentRefs<"ShelfArtwork_artwork">;
            } | null;
        } | null> | null;
    } | null;
    readonly " $refType": "HomeTroveArtworksRail_viewer";
};
export type HomeTroveArtworksRail_viewer$data = HomeTroveArtworksRail_viewer;
export type HomeTroveArtworksRail_viewer$key = {
    readonly " $data"?: HomeTroveArtworksRail_viewer$data;
    readonly " $fragmentRefs": FragmentRefs<"HomeTroveArtworksRail_viewer">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "HomeTroveArtworksRail_viewer",
  "selections": [
    {
      "alias": null,
      "args": [
        {
          "kind": "Literal",
          "name": "first",
          "value": 12
        },
        {
          "kind": "Literal",
          "name": "geneIDs",
          "value": "trove"
        }
      ],
      "concreteType": "FilterArtworksConnection",
      "kind": "LinkedField",
      "name": "artworksConnection",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "FilterArtworksEdge",
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
                  "name": "internalID",
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
                  "args": [
                    {
                      "kind": "Literal",
                      "name": "width",
                      "value": 210
                    }
                  ],
                  "kind": "FragmentSpread",
                  "name": "ShelfArtwork_artwork"
                }
              ],
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": "artworksConnection(first:12,geneIDs:\"trove\")"
    }
  ],
  "type": "Viewer",
  "abstractKey": null
};
(node as any).hash = 'a324d42177d1e5ab73ac279f98ed5235';
export default node;
