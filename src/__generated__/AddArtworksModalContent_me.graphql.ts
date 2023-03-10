/**
 * @generated SignedSource<<52442561c145719e163dd6331034ce63>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type AddArtworksModalContent_me$data = {
  readonly collection: {
    readonly artworksConnection: {
      readonly totalCount: number | null;
    } | null;
  } | null;
  readonly " $fragmentSpreads": FragmentRefs<"ArtworksList_me">;
  readonly " $fragmentType": "AddArtworksModalContent_me";
};
export type AddArtworksModalContent_me$key = {
  readonly " $data"?: AddArtworksModalContent_me$data;
  readonly " $fragmentSpreads": FragmentRefs<"AddArtworksModalContent_me">;
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
  "name": "AddArtworksModalContent_me",
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

(node as any).hash = "25cae15bd39a287103fdd8f1deb47349";

export default node;
