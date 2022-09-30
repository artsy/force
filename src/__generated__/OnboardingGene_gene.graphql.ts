/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type OnboardingGene_gene = {
    readonly internalID: string;
    readonly name: string | null;
    readonly artworks: {
        readonly edges: ReadonlyArray<{
            readonly node: {
                readonly internalID: string;
                readonly " $fragmentRefs": FragmentRefs<"GridItem_artwork">;
            } | null;
        } | null> | null;
    } | null;
    readonly " $refType": "OnboardingGene_gene";
};
export type OnboardingGene_gene$data = OnboardingGene_gene;
export type OnboardingGene_gene$key = {
    readonly " $data"?: OnboardingGene_gene$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"OnboardingGene_gene">;
};



const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "OnboardingGene_gene",
  "selections": [
    (v0/*: any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "name",
      "storageKey": null
    },
    {
      "alias": "artworks",
      "args": [
        {
          "kind": "Literal",
          "name": "first",
          "value": 50
        },
        {
          "kind": "Literal",
          "name": "forSale",
          "value": true
        },
        {
          "kind": "Literal",
          "name": "height",
          "value": "*-*"
        },
        {
          "kind": "Literal",
          "name": "inquireableOnly",
          "value": true
        },
        {
          "kind": "Literal",
          "name": "marketable",
          "value": true
        },
        {
          "kind": "Literal",
          "name": "offerable",
          "value": true
        },
        {
          "kind": "Literal",
          "name": "page",
          "value": 1
        },
        {
          "kind": "Literal",
          "name": "priceRange",
          "value": "*-*"
        },
        {
          "kind": "Literal",
          "name": "sort",
          "value": "-decayed_merch"
        },
        {
          "kind": "Literal",
          "name": "width",
          "value": "*-*"
        }
      ],
      "concreteType": "FilterArtworksConnection",
      "kind": "LinkedField",
      "name": "filterArtworksConnection",
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
                (v0/*: any*/),
                {
                  "args": null,
                  "kind": "FragmentSpread",
                  "name": "GridItem_artwork"
                }
              ],
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": "filterArtworksConnection(first:50,forSale:true,height:\"*-*\",inquireableOnly:true,marketable:true,offerable:true,page:1,priceRange:\"*-*\",sort:\"-decayed_merch\",width:\"*-*\")"
    }
  ],
  "type": "Gene",
  "abstractKey": null
};
})();
(node as any).hash = '3e738a263393a1812162d68c8845a834';
export default node;
