/**
 * @generated SignedSource<<10fcd83c63c8a6a6a85e62ddc27cc321>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type Overview_partner$data = {
  readonly displayArtistsSection: boolean | null;
  readonly displayFullPartnerPage: boolean | null;
  readonly locationsConnection: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly coordinates: {
          readonly lat: number | null;
          readonly lng: number | null;
        } | null;
      } | null;
    } | null> | null;
  } | null;
  readonly partnerType: string | null;
  readonly profileBannerDisplay: string | null;
  readonly slug: string;
  readonly " $fragmentSpreads": FragmentRefs<"AboutPartner_partner" | "ArticlesRail_partner" | "ArtistsRail_partner" | "ShowsRail_partner" | "SubscriberBanner_partner">;
  readonly " $fragmentType": "Overview_partner";
};
export type Overview_partner$key = {
  readonly " $data"?: Overview_partner$data;
  readonly " $fragmentSpreads": FragmentRefs<"Overview_partner">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Overview_partner",
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
      "kind": "ScalarField",
      "name": "partnerType",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "displayFullPartnerPage",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "profileBannerDisplay",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "displayArtistsSection",
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "AboutPartner_partner"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ShowsRail_partner"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArtistsRail_partner"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "SubscriberBanner_partner"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArticlesRail_partner"
    },
    {
      "alias": null,
      "args": [
        {
          "kind": "Literal",
          "name": "first",
          "value": 1
        }
      ],
      "concreteType": "LocationConnection",
      "kind": "LinkedField",
      "name": "locationsConnection",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "LocationEdge",
          "kind": "LinkedField",
          "name": "edges",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "Location",
              "kind": "LinkedField",
              "name": "node",
              "plural": false,
              "selections": [
                {
                  "alias": null,
                  "args": null,
                  "concreteType": "LatLng",
                  "kind": "LinkedField",
                  "name": "coordinates",
                  "plural": false,
                  "selections": [
                    {
                      "alias": null,
                      "args": null,
                      "kind": "ScalarField",
                      "name": "lat",
                      "storageKey": null
                    },
                    {
                      "alias": null,
                      "args": null,
                      "kind": "ScalarField",
                      "name": "lng",
                      "storageKey": null
                    }
                  ],
                  "storageKey": null
                }
              ],
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": "locationsConnection(first:1)"
    }
  ],
  "type": "Partner",
  "abstractKey": null
};

(node as any).hash = "863392a7d608cb535b05e18ed354289b";

export default node;
