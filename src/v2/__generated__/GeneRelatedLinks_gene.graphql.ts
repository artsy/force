/* tslint:disable */

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
    "kind": "ScalarField",
    "alias": null,
    "name": "href",
    "args": null,
    "storageKey": null
  },
  {
    "kind": "ScalarField",
    "alias": null,
    "name": "name",
    "args": null,
    "storageKey": null
  }
];
return {
  "kind": "Fragment",
  "name": "GeneRelatedLinks_gene",
  "type": "Gene",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "similar",
      "storageKey": "similar(first:10)",
      "args": (v0/*: any*/),
      "concreteType": "GeneConnection",
      "plural": false,
      "selections": [
        {
          "kind": "LinkedField",
          "alias": null,
          "name": "edges",
          "storageKey": null,
          "args": null,
          "concreteType": "GeneEdge",
          "plural": true,
          "selections": [
            {
              "kind": "LinkedField",
              "alias": null,
              "name": "node",
              "storageKey": null,
              "args": null,
              "concreteType": "Gene",
              "plural": false,
              "selections": (v1/*: any*/)
            }
          ]
        }
      ]
    },
    {
      "kind": "LinkedField",
      "alias": "artists",
      "name": "artistsConnection",
      "storageKey": "artistsConnection(first:10)",
      "args": (v0/*: any*/),
      "concreteType": "ArtistConnection",
      "plural": false,
      "selections": [
        {
          "kind": "LinkedField",
          "alias": null,
          "name": "edges",
          "storageKey": null,
          "args": null,
          "concreteType": "ArtistEdge",
          "plural": true,
          "selections": [
            {
              "kind": "LinkedField",
              "alias": null,
              "name": "node",
              "storageKey": null,
              "args": null,
              "concreteType": "Artist",
              "plural": false,
              "selections": (v1/*: any*/)
            }
          ]
        }
      ]
    }
  ]
};
})();
(node as any).hash = '16d8882b604595dcffe85c9f3fdda533';
export default node;
