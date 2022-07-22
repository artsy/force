/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

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
    readonly " $data"?: RelatedWorksArtworkGrid_artwork$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"RelatedWorksArtworkGrid_artwork">;
};



const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "slug",
  "storageKey": null
};
return {
  "argumentDefinitions": [
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "layerId"
    }
  ],
  "kind": "Fragment",
  "metadata": null,
  "name": "RelatedWorksArtworkGrid_artwork",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "ArtworkLayer",
      "kind": "LinkedField",
      "name": "layers",
      "plural": true,
      "selections": [
        (v0/*: any*/),
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "internalID",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    (v1/*: any*/),
    {
      "alias": null,
      "args": [
        {
          "kind": "Variable",
          "name": "id",
          "variableName": "layerId"
        }
      ],
      "concreteType": "ArtworkLayer",
      "kind": "LinkedField",
      "name": "layer",
      "plural": false,
      "selections": [
        (v0/*: any*/),
        {
          "alias": null,
          "args": [
            {
              "kind": "Literal",
              "name": "first",
              "value": 8
            }
          ],
          "concreteType": "ArtworkConnection",
          "kind": "LinkedField",
          "name": "artworksConnection",
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
                    (v1/*: any*/)
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
          "storageKey": "artworksConnection(first:8)"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Artwork",
  "abstractKey": null
};
})();
(node as any).hash = 'c94051a248fa232b6664a79ce100df6d';
export default node;
