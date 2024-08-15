/**
 * @generated SignedSource<<540505c2bc930d4655a0b45792d66571>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type HomeNewWorksFromGalleriesYouFollowRail_newWorksFromGalleriesYouFollowConnection$data = {
  readonly edges: ReadonlyArray<{
    readonly node: {
      readonly collectorSignals: {
        readonly partnerOffer: {
          readonly isAvailable: boolean | null | undefined;
        } | null | undefined;
      } | null | undefined;
      readonly internalID: string;
      readonly slug: string;
      readonly " $fragmentSpreads": FragmentRefs<"ShelfArtwork_artwork">;
    } | null | undefined;
  } | null | undefined> | null | undefined;
  readonly " $fragmentType": "HomeNewWorksFromGalleriesYouFollowRail_newWorksFromGalleriesYouFollowConnection";
};
export type HomeNewWorksFromGalleriesYouFollowRail_newWorksFromGalleriesYouFollowConnection$key = {
  readonly " $data"?: HomeNewWorksFromGalleriesYouFollowRail_newWorksFromGalleriesYouFollowConnection$data;
  readonly " $fragmentSpreads": FragmentRefs<"HomeNewWorksFromGalleriesYouFollowRail_newWorksFromGalleriesYouFollowConnection">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "HomeNewWorksFromGalleriesYouFollowRail_newWorksFromGalleriesYouFollowConnection",
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
              "kind": "ScalarField",
              "name": "slug",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "concreteType": "CollectorSignals",
              "kind": "LinkedField",
              "name": "collectorSignals",
              "plural": false,
              "selections": [
                {
                  "alias": null,
                  "args": null,
                  "concreteType": "PartnerOfferToCollector",
                  "kind": "LinkedField",
                  "name": "partnerOffer",
                  "plural": false,
                  "selections": [
                    {
                      "alias": null,
                      "args": null,
                      "kind": "ScalarField",
                      "name": "isAvailable",
                      "storageKey": null
                    }
                  ],
                  "storageKey": null
                }
              ],
              "storageKey": null
            },
            {
              "args": null,
              "kind": "FragmentSpread",
              "name": "ShelfArtwork_artwork"
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "ArtworkConnection",
  "abstractKey": null
};

(node as any).hash = "d565626c35dd45f925649c029f8d23e3";

export default node;
