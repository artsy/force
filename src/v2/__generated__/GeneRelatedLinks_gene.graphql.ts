/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type GeneRelatedLinks_gene = {
    readonly similar: {
        readonly edges: ReadonlyArray<{
            readonly node: {
                readonly href: string | null;
                readonly name: string | null;
            } | null;
        } | null> | null;
    } | null;
    readonly artists: {
        readonly edges: ReadonlyArray<{
            readonly node: {
                readonly href: string | null;
                readonly name: string | null;
            } | null;
        } | null> | null;
    } | null;
    readonly " $refType": "GeneRelatedLinks_gene";
};
export type GeneRelatedLinks_gene$data = GeneRelatedLinks_gene;
export type GeneRelatedLinks_gene$key = {
    readonly " $data"?: GeneRelatedLinks_gene$data;
    readonly " $fragmentRefs": FragmentRefs<"GeneRelatedLinks_gene">;
};



const node: ReaderFragment = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 10
  }
],
v1 = [
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
    "name": "name",
    "storageKey": null
  }
];
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "GeneRelatedLinks_gene",
  "selections": [
    {
      "alias": null,
      "args": (v0/*: any*/),
      "concreteType": "GeneConnection",
      "kind": "LinkedField",
      "name": "similar",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "GeneEdge",
          "kind": "LinkedField",
          "name": "edges",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "Gene",
              "kind": "LinkedField",
              "name": "node",
              "plural": false,
              "selections": (v1/*: any*/),
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": "similar(first:10)"
    },
    {
      "alias": "artists",
      "args": (v0/*: any*/),
      "concreteType": "ArtistConnection",
      "kind": "LinkedField",
      "name": "artistsConnection",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "ArtistEdge",
          "kind": "LinkedField",
          "name": "edges",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "Artist",
              "kind": "LinkedField",
              "name": "node",
              "plural": false,
              "selections": (v1/*: any*/),
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": "artistsConnection(first:10)"
    }
  ],
  "type": "Gene"
};
})();
(node as any).hash = '16d8882b604595dcffe85c9f3fdda533';
export default node;
