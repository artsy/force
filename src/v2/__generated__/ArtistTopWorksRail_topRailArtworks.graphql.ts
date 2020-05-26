/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArtistTopWorksRail_topRailArtworks = {
    readonly name: string | null;
    readonly topRailArtworks: {
        readonly edges: ReadonlyArray<{
            readonly node: {
                readonly title: string | null;
                readonly image: {
                    readonly url: string | null;
                } | null;
            } | null;
        } | null> | null;
    } | null;
    readonly " $refType": "ArtistTopWorksRail_topRailArtworks";
};
export type ArtistTopWorksRail_topRailArtworks$data = ArtistTopWorksRail_topRailArtworks;
export type ArtistTopWorksRail_topRailArtworks$key = {
    readonly " $data"?: ArtistTopWorksRail_topRailArtworks$data;
    readonly " $fragmentRefs": FragmentRefs<"ArtistTopWorksRail_topRailArtworks">;
};



const node: ReaderFragment = {
  "kind": "Fragment",
  "name": "ArtistTopWorksRail_topRailArtworks",
  "type": "Artist",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "name",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "LinkedField",
      "alias": "topRailArtworks",
      "name": "artworksConnection",
      "storageKey": "artworksConnection(first:10,sort:\"ICONICITY_DESC\")",
      "args": [
        {
          "kind": "Literal",
          "name": "first",
          "value": 10
        },
        {
          "kind": "Literal",
          "name": "sort",
          "value": "ICONICITY_DESC"
        }
      ],
      "concreteType": "ArtworkConnection",
      "plural": false,
      "selections": [
        {
          "kind": "LinkedField",
          "alias": null,
          "name": "edges",
          "storageKey": null,
          "args": null,
          "concreteType": "ArtworkEdge",
          "plural": true,
          "selections": [
            {
              "kind": "LinkedField",
              "alias": null,
              "name": "node",
              "storageKey": null,
              "args": null,
              "concreteType": "Artwork",
              "plural": false,
              "selections": [
                {
                  "kind": "ScalarField",
                  "alias": null,
                  "name": "title",
                  "args": null,
                  "storageKey": null
                },
                {
                  "kind": "LinkedField",
                  "alias": null,
                  "name": "image",
                  "storageKey": null,
                  "args": null,
                  "concreteType": "Image",
                  "plural": false,
                  "selections": [
                    {
                      "kind": "ScalarField",
                      "alias": null,
                      "name": "url",
                      "args": null,
                      "storageKey": null
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};
(node as any).hash = '4cdf229909a2045c21ac75fa77a18288';
export default node;
