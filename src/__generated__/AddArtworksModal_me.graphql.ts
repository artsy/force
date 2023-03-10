/**
 * @generated SignedSource<<76f5fa78894127d1284df848daedc700>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type AddArtworksModal_me$data = {
  readonly collection: {
    readonly artworksConnection: {
      readonly totalCount: number | null;
    } | null;
  } | null;
  readonly " $fragmentSpreads": FragmentRefs<"ArtworksList_me">;
  readonly " $fragmentType": "AddArtworksModal_me";
};
export type AddArtworksModal_me$key = {
  readonly " $data"?: AddArtworksModal_me$data;
  readonly " $fragmentSpreads": FragmentRefs<"AddArtworksModal_me">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "kind": "Variable",
  "name": "sort",
  "variableName": "sort"
};
return {
  "argumentDefinitions": [
    {
      "defaultValue": "POSITION_DESC",
      "kind": "LocalArgument",
      "name": "sort"
    }
  ],
  "kind": "Fragment",
  "metadata": null,
  "name": "AddArtworksModal_me",
  "selections": [
    {
      "args": [
        (v0/*: any*/)
      ],
      "kind": "FragmentSpread",
      "name": "ArtworksList_me"
    },
    {
      "alias": null,
      "args": [
        {
          "kind": "Literal",
          "name": "id",
          "value": "saved-artwork"
        }
      ],
      "concreteType": "Collection",
      "kind": "LinkedField",
      "name": "collection",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": [
            {
              "kind": "Literal",
              "name": "first",
              "value": 30
            },
            (v0/*: any*/)
          ],
          "concreteType": "ArtworkConnection",
          "kind": "LinkedField",
          "name": "artworksConnection",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "totalCount",
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": "collection(id:\"saved-artwork\")"
    }
  ],
  "type": "Me",
  "abstractKey": null
};
})();

(node as any).hash = "6259da09a42ed67958ed79f06cf8342e";

export default node;
