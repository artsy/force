/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type SelectedWorks_selectedWorks = {
    readonly itemsConnection: {
        readonly edges: ReadonlyArray<{
            readonly node: {
                readonly id: string;
            } | null;
        } | null> | null;
        readonly " $fragmentRefs": FragmentRefs<"ArtworkGrid_artworks">;
    } | null;
    readonly " $refType": "SelectedWorks_selectedWorks";
};
export type SelectedWorks_selectedWorks$data = SelectedWorks_selectedWorks;
export type SelectedWorks_selectedWorks$key = {
    readonly " $data"?: SelectedWorks_selectedWorks$data;
    readonly " $fragmentRefs": FragmentRefs<"SelectedWorks_selectedWorks">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SelectedWorks_selectedWorks",
  "selections": [
    {
      "alias": null,
      "args": [
        {
          "kind": "Literal",
          "name": "first",
          "value": 6
        }
      ],
      "concreteType": "ArtworkConnection",
      "kind": "LinkedField",
      "name": "itemsConnection",
      "plural": false,
      "selections": [
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
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "id",
                  "storageKey": null
                }
              ],
              "storageKey": null
            }
          ],
          "storageKey": null
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "ArtworkGrid_artworks"
        }
      ],
      "storageKey": "itemsConnection(first:6)"
    }
  ],
  "type": "OrderedSet",
  "abstractKey": null
};
(node as any).hash = 'a2d0c0c9d79f769c7dc6802073e78848';
export default node;
