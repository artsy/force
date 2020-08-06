/* tslint:disable */

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
  "kind": "Fragment",
  "name": "SelectedWorks_selectedWorks",
  "type": "OrderedSet",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "itemsConnection",
      "storageKey": "itemsConnection(first:6)",
      "args": [
        {
          "kind": "Literal",
          "name": "first",
          "value": 6
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
                  "name": "id",
                  "args": null,
                  "storageKey": null
                }
              ]
            }
          ]
        },
        {
          "kind": "FragmentSpread",
          "name": "ArtworkGrid_artworks",
          "args": null
        }
      ]
    }
  ]
};
(node as any).hash = 'a2d0c0c9d79f769c7dc6802073e78848';
export default node;
