/**
 * @generated SignedSource<<0ab92a3a839efd9268221b96e97cc79c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type Overview_partner$data = {
  readonly displayArtistsSection: boolean | null | undefined;
  readonly displayFullPartnerPage: boolean | null | undefined;
  readonly locationsConnection: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly coordinates: {
          readonly lat: number | null | undefined;
          readonly lng: number | null | undefined;
        } | null | undefined;
      } | null | undefined;
    } | null | undefined> | null | undefined;
  } | null | undefined;
  readonly partnerType: string | null | undefined;
  readonly profileBannerDisplay: string | null | undefined;
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
