/**
 * @generated SignedSource<<d89db64c2d59e682c45bc928279be67c>>
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
          readonly isActive: boolean | null | undefined;
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
                      "name": "isActive",
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

(node as any).hash = "e4a332fd5b06202c6cd9e98a78ddbedf";

export default node;
