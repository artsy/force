/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type RelatedWorksArtworkGrid_artwork = {
    readonly layers: ReadonlyArray<{
        readonly name: string | null;
        readonly internalID: string;
    } | null> | null;
    readonly slug: string;
    readonly layer: {
        readonly name: string | null;
        readonly artworksConnection: {
            readonly edges: ReadonlyArray<{
                readonly node: {
                    readonly slug: string;
                } | null;
            } | null> | null;
            readonly " $fragmentRefs": FragmentRefs<"ArtworkGrid_artworks">;
        } | null;
    } | null;
    readonly " $refType": "RelatedWorksArtworkGrid_artwork";
};
export type RelatedWorksArtworkGrid_artwork$data = RelatedWorksArtworkGrid_artwork;
export type RelatedWorksArtworkGrid_artwork$key = {
    readonly " $data"?: RelatedWorksArtworkGrid_artwork$data;
    readonly " $fragmentRefs": FragmentRefs<"RelatedWorksArtworkGrid_artwork">;
};



const node: ReaderFragment = (function(){
var v0 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "name",
  "args": null,
  "storageKey": null
},
v1 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "slug",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Fragment",
  "name": "RelatedWorksArtworkGrid_artwork",
  "type": "Artwork",
  "metadata": null,
  "argumentDefinitions": [
    {
      "kind": "LocalArgument",
      "name": "layerId",
      "type": "String",
      "defaultValue": null
    }
  ],
  "selections": [
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "layers",
      "storageKey": null,
      "args": null,
      "concreteType": "ArtworkLayer",
      "plural": true,
      "selections": [
        (v0/*: any*/),
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "internalID",
          "args": null,
          "storageKey": null
        }
      ]
    },
    (v1/*: any*/),
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "layer",
      "storageKey": null,
      "args": [
        {
          "kind": "Variable",
          "name": "id",
          "variableName": "layerId"
        }
      ],
      "concreteType": "ArtworkLayer",
      "plural": false,
      "selections": [
        (v0/*: any*/),
        {
          "kind": "LinkedField",
          "alias": null,
          "name": "artworksConnection",
          "storageKey": "artworksConnection(first:8)",
          "args": [
            {
              "kind": "Literal",
              "name": "first",
              "value": 8
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
                    (v1/*: any*/)
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
    }
  ]
};
})();
(node as any).hash = 'c94051a248fa232b6664a79ce100df6d';
export default node;
