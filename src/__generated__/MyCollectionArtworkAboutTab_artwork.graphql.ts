/**
 * @generated SignedSource<<948c7a05ad4c4694edf5f9d4917d175f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
export type ArtistTargetSupplyPriority = "FALSE" | "TRUE" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type MyCollectionArtworkAboutTab_artwork$data = {
  readonly artist: {
    readonly slug: string;
    readonly targetSupply: {
      readonly priority: ArtistTargetSupplyPriority | null | undefined;
    };
  } | null | undefined;
  readonly consignmentSubmission: {
    readonly internalID: string | null | undefined;
  } | null | undefined;
  readonly hasPriceEstimateRequest: boolean | null | undefined;
  readonly internalID: string;
  readonly " $fragmentSpreads": FragmentRefs<"MyCollectionArtworkDetails_artwork" | "MyCollectionArtworkRequestPriceEstimate_artwork">;
  readonly " $fragmentType": "MyCollectionArtworkAboutTab_artwork";
};
export type MyCollectionArtworkAboutTab_artwork$key = {
  readonly " $data"?: MyCollectionArtworkAboutTab_artwork$data;
  readonly " $fragmentSpreads": FragmentRefs<"MyCollectionArtworkAboutTab_artwork">;
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
  "name": "MyCollectionArtworkAboutTab_artwork",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "MyCollectionArtworkDetails_artwork"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "MyCollectionArtworkRequestPriceEstimate_artwork"
    },
    {
      "alias": null,
      "args": [
        {
          "kind": "Literal",
          "name": "shallow",
          "value": true
        }
      ],
      "concreteType": "Artist",
      "kind": "LinkedField",
      "name": "artist",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "slug",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "ArtistTargetSupply",
          "kind": "LinkedField",
          "name": "targetSupply",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "priority",
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": "artist(shallow:true)"
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "ArtworkConsignmentSubmission",
      "kind": "LinkedField",
      "name": "consignmentSubmission",
      "plural": false,
      "selections": [
        (v0/*: any*/)
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "hasPriceEstimateRequest",
      "storageKey": null
    },
    (v0/*: any*/)
  ],
  "type": "Artwork",
  "abstractKey": null
};
})();

(node as any).hash = "366be900163018207e9e859f12ea5fec";

export default node;
