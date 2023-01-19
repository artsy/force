/**
 * @generated SignedSource<<f048a7d9dde70bcd7f18eed3ebd74c15>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type MyCollectionArtworkRequestPriceEstimateSection_artwork$data = {
  readonly artist: {
    readonly targetSupply: {
      readonly isP1: boolean | null;
    } | null;
  } | null;
  readonly consignmentSubmission: {
    readonly displayText: string | null;
  } | null;
  readonly hasPriceEstimateRequest: boolean | null;
  readonly internalID: string;
  readonly " $fragmentType": "MyCollectionArtworkRequestPriceEstimateSection_artwork";
};
export type MyCollectionArtworkRequestPriceEstimateSection_artwork$key = {
  readonly " $data"?: MyCollectionArtworkRequestPriceEstimateSection_artwork$data;
  readonly " $fragmentSpreads": FragmentRefs<"MyCollectionArtworkRequestPriceEstimateSection_artwork">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "MyCollectionArtworkRequestPriceEstimateSection_artwork",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "Artist",
      "kind": "LinkedField",
      "name": "artist",
      "plural": false,
      "selections": [
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
              "name": "isP1",
              "storageKey": null
            }
          ],
          "storageKey": null
        }
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
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "internalID",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "ArtworkConsignmentSubmission",
      "kind": "LinkedField",
      "name": "consignmentSubmission",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "displayText",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Artwork",
  "abstractKey": null
};

(node as any).hash = "aeb28af853d85f4f3602cebabf8c187f";

export default node;
